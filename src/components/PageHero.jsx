import PageDecoration from './PageDecoration.jsx';

// Faixa do cabeçalho: -mx cancela o padding horizontal do <article> e -mt
// cancela o padding superior (py-8 sm:py-12 em SectionView.jsx), pra manter a
// área de toque alinhada com as bordas reais da página. Altura reduzida (era
// h-24/h-28, deixando um vão vazio grande demais acima do título) e com o
// blob do design original de volta, só que translúcido em vez da cor sólida —
// ver PageDecoration.jsx.
export function PageHeroBlob({ pageLabel, className = '' }) {
  return (
    <div className={`relative h-12 sm:h-14 -mx-4 sm:-mx-8 -mt-8 sm:-mt-12 mb-4 overflow-hidden ${className}`}>
      <PageDecoration
        className="max-w-none"
        style={{ top: '-70%', right: '-12%', width: '220px' }}
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

// Cabeçalho "hero" completo de uma página: número da página + título em
// destaque. Uso: abertura de cada seção/spread.
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
