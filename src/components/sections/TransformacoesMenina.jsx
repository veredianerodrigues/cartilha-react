import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function TransformacoesMenina({ images, fields = {} }) {
  const [mamas, foto, pelos] = images;

  return (
    <div className="relative space-y-6">
      <PageHero
        pageLabel="09"
        title={
          <>
            <span className="block font-light text-base mb-1">Que transformações ocorrem no</span>
            <span className="font-light">corpo da </span>
            <span className="font-bold uppercase">menina</span>
            <span className="font-light">?</span>
          </>
        }
      />

      <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Adolescentes'} className="w-full h-[300px]" />

      <HighlightCard variant="cream">
        <Paragraph html={fields.transformacoes_corpo_menina} />
      </HighlightCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <IllustrationFrame src={mamas?.url} alt={mamas?.caption || 'Estágios de Tanner - mamas'} fit="contain" className="w-full" rounded={false} />
        <IllustrationFrame src={pelos?.url} alt={pelos?.caption || 'Estágios de Tanner - pelos pubianos'} fit="contain" className="w-full" rounded={false} />
{mamas?.caption && <p className="text-xs text-brand-darker mt-3">{mamas.caption}</p>}
      </div>

      <HighlightCard variant="cream">
        <Paragraph html={fields.tanner_estagios_meninas} />
      </HighlightCard>

    </div>
  );
}
