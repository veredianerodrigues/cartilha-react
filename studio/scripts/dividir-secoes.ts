/**
 * Divide as duas seções mais longas da cartilha (24/11/2026), movendo os blocos para
 * seções novas sem copiar nada à mão (imagens, citações e chaves seguem iguais):
 *
 * - "E na suspeita de gravidez..." fica com suspeita, teste e resultado; ganha duas
 *   subseções: "As mudanças na gestação" (trimestres) e "O bebê nasceu, e agora?"
 *   (puerpério).
 * - "Anticoncepcionais hormonais" fica com a introdução e a pílula; o injetável e os
 *   demais métodos vão para "Injetável e outros métodos hormonais", na mesma seção-mãe.
 *
 * As seções novas entram logo depois da original na ordem da cartilha (orderRank); o
 * número da página é calculado pelo site a partir dessa ordem.
 *
 *   npx sanity exec scripts/dividir-secoes.ts --with-user-token [-- --aplicar]
 */
import {LexoRank} from 'lexorank'
import {aplicar, client, semRascunhos} from './migracao'

type Bloco = {_key: string; titulo?: string}
type Secao = {_id: string; titulo: string; orderRank: string; pai?: {_ref: string}; blocos: Bloco[]}

type Parte = {id: string; titulo: string; slug: string; aPartirDe: string; tirarTituloDoPrimeiro?: boolean}

const DIVISOES: {origem: string; contagem: number; filhasDaOrigem: boolean; partes: Parte[]}[] = [
  {
    origem: 'secao-gravidez-adolescencia-mudancas',
    contagem: 29,
    filhasDaOrigem: true,
    partes: [
      {id: 'secao-gestacao-mudancas', titulo: 'As mudanças na gestação', slug: 'mudancas-na-gestacao', aPartirDe: 'kbb'},
      // O primeiro bloco tem o mesmo título da seção nova: o título sai do bloco para não repetir.
      {
        id: 'secao-bebe-nasceu',
        titulo: 'O bebê nasceu, e agora?',
        slug: 'o-bebe-nasceu',
        aPartirDe: '194e957cf5af',
        tirarTituloDoPrimeiro: true,
      },
    ],
  },
  {
    origem: 'secao-metodos-hormonais',
    contagem: 13,
    filhasDaOrigem: false,
    partes: [
      {
        id: 'secao-metodos-hormonais-injetavel',
        titulo: 'Injetável e outros métodos hormonais',
        slug: 'injetavel-e-outros-hormonais',
        aPartirDe: 'k8z',
      },
    ],
  },
]

async function main() {
  const ids = DIVISOES.flatMap((d) => [d.origem, ...d.partes.map((p) => p.id)])
  await semRascunhos(ids)
  const existentes = await client.fetch<string[]>(`*[_id in $ids]._id`, {ids: DIVISOES.flatMap((d) => d.partes.map((p) => p.id))})
  if (existentes.length) throw new Error(`Já existem: ${existentes.join(', ')} (divisão já feita?).`)

  const ordem = await client.fetch<{_id: string; orderRank: string}[]>(`*[_type == "secao"] | order(orderRank asc){_id, orderRank}`)
  const tx = client.transaction()

  for (const divisao of DIVISOES) {
    const origem = await client.fetch<Secao>(`*[_id == $id][0]{_id, titulo, orderRank, pai, blocos}`, {id: divisao.origem})
    if (origem.blocos.length !== divisao.contagem) {
      throw new Error(`"${origem.titulo}" tem ${origem.blocos.length} blocos, esperava ${divisao.contagem}. Confira antes de dividir.`)
    }

    // Índices de corte, pelas chaves (não pela posição): se o conteúdo mudou, para aqui.
    const cortes = divisao.partes.map((parte) => {
      const i = origem.blocos.findIndex((b) => b._key === parte.aPartirDe)
      if (i <= 0) throw new Error(`Bloco ${parte.aPartirDe} não encontrado em "${origem.titulo}".`)
      return i
    })

    // Ranks entre a seção original e a seguinte na cartilha.
    const posicao = ordem.findIndex((s) => s._id === origem._id)
    let anterior = LexoRank.parse(origem.orderRank)
    const seguinte = ordem[posicao + 1] ? LexoRank.parse(ordem[posicao + 1].orderRank) : anterior.genNext()

    console.log(`\n${origem.titulo}: fica com os blocos 1 a ${cortes[0]}`)
    divisao.partes.forEach((parte, n) => {
      const inicio = cortes[n]
      const fim = cortes[n + 1] ?? origem.blocos.length
      const blocos = origem.blocos.slice(inicio, fim).map((b, j) => {
        if (j === 0 && parte.tirarTituloDoPrimeiro) {
          const {titulo: _titulo, ...semTitulo} = b
          return semTitulo
        }
        return b
      })
      const rank = anterior.between(seguinte)
      anterior = rank
      const pai = divisao.filhasDaOrigem ? origem._id : origem.pai?._ref
      console.log(
        `  → "${parte.titulo}" (/secao/${parte.slug}): blocos ${inicio + 1} a ${fim}, ${blocos.length} no total` +
          (pai ? `, dentro de ${pai}` : ''),
      )
      tx.create({
        _id: parte.id,
        _type: 'secao',
        titulo: parte.titulo,
        slug: {_type: 'slug', current: parte.slug},
        orderRank: rank.toString(),
        ...(pai ? {pai: {_type: 'reference', _ref: pai}} : {}),
        blocos,
      })
    })
    tx.patch(origem._id, (p) => p.set({blocos: origem.blocos.slice(0, cortes[0])}))
  }

  if (!aplicar) {
    console.log('\nSimulação: nada foi gravado. Rode de novo com "-- --aplicar" para gravar.')
    return
  }
  await tx.commit()
  console.log('\nPronto.')
}

main().catch((erro) => {
  console.error(erro.message)
  process.exit(1)
})
