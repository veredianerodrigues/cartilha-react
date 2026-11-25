/**
 * O número da página passou a ser calculado pelo site a partir da ordem das seções, e o
 * campo "Nº da página" (`numeroPagina`) saiu do Studio. Este script apaga o valor
 * guardado em cada seção, para o Studio não acusar campo desconhecido.
 *
 *   npx sanity exec scripts/remover-numero-pagina.ts --with-user-token [-- --aplicar]
 */
import {aplicar, client, semRascunhos} from './migracao'

async function main() {
  const ids = await client.fetch<string[]>(`*[_type == "secao" && defined(numeroPagina)]._id`)
  if (!ids.length) {
    console.log('Nenhuma seção com "numeroPagina". Nada a fazer.')
    return
  }
  await semRascunhos(ids)
  console.log(`${ids.length} seção(ões) com número guardado.`)

  if (!aplicar) {
    console.log('\nSimulação: nada foi gravado. Rode de novo com "-- --aplicar" para gravar.')
    return
  }
  const tx = client.transaction()
  for (const id of ids) tx.patch(id, (p) => p.unset(['numeroPagina']))
  await tx.commit()
  console.log('\nPronto.')
}

main().catch((erro) => {
  console.error(erro.message)
  process.exit(1)
})
