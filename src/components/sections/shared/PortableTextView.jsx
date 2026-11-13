import { PortableText } from '@portabletext/react';
import { useSections } from '../../../context/SectionsContext.jsx';

// Citação inline: mostra o número de cada referência (posição atual na lista) e leva
// até a entrada em /secao/referencias. É um <a> comum de propósito: a página
// Referências abre já virada na folha da entrada e a destaca (ver Referencias.jsx e
// LivroPaginas.jsx).
function Citacao({ value }) {
  const { citationMap } = useSections();
  const numeros = value.referencias.map((ref) => citationMap[ref._ref]);
  return (
    <sup className="text-[0.7em] leading-none align-super text-azul-texto">
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

// Estilo `corpo` do Design System (Work Sans 15/24). `abre` deixa o primeiro parágrafo
// no estilo `abre-texto` (17/27) — usado no primeiro bloco de texto da página.
const components = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc marker:text-azul-marca space-y-2 pl-5 mb-4 last:mb-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal marker:text-azul-marca marker:font-semibold space-y-2 pl-5 mb-4 last:mb-0">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    underline: ({ children }) => <u>{children}</u>,
    link: ({ value, children }) => (
      <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-azul-texto underline">
        {children}
      </a>
    ),
  },
  types: {
    citacao: Citacao,
  },
};

export default function PortableTextView({ value, abre = false, className = '' }) {
  const abreClasse = abre ? '[&>p:first-child]:text-abre-texto [&>p:first-child]:mb-6' : '';
  return (
    <div className={`font-texto text-corpo text-left ${abreClasse} ${className}`}>
      <PortableText value={value} components={components} />
    </div>
  );
}
