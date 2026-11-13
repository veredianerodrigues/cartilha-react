import { client } from './sanity.js';

// Uma única consulta traz o conteúdo inteiro: seções (na ordem da cartilha, com blocos)
// e a lista de referências (a posição na lista é o número mostrado na citação).
const CONTENT_QUERY = `{
  "secoes": *[_type == "secao"] | order(ordem asc) {
    _id,
    titulo,
    subtitulo,
    "slug": slug.current,
    numeroPagina,
    ordem,
    "paiId": pai._ref,
    "blocos": coalesce(blocos[] {
      _key,
      _type,
      variante,
      titulo,
      conteudo,
      imagem { alt, legenda, fonte, imagem },
      modo,
      imagens[] { _key, alt, legenda, fonte, imagem }
    }, [])
  },
  "referencias": coalesce(*[_id == "lista-referencias"][0].itens[]-> { _id, texto }, [])
}`;

export function fetchContent() {
  return client.fetch(CONTENT_QUERY);
}
