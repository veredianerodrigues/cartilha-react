// Consulta ao Sanity feita pelo servidor. Uma única consulta traz o conteúdo inteiro:
// seções (na ordem definida arrastando no Studio, com blocos) e todas as referências.
const API_VERSION = '2026-11-01';

const CONTENT_QUERY = `{
  "secoes": *[_type == "secao"] | order(orderRank asc) {
    _id,
    titulo,
    subtitulo,
    "slug": slug.current,
    numeroPagina,
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
      "tamanhoDesenho": coalesce(tamanhoDesenho, "pequeno"),
      passos[] {
        _key,
        titulo,
        texto,
        "destaque": coalesce(destaque, false),
        imagem { "tipo": coalesce(tipo, "ilustracao"), alt, legenda, fonte, imagem }
      },
      imagemLateral { "tipo": coalesce(tipo, "ilustracao"), alt, legenda, fonte, imagem },
      lembretes,
      nota
    }, [])
  },
  "referencias": *[_type == "referencia"] { _id, texto }
}`;

const textoSimples = (texto) => texto.map((b) => (b.children ?? []).map((c) => c.text).join('')).join(' ');

/**
 * Busca o conteúdo publicado direto na API do Sanity (não na CDN, que pode demorar a
 * refletir uma publicação). As referências saem em ordem alfabética (ABNT), ignorando
 * acentos e maiúsculas: a posição de cada uma é o número mostrado nas citações.
 */
export async function buscarConteudo({projectId, dataset}) {
  const url = new URL(`https://${projectId}.api.sanity.io/v${API_VERSION}/data/query/${dataset}`);
  url.searchParams.set('query', CONTENT_QUERY);
  url.searchParams.set('perspective', 'published');

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity respondeu ${res.status}`);
  const {result} = await res.json();

  const referencias = [...result.referencias].sort((a, b) =>
    textoSimples(a.texto).localeCompare(textoSimples(b.texto), 'pt-BR', {sensitivity: 'base'}),
  );
  return {...result, referencias};
}
