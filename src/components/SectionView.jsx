import PageHero from './PageHero.jsx';
import SectionSubtitle from './sections/shared/SectionSubtitle.jsx';
import Referencias from './sections/Referencias.jsx';
import { BLOCOS } from './sections/blocos/index.js';

// Uma seção = uma página com rolagem: cabeçalho (título + nº da página), subtítulo
// opcional e os blocos na ordem definida no Sanity. A seção de slug "referencias"
// mostra a lista de referências no lugar dos blocos.
export default function SectionView({ section }) {
  const { slug, title, subtitle, page_label: pageLabel, blocks } = section;

  return (
    <article className="relative flex-1 w-full max-w-3xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-20 sm:pb-24 overflow-hidden">
      <PageHero title={title} pageLabel={pageLabel} />
      {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}

      {slug === 'referencias' ? (
        <Referencias />
      ) : (
        <div className="space-y-6">
          {blocks.map((bloco) => {
            const Bloco = BLOCOS[bloco._type];
            return <Bloco key={bloco._key} bloco={bloco} />;
          })}
        </div>
      )}
    </article>
  );
}
