import { PortableText } from '@portabletext/react';
import { useSections } from '../../../context/SectionsContext.jsx';
import ImagemComLegenda from '../blocos/ImagemComLegenda.jsx';
import { VISUAIS_CAIXA } from './caixas.js';

// Caixa inserida no meio do texto (Você sabia, Dica…), com o mesmo visual do bloco de texto.
function Aviso({ value }) {
  const { caixa, titulo } = VISUAIS_CAIXA[value.variante];
  return (
    <div className={`${caixa} my-6`}>
      {value.titulo && <p className={titulo}>{value.titulo}</p>}
      <p className="m-0 whitespace-pre-line">{value.texto}</p>
    </div>
  );
}

function Separador({ value }) {
  if (value.estilo === 'espaco') return <div aria-hidden="true" className="h-8" />;
  return <hr className="my-8 border-0 border-t border-fio" />;
}

// Citação inline: mostra o número de cada referência (posição atual na lista) e leva
// até a entrada em /secao/referencias. É um <a> comum de propósito: a página
// Referências abre já rolada até a entrada e a destaca (ver Referencias.jsx e
// LivroContinuo.jsx).
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
    centro: ({ children }) => <p className="mb-4 last:mb-0 text-center">{children}</p>,
    direita: ({ children }) => <p className="mb-4 last:mb-0 text-right">{children}</p>,
    justificado: ({ children }) => <p className="mb-4 last:mb-0 text-justify hyphens-auto">{children}</p>,
    // Subtítulos dentro do texto: degraus abaixo do título do bloco (text-subtitulo, h2).
    h3: ({ children }) => (
      <h3 className="font-titulo text-subtitulo text-azul-texto mt-8 mb-2 first:mt-0 break-after-avoid">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-titulo text-titulo-caixa text-azul-texto mt-6 mb-2 first:mt-0 break-after-avoid">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-[3px] border-azul-marca pl-5 font-texto text-abre-texto italic text-azul-texto break-inside-avoid">
        {children}
      </blockquote>
    ),
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
    aviso: Aviso,
    separador: Separador,
    imagem: ({ value }) => <ImagemComLegenda item={value} className="my-6" />,
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
