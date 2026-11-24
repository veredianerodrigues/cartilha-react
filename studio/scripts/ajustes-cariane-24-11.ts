/**
 * Ajustes pedidos pela Cariane em 24/11/2026:
 * - Métodos de barreira: o casal com balões passa ao tamanho "Grande" (o texto continua
 *   embaixo, na mesma folha, pelo "Manter junto" que o bloco já tem).
 * - Fecundação: um passo por folha, com o desenho na largura toda.
 * - Direitos sexuais e reprodutivos: desenhos grandes ao lado do texto (~2 por folha) e
 *   "Procure uma unidade de saúde" em destaque, numa folha só para ele.
 * - Referências: UNICEF com a referência completa; FAVIER TORRES e PINHEIRO com acesso em 2026
 *   (na de PINHEIRO, "18 de out." passa a "18 out.", padrão ABNT).
 *
 *   npx sanity exec scripts/ajustes-cariane-24-11.ts --with-user-token [-- --aplicar]
 */
import {aplicar, chave, client, semRascunhos} from './migracao'

const BARREIRA = 'secao-metodos-barreira'
const FECUNDACAO = 'secao-fecundacao'
const DIREITOS = 'secao-direitos-sexuais-reprodutivos'

const LINK_UNICEF = 'https://www.unicef.org/brazil/seu-guia-do-segundo-trimestre'

type Span = {_key: string; text: string}
type Bloco = {_key: string; _type: string; tamanho?: string; estilo?: string; passos?: {_key: string; titulo: string}[]}

async function blocoDe(id: string, key: string) {
  const bloco = await client.fetch<Bloco | null>(`*[_id == $id][0].blocos[_key == $key][0]`, {id, key})
  if (!bloco) throw new Error(`Bloco ${key} não encontrado em ${id}.`)
  return bloco
}

// Troca "2020." por "2026." no último trecho ("Acesso em: …") de uma referência.
async function acessoEm2026(id: string) {
  const texto = await client.fetch<{_key: string; children: Span[]}[]>(`*[_id == $id][0].texto`, {id})
  const bloco = texto[0]
  const ultimo = bloco.children[bloco.children.length - 1]
  if (!/Acesso em: .* 2020\.$/.test(ultimo.text)) throw new Error(`${id}: acesso não termina em 2020 ("${ultimo.text}").`)
  // Também tira o "de" fora do padrão ABNT ("18 de out." -> "18 out.").
  const novo = ultimo.text.replace(/2020\.$/, '2026.').replace(/(\d+) de ([a-z]{3}\.)/, '$1 $2')
  console.log(`${id}: "${ultimo.text}" -> "${novo}"`)
  return {path: `texto[_key=="${bloco._key}"].children[_key=="${ultimo._key}"].text`, novo}
}

async function main() {
  const ids = [BARREIRA, FECUNDACAO, DIREITOS, 'referencia-30', 'referencia-32', 'referencia-33']
  await semRascunhos(ids)
  const tx = client.transaction()

  const casal = await blocoDe(BARREIRA, 'k71')
  console.log(`${BARREIRA} k71: tamanho ${casal.tamanho} -> grande`)
  tx.patch(BARREIRA, (p) => p.set({'blocos[_key=="k71"].tamanho': 'grande'}))

  const passos = await blocoDe(FECUNDACAO, '8nebwigya4')
  if (passos._type !== 'blocoPassos') throw new Error('Fecundação: o bloco 8nebwigya4 não é um passo a passo.')
  console.log(`${FECUNDACAO} 8nebwigya4: tamanho do desenho -> pagina (${passos.passos?.length} passos)`)
  tx.patch(FECUNDACAO, (p) => p.set({'blocos[_key=="8nebwigya4"].tamanhoDesenho': 'pagina'}))

  const direitos = await blocoDe(DIREITOS, 'y4785op74a')
  const unidade = direitos.passos?.find((item) => item.titulo === 'Procure uma unidade de saúde')
  if (!unidade) throw new Error('Direitos: item "Procure uma unidade de saúde" não encontrado.')
  console.log(`${DIREITOS} y4785op74a: tamanho do desenho -> grande; destaque em "${unidade.titulo}"`)
  tx.patch(DIREITOS, (p) =>
    p.set({
      'blocos[_key=="y4785op74a"].tamanhoDesenho': 'grande',
      [`blocos[_key=="y4785op74a"].passos[_key=="${unidade._key}"].destaque`]: true,
    }),
  )

  const link = chave()
  const unicef = [
    {
      _type: 'block',
      _key: chave(),
      style: 'normal',
      markDefs: [{_type: 'link', _key: link, href: LINK_UNICEF}],
      children: [
        {_type: 'span', _key: chave(), marks: [], text: 'UNICEF BRASIL. '},
        {_type: 'span', _key: chave(), marks: ['em'], text: 'Seu guia do segundo trimestre'},
        {_type: 'span', _key: chave(), marks: [], text: ': dicas para as semanas 13 a 28 da sua gravidez. Disponível em: '},
        {_type: 'span', _key: chave(), marks: [link], text: LINK_UNICEF},
        {_type: 'span', _key: chave(), marks: [], text: '. Acesso em: 24 nov. 2026.'},
      ],
    },
  ]
  console.log(`referencia-30: ${unicef[0].children.map((c) => c.text).join('')}`)
  tx.patch('referencia-30', (p) => p.set({texto: unicef}))

  for (const id of ['referencia-33', 'referencia-32']) {
    const {path, novo} = await acessoEm2026(id)
    tx.patch(id, (p) => p.set({[path]: novo}))
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
