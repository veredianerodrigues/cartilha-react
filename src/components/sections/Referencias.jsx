import { useEffect, useState } from 'react';
import { useSections } from '../../context/SectionsContext.jsx';
import PortableTextView from './shared/PortableTextView.jsx';

// Lista numerada de referências, na ordem de `listaReferencias` no Sanity. O número
// exibido é a posição atual na lista; as citações apontam para a referência pelo id
// estável e chegam aqui por /secao/referencias#ref-N. O livro (LivroPaginas.jsx) abre
// na folha que contém a entrada; aqui ela só é destacada por alguns segundos.
export default function Referencias() {
  const { referencias } = useSections();
  const [highlighted, setHighlighted] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    setHighlighted(hash.slice(1));
    const timer = setTimeout(() => setHighlighted(null), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ol className="space-y-3">
      {referencias.map((ref, i) => {
        const id = `ref-${i + 1}`;
        return (
          <li
            key={ref._id}
            id={id}
            className={`grid grid-cols-[1.75rem_1fr] gap-1 font-texto text-legenda font-normal text-tinta rounded-md break-inside-avoid transition-colors duration-500 ${
              highlighted === id ? 'bg-azul-claro' : ''
            }`}
          >
            <span className="font-semibold tabular-nums text-azul-texto">{i + 1}.</span>
            <PortableTextView className="min-w-0 break-words !text-legenda [&_p]:m-0" value={ref.texto} />
          </li>
        );
      })}
    </ol>
  );
}
