import {createHash, createHmac, timingSafeEqual} from 'node:crypto'
import {createServer} from 'node:http'
import {buscarConteudo} from './conteudo.mjs'

// API da cartilha (atrás do Nginx, em /api):
//   GET  /api/content     conteúdo publicado, servido de um cache em memória
//   GET  /api/events      fluxo (SSE): avisa os navegadores abertos quando o conteúdo muda
//   POST /api/revalidate  webhook do Sanity: busca o conteúdo de novo, troca o cache e avisa
const {SANITY_PROJECT_ID, SANITY_DATASET = 'production', SANITY_WEBHOOK_SECRET, PORT = '3001'} = process.env
if (!SANITY_PROJECT_ID) throw new Error('Defina SANITY_PROJECT_ID.')
if (!SANITY_WEBHOOK_SECRET) throw new Error('Defina SANITY_WEBHOOK_SECRET.')

const origem = {projectId: SANITY_PROJECT_ID, dataset: SANITY_DATASET}
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

    responder(res, 404, {erro: 'não encontrado'})
  } catch (erro) {
    console.error(erro)
    responder(res, 502, {erro: 'falha ao consultar o Sanity'})
  }
}).listen(Number(PORT), () => {
  console.log(`API da cartilha em :${PORT}`)
  carregar().catch((e) => console.error('Carga inicial falhou:', e.message))
})
