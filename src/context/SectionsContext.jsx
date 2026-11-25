import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { fetchContent } from '../lib/queries.js';

const SectionsContext = createContext(null);

const INTERVALO_CONFERENCIA = 90 * 1000;

// A primeira seção é a página 04: antes dela vêm capa, contracapa/ficha e sumário.
const PRIMEIRA_PAGINA = 4;

// Converte o documento `secao` do Sanity no formato que sumário, capa, índice e
// navegação já consomem (slug, title, page_label, children).
function toNode(secao) {
  return {
    id: secao._id,
    slug: secao.slug,
    title: secao.titulo,
    subtitle: secao.subtitulo,
    parentId: secao.paiId,
    blocks: secao.blocos,
    children: [],
  };
}

// Número da página de cada seção: uma página por seção, na ordem de leitura (capítulo e
// depois as subseções dele). Dividir, juntar ou reordenar seções no Studio renumera tudo
// sozinho; não há número para digitar.
function numerar(nodes, proxima = { valor: PRIMEIRA_PAGINA }) {
  for (const node of nodes) {
    node.page_label = String(proxima.valor++).padStart(2, '0');
    numerar(node.children, proxima);
  }
}

function buildTree(secoes) {
  const nodes = secoes.map(toNode);
  const byId = new Map(nodes.map((n) => [n.id, n]));
  const roots = [];
  for (const node of nodes) {
    if (node.parentId) byId.get(node.parentId).children.push(node);
    else roots.push(node);
  }
  numerar(roots);
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

  // Versão (ETag) do conteúdo exibido: a conferência só troca o conteúdo quando ela muda,
  // para o livro não ser remontado sem necessidade.
  const versaoAtual = useRef(null);

  // silencioso: atualização em segundo plano, sem trocar a tela por "carregando".
  const reload = useCallback((silencioso = false) => {
    if (silencioso !== true) setLoading(true);
    fetchContent()
      .then(({ versao, dados }) => {
        if (silencioso === true && versao === versaoAtual.current) return;
        versaoAtual.current = versao;
        setTree(buildTree(dados.secoes));
        setReferencias(dados.referencias);
        setError(null);
      })
      .catch((err) => silencioso !== true && setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Publicação no Studio: a aba visível confere a versão a cada INTERVALO_CONFERENCIA e
  // ao voltar a ficar visível. Sem mudança, o servidor responde 304 e libera a conexão
  // na hora. (Uma conexão aberta por aba, como no SSE, prendia as cópias do app na
  // Hostinger e levava o "Máximo de processos" para perto do limite.)
  useEffect(() => {
    const conferir = () => document.visibilityState === 'visible' && reload(true);
    const timer = setInterval(conferir, INTERVALO_CONFERENCIA);
    document.addEventListener('visibilitychange', conferir);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', conferir);
    };
  }, [reload]);

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
