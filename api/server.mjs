import {createHash, createHmac, timingSafeEqual} from 'node:crypto'
import {createReadStream} from 'node:fs'
import {stat} from 'node:fs/promises'
import {createServer} from 'node:http'
import {extname, join, normalize, sep} from 'node:path'
import {fileURLToPath} from 'node:url'
import {buscarConteudo} from './conteudo.mjs'

// Servidor da cartilha (app Node.js na Hostinger):
//   GET  /api/content     conteúdo publicado, servido de um cache em memória
//   GET  /api/events      fluxo (SSE): avisa os navegadores abertos quando o conteúdo muda
//   POST /api/revalidate  webhook do Sanity: busca o conteúdo de novo, troca o cache e avisa
//   GET  demais rotas     site gerado pelo Vite (dist/); rotas da SPA recebem o index.html
const {VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET = 'production', SANITY_WEBHOOK_SECRET, PORT = '3001'} = process.env
if (!VITE_SANITY_PROJECT_ID) throw new Error('Defina VITE_SANITY_PROJECT_ID.')
if (!SANITY_WEBHOOK_SECRET) throw new Error('Defina SANITY_WEBHOOK_SECRET.')

const origem = {projectId: VITE_SANITY_PROJECT_ID, dataset: VITE_SANITY_DATASET}
const DIST = fileURLToPath(new URL('../dist/', import.meta.url))
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
}
const TOLERANCIA_MS = 5 * 60 * 1000
const LIMITE_CORPO = 1024 * 1024

/** @type {{json: string, etag: string} | null} */
let cache = null
/** Busca em andamento: chamadas simultâneas compartilham a mesma. */
let emAndamento = null
const ouvintes = new Set()

function carregar() {
  emAndamento ??= buscarConteudo(origem)
    .then((dados) => {
      const json = JSON.stringify(dados)
      cache = {json, etag: `"${createHash('sha1').update(json).digest('hex')}"`}
      return cache
    })
    .finally(() => {
      emAndamento = null
    })
  return emAndamento
}

// Assinatura do webhook do Sanity: cabeçalho `sanity-webhook-signature: t=<ms>,v1=<base64url>`,
// com v1 = HMAC-SHA256 de "<t>.<corpo>" usando o segredo do webhook.
function assinaturaValida(cabecalho, corpo) {
  const partes = Object.fromEntries(String(cabecalho ?? '').split(',').map((p) => p.trim().split(/=(.*)/s).slice(0, 2)))
  const {t, v1} = partes
  if (!t || !v1 || Math.abs(Date.now() - Number(t)) > TOLERANCIA_MS) return false
  const esperado = createHmac('sha256', SANITY_WEBHOOK_SECRET).update(`${t}.${corpo}`).digest('base64url')
  const a = Buffer.from(esperado)
  const b = Buffer.from(v1)
  return a.length === b.length && timingSafeEqual(a, b)
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    const partes = []
    let total = 0
    req.on('data', (c) => {
      total += c.length
      if (total > LIMITE_CORPO) {
        reject(new Error('corpo grande demais'))
        req.destroy()
      } else partes.push(c)
    })
    req.on('end', () => resolve(Buffer.concat(partes).toString('utf8')))
    req.on('error', reject)
  })
}

function responder(res, status, corpo, cabecalhos = {}) {
  res.writeHead(status, {'Content-Type': 'application/json; charset=utf-8', ...cabecalhos})
  res.end(typeof corpo === 'string' ? corpo : JSON.stringify(corpo))
}

// Arquivos com hash no nome (em /assets/, gerados pelo Vite) ficam em cache longo;
// HTML, service worker e manifesto são sempre revalidados, para publicar versões novas.
function cacheDe(pathname) {
  return pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache'
}

async function servirArquivo(req, res, pathname) {
  const caminho = normalize(join(DIST, decodeURIComponent(pathname)))
  if (!caminho.startsWith(DIST.endsWith(sep) ? DIST : DIST + sep)) return responder(res, 400, {erro: 'caminho inválido'})

  let alvo = caminho
  let info = await stat(alvo).catch(() => null)
  if (info?.isDirectory()) {
    alvo = join(alvo, 'index.html')
    info = await stat(alvo).catch(() => null)
  }
  if (!info?.isFile()) {
    // Arquivo pedido que não existe (tem extensão) é 404; rota da SPA recebe o index.html.
    if (extname(pathname)) return responder(res, 404, {erro: 'não encontrado'})
    alvo = join(DIST, 'index.html')
    info = await stat(alvo)
  }

  const etag = `W/"${info.size.toString(16)}-${info.mtimeMs.toString(16)}"`
  const cabecalhos = {
    'Content-Type': TIPOS[extname(alvo).toLowerCase()] ?? 'application/octet-stream',
    'Cache-Control': cacheDe(alvo === join(DIST, 'index.html') ? '/index.html' : pathname),
    ETag: etag,
  }
  if (req.headers['if-none-match'] === etag) {
    res.writeHead(304, cabecalhos)
    return res.end()
  }
  res.writeHead(200, {...cabecalhos, 'Content-Length': info.size})
  if (req.method === 'HEAD') return res.end()
  createReadStream(alvo).pipe(res)
}

createServer(async (req, res) => {
  const {pathname} = new URL(req.url, 'http://localhost')
  try {
    if (req.method === 'GET' && pathname === '/api/content') {
      const atual = cache ?? (await carregar())
      // no-cache: o navegador sempre pergunta; sem mudança, a resposta é um 304 sem corpo.
      const cabecalhos = {'Cache-Control': 'no-cache', ETag: atual.etag}
      if (req.headers['if-none-match'] === atual.etag) {
        res.writeHead(304, cabecalhos)
        return res.end()
      }
      return responder(res, 200, atual.json, cabecalhos)
    }

    if (req.method === 'GET' && pathname === '/api/events') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no',
      })
      res.write('retry: 3000\n\n')
      ouvintes.add(res)
      // Comentário periódico mantém a conexão aberta através de proxies.
      const batida = setInterval(() => res.write(': ping\n\n'), 25000)
      req.on('close', () => {
        clearInterval(batida)
        ouvintes.delete(res)
      })
      return
    }

    if (req.method === 'POST' && pathname === '/api/revalidate') {
      const corpo = await lerCorpo(req)
      if (!assinaturaValida(req.headers['sanity-webhook-signature'], corpo)) {
        return responder(res, 401, {erro: 'assinatura inválida'})
      }
      const anterior = cache?.etag
      const novo = await carregar()
      if (novo.etag !== anterior) for (const o of ouvintes) o.write('event: atualizado\ndata: {}\n\n')
      return responder(res, 200, {ok: true, alterado: novo.etag !== anterior, ouvintes: ouvintes.size})
    }

    if (pathname.startsWith('/api/')) return responder(res, 404, {erro: 'não encontrado'})
    if (req.method === 'GET' || req.method === 'HEAD') return await servirArquivo(req, res, pathname)
    responder(res, 405, {erro: 'método não permitido'})
  } catch (erro) {
    console.error(erro)
    responder(res, 502, {erro: 'falha ao consultar o Sanity'})
  }
}).listen(Number(PORT), () => {
  console.log(`API da cartilha em :${PORT}`)
  carregar().catch((e) => console.error('Carga inicial falhou:', e.message))
})
