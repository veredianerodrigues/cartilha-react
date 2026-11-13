import {blocoGradeImagens, blocoImagem, blocoPassos, blocoTexto, imagemItem, passoItem} from './blocos'
import {portableText} from './portableText'
import {referencia} from './referencia'
import {secao} from './secao'

export const schemaTypes = [
  // documentos
  secao,
  referencia,
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
