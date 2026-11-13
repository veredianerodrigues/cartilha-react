/**
 * Ajuste do 2º lote (p. 19): as fotos das gestantes (moldura Retrato) vieram antes do
 * texto de cada trimestre e flutuando à direita; altas demais, acabavam sozinhas numa
 * folha. Aqui cada foto passa para depois do texto do trimestre, centralizada.
 *
 *   npx sanity exec scripts/ajustar-gestantes.ts --with-user-token [-- --aplicar]
 */
import {aplicar, client, semRascunhos} from './migracao'

const ID = 'secao-gravidez-adolescencia-mudancas'

type Bloco = {_key: string; _type: string; imagem?: {tipo?: string}; alinhamento?: string}

async function main() {
  await semRascunhos([ID])
  const blocos = await client.fetch<Bloco[]>(`*[_id == $id][0].blocos`, {id: ID})

  const novos: Bloco[] = []
  for (let i = 0; i < blocos.length; i++) {
    const bloco = blocos[i]
    const proximo = blocos[i + 1]
    if (bloco._type === 'blocoImagem' && bloco.imagem?.tipo === 'retrato' && proximo?._type === 'blocoTexto') {
      novos.push(proximo, {...bloco, alinhamento: 'centro'})
      console.log(`foto ${bloco._key} movida para depois do texto ${proximo._key}`)
      i++
    } else {
      novos.push(bloco)
    }
  }

  if (!aplicar) {
    console.log('\nSimulação: nada foi gravado. Rode de novo com "-- --aplicar" para gravar.')
    return
  }
  await client.patch(ID).set({blocos: novos}).commit()
  console.log('\nPronto.')
}

main().catch((erro) => {
  console.error(erro.message)
  process.exit(1)
})
