import {blocoGradeImagens, blocoImagem, blocoTexto, imagemItem} from './blocos'
import {portableText} from './portableText'
import {listaReferencias, referencia} from './referencia'
import {secao} from './secao'

export const schemaTypes = [
  // documentos
  secao,
  referencia,
  listaReferencias,
  // blocos de conteúdo
  blocoTexto,
  blocoImagem,
  blocoGradeImagens,
  imagemItem,
  // texto rico
  portableText,
]
