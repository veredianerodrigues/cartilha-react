import { useEffect, useState } from 'react';
import { useSections } from '../../context/SectionsContext.jsx';
import PortableTextView from './shared/PortableTextView.jsx';

// Lista numerada de referências, na ordem de `listaReferencias` no Sanity. O número
// exibido é a posição atual na lista; as citações apontam para a referência pelo id
// estável e chegam aqui por /secao/referencias#ref-N. Ao carregar com esse hash, rola
// até a entrada e a destaca por alguns segundos.
export default function Referencias() {
  const { referencias } = useSections();
  const [highlighted, setHighlighted] = useState(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setHighlighted(hash.slice(1));
    const timer = setTimeout(() => setHighlighted(null), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ol className="space-y-4">
      {referencias.map((ref, i) => {
        const id = `ref-${i + 1}`;
        return (
          <li
            key={ref._id}
            id={id}
            className={`grid grid-cols-[1.75rem_1fr] gap-1 font-worksans text-black text-xs leading-[20px] tracking-[0.12px] rounded-md transition-colors duration-500 ${
              highlighted === id ? 'bg-yellow-100' : ''
            }`}
          >
            <span className="font-semibold tabular-nums">{i + 1}.</span>
            <PortableTextView className="min-w-0 break-words [&_p]:m-0" value={ref.texto} />
          </li>
        );
      })}
    </ol>
  );
}
