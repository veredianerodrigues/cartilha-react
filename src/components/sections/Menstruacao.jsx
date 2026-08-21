import IllustrationFrame from '../IllustrationFrame.jsx';
import { PageHeroBlob } from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import SectionSubtitle from './shared/SectionSubtitle.jsx';
import Paragraph from './shared/Paragraph.jsx';
import RichHtml from './shared/RichHtml.jsx';

export default function Menstruacao({ images, fields = {} }) {
  const [ciclo, foto] = images;

  return (
    <div className="relative space-y-6">
      <PageHeroBlob pageLabel="10" />

      <TextCard className="flex flex-col sm:flex-row gap-5 items-center">
        <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.4] flex-1">
          E a <span className="font-semibold uppercase">menstruação...</span>
          <br />o que é
          <br />e como acontece?
        </h1>
        <div className="w-full sm:w-[300px] shrink-0">
          <IllustrationFrame
            src={foto?.url}
            alt={foto?.caption || 'Adolescente'}
            className="w-full h-[300px]"
            rounded={false}
          />
          {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
        </div>
      </TextCard>

      <HighlightCard variant="solid">
        <RichHtml
          className="font-worksans font-medium text-white text-sm leading-[24px] tracking-[0.14px] text-justify [&_p]:m-0"
          html={fields.menarca_definicao}
        />
      </HighlightCard>

      <HighlightCard variant="cream" shadow={false} className="!p-4 sm:!p-6">
        <IllustrationFrame src={ciclo?.url} alt={ciclo?.caption || 'Ciclo menstrual'} fit="contain" className="w-full mb-3" rounded={false} />
        {ciclo?.caption && <p className="font-worksans text-xs text-brand-darker text-center italic">{ciclo.caption}</p>}
      </HighlightCard>

      <TextCard className="space-y-4">
        <Paragraph html={fields.ciclo_intro} />
        <Paragraph html={fields.ciclo_sem_fecundacao} />
        <Paragraph html={fields.fluxo_duracao} />
        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Fique atenta...</p>
          <Paragraph html={fields.fique_atenta_texto} />
        </div>
      </TextCard>

      <TextCard className="mb-6">
        <SectionSubtitle>
          <span className="font-semibold">Você sabia</span>...
        </SectionSubtitle>
        <RichHtml
          className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify [&_p]:m-0"
          html={fields.voce_sabia_texto}
        />
      </TextCard>

      <div className="space-y-5">
        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">E tem mais:</p>
          <RichHtml
            className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify [&_p]:m-0"
            html={fields.engravidar_antes_menarca}
          />
        </div>
        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Portanto recomenda-se...</p>
          <RichHtml
            className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify [&_p]:m-0"
            html={fields.registro_calendario}
          />
        </div>
      </div>

    </div>
  );
}
