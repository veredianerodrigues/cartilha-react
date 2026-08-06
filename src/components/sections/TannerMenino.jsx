import IllustrationFrame from '../IllustrationFrame.jsx';
import { PageHeroBlob } from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import SectionTitle from './shared/SectionTitle.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function TannerMenino({ images }) {
  const [genitalia, pelos, grupo] = images;

  return (
    <div className="relative space-y-6">
      <PageHeroBlob pageLabel="08" />

      <HighlightCard variant="blue">
        <SectionTitle className="mb-4">Você sabia...</SectionTitle>
        <Paragraph>
          A puberdade ocorre em diferentes fases, que refletem o grau de maturidade sexual do adolescente. Para
          avaliar esse desenvolvimento os médicos britânicos Marshall e Tanner desenvolveram uma classificação
          conhecida como estágios de Tanner, utilizada até os dias atuais pelos profissionais da saúde. Essa
          classificação permite acompanhar o desenvolvimento físico durante a puberdade, pois adolescentes da mesma
          idade podem apresentar diferentes graus de maturação sexual{' '}
          <span className="text-xs text-brand-darker">(Marshall; Tanner, 1970).</span>
        </Paragraph>
      </HighlightCard>

      <IllustrationFrame src={grupo?.url} alt={grupo?.caption || 'Adolescentes'} className="w-full h-[260px]" />

      <HighlightCard variant="blue">
        <Paragraph>
          Nos meninos, são avaliados o crescimento da genitália (G) e dos pelos pubianos (P). Cada um deles é
          dividido em cinco estágios, de 1 a 5. O estágio 1 indica que a puberdade ainda não começou, enquanto o
          estágio 5 representa o desenvolvimento físico completo. Os estágios 2, 3 e 4 mostram as mudanças que
          acontecem ao longo da puberdade{' '}
          <span className="text-xs text-brand-darker">(Marshall; Tanner, 1970).</span>
        </Paragraph>
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
