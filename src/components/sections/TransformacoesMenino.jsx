import IllustrationFrame from '../IllustrationFrame.jsx';
import { PageHeroBlob } from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function TransformacoesMenino({ images, fields = {} }) {
  const [menino] = images;

  return (
    <div className="relative">
      <PageHeroBlob pageLabel="06" />

      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
        <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.3] flex-1">
          Que transformações ocorrem no corpo do <span className="font-bold uppercase">menino</span>?
        </h1>
        <div className="w-full sm:w-[380px] shrink-0">
          <IllustrationFrame
            src={menino?.url}
            alt={menino?.caption || 'Adolescente menino'}
            className="w-full h-[380px]"
          />
          {menino?.caption && <p className="text-xs text-brand-darker mt-1">{menino.caption}</p>}
        </div>
      </div>

      <HighlightCard variant="blue" className="space-y-4">
        <Paragraph html={fields.estirao_crescimento} />
        <Paragraph html={fields.puberdade_sinais} />
      </HighlightCard>

    </div>
  );
}
