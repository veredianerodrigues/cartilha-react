import { useEffect, useState } from 'react';
import PageHero from '../PageHero.jsx';
import RichHtml from './shared/RichHtml.jsx';

// Quando chega via link de citação (ver RichHtml.jsx, que aponta pra
// /secao/referencias#ref-N), rola até a entrada certa e destaca ela por
// alguns segundos — o link é um <a href> puro dentro de HTML salvo, então
// sempre é navegação de página inteira, nunca troca de rota só no cliente;
// esse efeito roda de novo a cada carregamento.
export default function Referencias({ orderedFields = [] }) {
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
    <div className="relative">
      <PageHero pageLabel="21" weight="semibold" title="Referências" />

      {/* Lista numerada e editável pelo /admin (add/mover/remover) — o número
          exibido é sempre a posição atual (índice + 1), nunca a chave interna
          estável (block.heading) usada pelas citações pra apontar aqui. Cada
          <li> tem id="ref-N" (N = posição) pra ser alvo do link. */}
      <ol className="space-y-4">
        {orderedFields.map((entry, i) => {
          const id = `ref-${i + 1}`;
          return (
            <li
              key={entry.key ?? i}
              id={id}
              className={`grid grid-cols-[1.75rem_1fr] gap-1 font-worksans text-black text-xs leading-[20px] tracking-[0.12px] rounded-md transition-colors duration-500 ${
                highlighted === id ? 'bg-yellow-100' : ''
              }`}
            >
              <span className="font-semibold tabular-nums">{i + 1}.</span>
              <RichHtml className="min-w-0 text-justify break-words [&_p]:m-0" html={entry.html} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
