import { client } from './sanity.js';

// Uma única consulta traz o conteúdo inteiro: seções (na ordem da cartilha, com blocos)
// e todas as referências (o número da citação é a posição na ordem alfabética).
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
      imagem { "tipo": coalesce(tipo, "ilustracao"), alt, legenda, fonte, imagem },
      tamanho,
      alinhamento,
      modo,
      imagens[] { _key, "tipo": coalesce(tipo, "ilustracao"), alt, legenda, fonte, imagem },
      fonte,
      "estilo": coalesce(estilo, "numerado"),
      "quebra": coalesce(quebra, "auto"),
      passos[] {
        _key,
        titulo,
        texto,
        imagem { "tipo": coalesce(tipo, "ilustracao"), alt, legenda, fonte, imagem }
      },
      lembretes,
      nota
    }, [])
  },
  "referencias": *[_type == "referencia"] { _id, texto }
}`;

const textoSimples = (texto) =>
  texto.map((b) => (b.children ?? []).map((c) => c.text).join('')).join(' ');

// Referências em ordem alfabética (ABNT), ignorando acentos e maiúsculas: a posição
// de cada uma é o número mostrado nas citações.
export async function fetchContent() {
  const data = await client.fetch(CONTENT_QUERY);
  const referencias = [...data.referencias].sort((a, b) =>
    textoSimples(a.texto).localeCompare(textoSimples(b.texto), 'pt-BR', { sensitivity: 'base' }),
  );
  return { ...data, referencias };
}
