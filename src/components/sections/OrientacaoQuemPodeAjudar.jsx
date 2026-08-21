import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function OrientacaoQuemPodeAjudar({ images, fields = {} }) {
  const [foto] = images;

  return (
    <div className="relative">
      <PageHero
        pageLabel="20"
        title={
          <>
            Se eu precisar de orientação, <span className="font-semibold">quem poderá me ajudar?</span>
          </>
        }
      />

      <div className="mb-6">
        <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Orientação de saúde'} className="w-full h-[240px]" />
        {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
      </div>

      <HighlightCard variant="blue" className="mb-6">
        <p className="font-poppins font-bold text-brand-blue text-base mb-2">É fundamental…</p>
        <Paragraph html={fields.fundamental_conversar} />
      </HighlightCard>

      <TextCard>
        <Paragraph html={fields.procure_posto_saude} />
      </TextCard>

    </div>
  );
}
