/**
 * O site virou leitura contínua (cada seção numa folha que se rola), então o campo
 * "Na paginação" (`quebra`) saiu dos blocos. Este script apaga o valor guardado em cada
 * bloco, para o Studio não acusar campo desconhecido.
 *
 *   npx sanity exec scripts/remover-quebra.ts --with-user-token [-- --aplicar]
 */
import {aplicar, client, semRascunhos} from './migracao'

type Secao = {_id: string; titulo: string; chaves: string[] | null}

async function main() {
  const secoes = await client.fetch<Secao[]>(
    `*[_type == "secao" && count(blocos[defined(quebra)]) > 0]{_id, titulo, "chaves": blocos[defined(quebra)]._key}`,
  )
  if (!secoes.length) {
    console.log('Nenhum bloco com "quebra". Nada a fazer.')
    return
  }
  await semRascunhos(secoes.map((s) => s._id))

  const tx = client.transaction()
  for (const secao of secoes) {
    const chaves = secao.chaves ?? []
    console.log(`${secao.titulo}: ${chaves.length} bloco(s)`)
    tx.patch(secao._id, (p) => p.unset(chaves.map((k) => `blocos[_key=="${k}"].quebra`)))
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
