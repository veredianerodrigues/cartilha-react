/**
 * Marca as fotos da cartilha com "Tipo de imagem" = Cena (sem borda, cantos em folha).
 * Sem o campo preenchido, o site usa a moldura de Ilustração (cartão com borda).
 * Nenhuma foto atual é recortada sem fundo, então nenhuma vai para Retrato.
 *
 *   npx sanity exec scripts/marcar-fotos-cena.ts --with-user-token [-- --aplicar]
 */
import {aplicar, chavesDe, client, semRascunhos} from './migracao'

const FOTOS: Record<string, Record<string, string>> = {
  'secao-adolescencia-chegou': {k0: 'p. 5 menina pensativa'},
  'secao-transformacoes-menino': {kj: 'p. 6 menino pensativo'},
  'secao-erecao-ejaculacao': {k1i: 'p. 7 menino de camisa jeans'},
  'secao-transformacoes-menina': {k21: 'p. 8 três meninas'},
  'secao-estagios-de-tanner': {k2w: 'p. 9 grupo no parque'},
  'secao-metodos-contraceptivos': {k5l: 'p. 12 objetos contraceptivos'},
  'secao-metodos-barreira': {k71: 'p. 14 "Para pensar..."'},
  'secao-metodos-hormonais': {k8j: 'p. 16 "Já parou para pensar?"'},
  'secao-mitos-anticoncepcional': {k9d: 'p. 17 consultório'},
  'secao-gravidez-adolescencia-mudancas': {kaa: 'p. 19 teste de gravidez'},
  'secao-orientacao-quem-pode-ajudar': {kcb: 'p. 20 consultório'},
}

async function main() {
  const ids = Object.keys(FOTOS)
  await semRascunhos(ids)

  const tx = client.transaction()
  for (const id of ids) {
    const atuais = await chavesDe(id)
    for (const [k, descricao] of Object.entries(FOTOS[id])) {
      if (!atuais.includes(k)) throw new Error(`${id}: bloco ${k} (${descricao}) não encontrado.`)
      tx.patch(id, (p) => p.set({[`blocos[_key=="${k}"].imagem.tipo`]: 'cena'}))
      console.log(`${descricao} -> cena`)
    }
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
