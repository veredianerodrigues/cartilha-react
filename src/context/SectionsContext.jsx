import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { fetchContent } from '../lib/queries.js';

const SectionsContext = createContext(null);

// Converte o documento `secao` do Sanity no formato que sumário, capa, índice e
// navegação já consomem (slug, title, page_label, children).
function toNode(secao) {
  return {
    id: secao._id,
    slug: secao.slug,
    title: secao.titulo,
    subtitle: secao.subtitulo,
    page_label: secao.numeroPagina,
    order_index: secao.ordem,
    parentId: secao.paiId,
    blocks: secao.blocos,
    children: [],
  };
}

function buildTree(secoes) {
  const nodes = secoes.map(toNode);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const roots = [];
  for (const node of nodes) {
    if (node.parentId) byId.get(node.parentId).children.push(node);
    else roots.push(node);
  }
  return roots;
}

function flatten(nodes, depth = 0, out = []) {
  for (const node of nodes) {
    out.push({ ...node, depth });
    if (node.children.length) flatten(node.children, depth + 1, out);
  }
  return out;
}

export function SectionsProvider({ children }) {
  const [tree, setTree] = useState([]);
  const [referencias, setReferencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    fetchContent()
      .then((data) => {
        setTree(buildTree(data.secoes));
        setReferencias(data.referencias);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(reload, [reload]);

  const flatSections = useMemo(() => flatten(tree), [tree]);

  // {_id estável da referência: posição atual na lista} — resolve as citações para o
  // número exibido, que acompanha a ordem da lista sem editar os textos.
  const citationMap = useMemo(() => {
    const map = {};
    referencias.forEach((ref, i) => {
      map[ref._id] = i + 1;
    });
    return map;
  }, [referencias]);

  const getSection = useCallback((slug) => flatSections.find((s) => s.slug === slug), [flatSections]);

  return (
    <SectionsContext.Provider
      value={{ tree, flatSections, getSection, referencias, citationMap, loading, error, reload }}
    >
      {children}
    </SectionsContext.Provider>
  );
}

export function useSections() {
  return useContext(SectionsContext);
}
