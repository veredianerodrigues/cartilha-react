/**
 * Funções comuns dos scripts que trocam infográficos por conteúdo em HTML.
 * Rodar sempre dentro de studio/ com `npx sanity exec <script> --with-user-token`;
 * sem `-- --aplicar` o script só simula.
 */
import {createReadStream} from 'node:fs'
import {resolve} from 'node:path'
import {getCliClient} from 'sanity/cli'

export const client = getCliClient({apiVersion: '2026-11-01'})
export const aplicar = process.argv.includes('--aplicar')

export const chave = () => Math.random().toString(36).slice(2, 12)

// Uma linha de texto -> bloco de Portable Text. **trecho** vira negrito; uma linha que
// começa com "• " vira item de lista com marcadores.
function bloco(linha: string) {
  const marcador = linha.startsWith('• ')
  const texto = marcador ? linha.slice(2) : linha
  const partes = texto.split(/(\*\*[^*]+\*\*)/).filter(Boolean)
  return {
    _type: 'block',
    _key: chave(),
    style: 'normal',
    markDefs: [],
    ...(marcador ? {listItem: 'bullet', level: 1} : {}),
    children: partes.map((parte) => {
      const negrito = parte.startsWith('**')
      return {
        _type: 'span',
        _key: chave(),
        text: negrito ? parte.slice(2, -2) : parte,
        marks: negrito ? ['strong'] : [],
      }
    }),
  }
}

export const textoPT = (...linhas: string[]) => linhas.map(bloco)

// Envia um recorte de scripts/infograficos/ e devolve o objeto imagemItem.
export async function imagem(
  arquivo: string,
  alt: string,
  extra: {tipo?: string; legenda?: string; fonte?: string} = {},
) {
  const base = {_type: 'imagemItem', tipo: extra.tipo ?? 'ilustracao', alt, legenda: extra.legenda, fonte: extra.fonte}
  if (!aplicar) return {...base, imagem: `(enviaria ${arquivo})`}
  const asset = await client.assets.upload('image', createReadStream(resolve('scripts/infograficos', arquivo)), {
    filename: arquivo,
  })
  return {...base, imagem: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}}}
}

export type Item = {titulo: string; texto?: string[]; arquivo?: string; alt?: string}

export async function itens(lista: Item[]) {
  const saida = []
  for (const item of lista) {
    saida.push({
      _type: 'passoItem',
      _key: chave(),
      titulo: item.titulo,
      ...(item.texto ? {texto: textoPT(...item.texto)} : {}),
      ...(item.arquivo ? {imagem: await imagem(item.arquivo, item.alt ?? item.titulo)} : {}),
    })
  }
  return saida
}

// Para antes de gravar se houver rascunho aberto: ele ficaria desatualizado e, ao ser
// publicado no Studio, desfaria a troca.
export async function semRascunhos(ids: string[]) {
  const rascunhos = await client.fetch<string[]>(`*[_id in $ids]._id`, {ids: ids.map((id) => `drafts.${id}`)})
  if (rascunhos.length) {
    throw new Error(`Há rascunho aberto em ${rascunhos.join(', ')}. Publique ou descarte no Studio e rode de novo.`)
  }
}

export async function chavesDe(id: string) {
  return client.fetch<string[]>(`*[_id == $id][0].blocos[]._key`, {id})
}
