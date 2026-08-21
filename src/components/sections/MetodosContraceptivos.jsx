import IllustrationFrame from '../IllustrationFrame.jsx';
import { PageHeroBlob } from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import SectionTitle from './shared/SectionTitle.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function MetodosContraceptivos({ images, fields = {} }) {
  const [foto] = images;

  return (
    <div className="relative">
      <PageHeroBlob pageLabel="12" />

      <TextCard className="mb-6">
        <Paragraph html={fields.ciclo_menstrual} />
      </TextCard>

      <SectionTitle weight="semibold">Métodos contraceptivos</SectionTitle>

      <div className="flex flex-col sm:flex-row gap-5 items-stretch">
        <div className="flex-1 space-y-2">
          <p className="font-poppins font-bold text-brand-blue text-base">Atenção...</p>
          <Paragraph html={fields.atencao} />
        </div>
        <div className="w-full sm:w-[300px] shrink-0">
          <IllustrationFrame
            src={foto?.url}
            alt={foto?.caption || 'Métodos contraceptivos'}
            className="w-full h-[450px]"
            rounded={false}
          />
          {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
        </div>
      </div>

    </div>
  );
}
