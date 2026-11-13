/**
 * p. 19: cada gestante sai do bloco de imagem solto e passa para o campo "Imagem ao lado"
 * da grade de sintomas do seu trimestre (a imagem na primeira coluna, a grade ao lado).
 * Usa recortes novos, sem a faixa do infográfico original na borda.
 *
 *   npx sanity exec scripts/gestantes-ao-lado.ts --with-user-token [-- --aplicar]
 */
import {aplicar, client, imagem, semRascunhos} from './migracao'

const ID = 'secao-gravidez-adolescencia-mudancas'

// Título da grade -> recorte novo e texto alternativo.
const DESTINOS = [
  {grade: 'Sintomas no corpo', arquivo: 'kbc-gestante-lado.png', alt: 'Adolescente grávida no início da gestação, com as mãos na barriga.'},
  {grade: 'Sintomas comuns', arquivo: 'kbg-gestante-lado.png', alt: 'Adolescente grávida no segundo trimestre, com a barriga mais visível.'},
  {grade: 'Principais mudanças e sinais', arquivo: 'kbk-gestante-lado.png', alt: 'Adolescente grávida no fim da gestação, com a barriga grande.'},
]

type Bloco = {_key: string; _type: string; titulo?: string; estilo?: string; imagem?: {tipo?: string}}

async function main() {
  await semRascunhos([ID])
  const blocos = await client.fetch<Bloco[]>(`*[_id == $id][0].blocos`, {id: ID})

  const retratos = blocos.filter((b) => b._type === 'blocoImagem' && b.imagem?.tipo === 'retrato')
  if (retratos.length !== 3) throw new Error(`Esperava 3 fotos de gestante soltas, achei ${retratos.length} (já ajustado?).`)

  const tx = client.transaction()
  for (const destino of DESTINOS) {
    const grade = blocos.find((b) => b._type === 'blocoPassos' && b.estilo === 'grade' && b.titulo === destino.grade)
    if (!grade) throw new Error(`Grade "${destino.grade}" não encontrada.`)
    const item = await imagem(destino.arquivo, destino.alt, {tipo: 'retrato'})
    tx.patch(ID, (p) => p.set({[`blocos[_key=="${grade._key}"].imagemLateral`]: item}))
    console.log(`"${destino.grade}": imagem ao lado <- ${destino.arquivo}`)
  }
  tx.patch(ID, (p) => p.unset(retratos.map((r) => `blocos[_key=="${r._key}"]`)))
  console.log(`remove as fotos soltas: ${retratos.map((r) => r._key).join(', ')}`)

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
