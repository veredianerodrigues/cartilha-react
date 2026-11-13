import { PortableText } from '@portabletext/react';
import { useSections } from '../../../context/SectionsContext.jsx';

// Citação inline: mostra o número de cada referência (posição atual na lista) e leva
// até a entrada em /secao/referencias. É um <a> comum de propósito: a página
// Referências rola e destaca a entrada certa a cada carregamento (ver Referencias.jsx).
function Citacao({ value }) {
  const { citationMap } = useSections();
  const numeros = value.referencias.map((ref) => citationMap[ref._ref]);
  return (
    <sup className="text-[0.7em] leading-none align-super">
      {numeros.map((n, i) => (
        <span key={i}>
          {i > 0 && ','}
          <a href={`/secao/referencias#ref-${n}`} className="hover:underline">
            {n}
          </a>
        </span>
      ))}
    </sup>
  );
}

const components = {
  block: {
    normal: ({ children }) => (
      <p className="font-worksans text-sm leading-[22px] tracking-[0.14px] text-justify mb-3 last:mb-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-5 mb-3 last:mb-0">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-5 mb-3 last:mb-0">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="font-worksans text-sm leading-[22px] tracking-[0.14px]">{children}</li>,
    number: ({ children }) => <li className="font-worksans text-sm leading-[22px] tracking-[0.14px]">{children}</li>,
  },
  marks: {
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-brand-blue underline">
        {children}
      </a>
    ),
  },
  types: {
    citacao: Citacao,
  },
};

export default function PortableTextView({ value, className = '' }) {
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
