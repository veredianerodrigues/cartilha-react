// No protótipo, o blob do canto superior direito alterna de cor: verde-água nas páginas
// ímpares, azul da marca nas pares (conferido em "5 - A adolescência chegou" = teal,
// "6 - A adolescência chegou" = azul, "7 - Transformações menino" = teal de novo).
const ODD_PAGE_COLOR = '#41C1BA';
const EVEN_PAGE_COLOR = '#289DD2';

function isOddPage(pageLabel) {
  const n = parseInt(pageLabel, 10);
  return Number.isNaN(n) ? true : n % 2 === 1;
}

// Faixa "banner" com o blob recortado (overflow-hidden) — mantém a curva só na
// altura do próprio cabeçalho, sem vazar por trás dos cards translúcidos abaixo.
// -mx cancela o padding horizontal do <article> e -mt cancela o padding
// superior (py-8 sm:py-12 em SectionView.jsx), pra encostar nas bordas reais
// da página em vez de flutuar com uma margem cinza ao redor.
export function PageHeroBlob({ pageLabel, className = '' }) {
  const odd = isOddPage(pageLabel);
  const color = odd ? ODD_PAGE_COLOR : EVEN_PAGE_COLOR;
  return (
    <div className={`relative h-24 sm:h-28 -mx-4 sm:-mx-8 -mt-8 sm:-mt-12 mb-6 overflow-hidden ${className}`}>
      {/* Forma simples (retângulo com um canto arredondado), pedida pra
          substituir o blob orgânico — mais limpa/geométrica. */}
      <div
        className="pointer-events-none absolute top-0 right-0 w-40 sm:w-52 h-full rounded-bl-[64px] sm:rounded-bl-[84px]"
        style={{ backgroundColor: color }}
      />
      {pageLabel && (
        <p className="absolute top-3 right-4 sm:top-4 sm:right-8 font-worksans text-brand-darker text-sm tracking-[0.14px]">
          {pageLabel}
        </p>
      )}
    </div>
  );
}

const WEIGHTS = { light: 'font-light', semibold: 'font-semibold', normal: '' };

// Cabeçalho "hero" completo de uma página: faixa com blob (cor alternando por
// paridade) + número + título em destaque. Uso: abertura de cada seção/spread.
export default function PageHero({ title, pageLabel, weight = 'light', className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <PageHeroBlob pageLabel={pageLabel} />
      <h1
        className={`relative font-poppins ${WEIGHTS[weight] ?? ''} text-brand-dark text-2xl sm:text-3xl leading-[1.3] mt-2 mb-6 max-w-[75%]`}
      >
        {title}
      </h1>
    </div>
  );
}
