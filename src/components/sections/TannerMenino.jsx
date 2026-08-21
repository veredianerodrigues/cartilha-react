import IllustrationFrame from '../IllustrationFrame.jsx';
import { PageHeroBlob } from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import SectionTitle from './shared/SectionTitle.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function TannerMenino({ images, fields = {} }) {
  const [genitalia, pelos, grupo] = images;

  return (
    <div className="relative space-y-6">
      <PageHeroBlob pageLabel="08" />

      <HighlightCard variant="blue">
        <SectionTitle className="mb-4">Você sabia...</SectionTitle>
        <Paragraph html={fields.tanner_intro} />
      </HighlightCard>

      <IllustrationFrame src={grupo?.url} alt={grupo?.caption || 'Adolescentes'} className="w-full h-[260px]" />

      <HighlightCard variant="blue">
        <Paragraph html={fields.tanner_estagios_meninos} />
      </HighlightCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IllustrationFrame src={pelos?.url} alt={pelos?.caption || 'Estágios de Tanner - pelos pubianos'} fit="contain" className="w-full" rounded={false} />
        <IllustrationFrame src={genitalia?.url} alt={genitalia?.caption || 'Estágios de Tanner - genitália'} fit="contain" className="w-full" rounded={false} />
      </div>
      {(genitalia?.caption || pelos?.caption) && (
        <p className="text-xs text-brand-darker">{genitalia?.caption || pelos?.caption}</p>
      )}

    </div>
  );
}
