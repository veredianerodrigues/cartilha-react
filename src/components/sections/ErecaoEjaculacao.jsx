import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function ErecaoEjaculacao({ images, fields = {} }) {
  const [imagem] = images;

  return (
    <div className="relative">
      <PageHero
        pageLabel="07"
        title={
          <>
            O que é <span className="font-semibold">ereção e ejaculação</span> e quando acontece a primeira
            ejaculação?
          </>
        }
      />

      <div className="flex flex-col sm:flex-row gap-5 items-stretch">
        <div className="w-full sm:w-[220px] shrink-0">
          <IllustrationFrame
            src={imagem?.url}
            alt={imagem?.caption || 'Adolescente'}
            className="w-full min-h-[220px]"
            rounded={false}
          />
          {imagem?.caption && <p className="text-xs text-brand-darker mt-1">{imagem.caption}</p>}
        </div>

        <TextCard className="relative flex-1 space-y-4">
          <Paragraph html={fields.erecao_ejaculacao_definicao} />
          <Paragraph html={fields.espermarca_explicacao} />
        </TextCard>
      </div>

    </div>
  );
}
