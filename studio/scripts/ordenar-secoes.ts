// Converte o antigo campo numérico `ordem` das seções no `orderRank` (arrastar e soltar
// no Studio) e remove `ordem`. Uso: npx sanity exec scripts/ordenar-secoes.ts --with-user-token
import {LexoRank} from 'lexorank'
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-08-15'})

const secoes: {_id: string; titulo: string; ordem?: number; orderRank?: string}[] = await client.fetch(
  `*[_type == "secao" && !(_id in path("drafts.**"))] | order(ordem asc) {_id, titulo, ordem, orderRank}`,
)

let rank = LexoRank.middle()
const tx = client.transaction()
for (const s of secoes) {
  const valor = rank.toString()
  tx.patch(s._id, (p) => p.set({orderRank: valor}).unset(['ordem']))
  console.log(String(s.ordem).padStart(3), '->', valor, s.titulo)
  rank = rank.genNext()
}
await tx.commit()
console.log(`${secoes.length} seções ordenadas.`)
