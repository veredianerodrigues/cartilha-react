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
  }, []);

  useEffect(reload, [reload]);

  const flatSections = useMemo(() => flatten(tree), [tree]);

  return (
    <SectionsContext.Provider value={{ tree, flatSections, loading, error, reload }}>
      {children}
    </SectionsContext.Provider>
  );
}

export function useSections() {
  return useContext(SectionsContext);
}
