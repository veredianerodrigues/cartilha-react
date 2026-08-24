import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { api } from '../lib/api.js';
import { precacheWholeCartilha } from '../lib/offlineSync.js';

const SectionsContext = createContext(null);

function flatten(nodes, depth = 0, out = []) {
  for (const node of nodes) {
    out.push({ ...node, depth });
    if (node.children?.length) flatten(node.children, depth + 1, out);
  }
  return out;
}

export function SectionsProvider({ children }) {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // {idEstável: posição atual} — resolve <sup data-citation data-n="N"> pra
  // que número mostrar, na ordem em que as referências estão AGORA (podem
  // ter sido reordenadas pelo admin desde que a citação foi escrita). Ver
  // RichHtml.jsx e migrateReferenciasText.js.
  const [citationMap, setCitationMap] = useState({});

  const reload = useCallback(() => {
    setLoading(true);
    api
      .getSectionsTree()
      .then((data) => {
        setTree(data);
        setError(null);
        // Não bloqueia a navegação — roda depois que a árvore já renderizou.
        setTimeout(() => precacheWholeCartilha(data), 0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

    api
      .getSection('referencias')
      .then((data) => {
        const map = {};
        (data.blocks || [])
          .filter((b) => b.type === 'paragraph' && b.heading)
          .forEach((b, i) => {
            map[b.heading] = i + 1;
          });
        setCitationMap(map);
      })
      .catch(() => {});
  }, []);

  useEffect(reload, [reload]);

  const flatSections = useMemo(() => flatten(tree), [tree]);

  return (
    <SectionsContext.Provider value={{ tree, flatSections, loading, error, reload, citationMap }}>
      {children}
    </SectionsContext.Provider>
  );
}

export function useSections() {
  return useContext(SectionsContext);
}
