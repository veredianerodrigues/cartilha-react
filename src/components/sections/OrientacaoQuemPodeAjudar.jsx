import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function OrientacaoQuemPodeAjudar({ images }) {
  const [foto] = images;

  return (
    <div className="relative">
      <PageHero
        pageLabel="26"
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
        <Paragraph>
          Você não precisa passar por isso sozinho, conversar em casa sobre as transformações do corpo, os
          sentimentos, os medos e as inseguranças é fundamental para atravessar essa fase com mais leveza e
          segurança.
        </Paragraph>
      </HighlightCard>

      <TextCard>
        <Paragraph>
          Procure o posto de saúde, as unidades de saúde (os postos de saúde) são o principal ponto de apoio para
          esse momento. O enfermeiro e a equipe de saúde estão ali para acolher você. Eles oferecem consultas,
          distribuem e orientam sobre métodos contraceptivos e conversam abertamente sobre direitos sexuais e
          reprodutivos, garantindo que você tome decisões informadas e seguras sobre o seu futuro.
        </Paragraph>
      </TextCard>

    </div>
  );
}
