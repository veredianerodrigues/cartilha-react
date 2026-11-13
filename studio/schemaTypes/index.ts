import {blocoGradeImagens, blocoImagem, blocoPassos, blocoTexto, imagemItem, passoItem} from './blocos'
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
  blocoPassos,
  passoItem,
  imagemItem,
  // texto rico
  portableText,
]
