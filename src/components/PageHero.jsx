// Faixa do cabeçalho reservando o mesmo espaço de antes (pra não deslocar o
// título/conteúdo abaixo), mas sem o bloco colorido — só o número da página.
// -mx cancela o padding horizontal do <article> e -mt cancela o padding
// superior (py-8 sm:py-12 em SectionView.jsx), pra manter a área de toque
// alinhada com as bordas reais da página.
export function PageHeroBlob({ pageLabel, className = '' }) {
  return (
    <div className={`relative h-24 sm:h-28 -mx-4 sm:-mx-8 -mt-8 sm:-mt-12 mb-6 ${className}`}>
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
