import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import RichHtml from './shared/RichHtml.jsx';

export default function Diu({ images, fields = {} }) {
  const [diuImg, implanonImg] = images;

  return (
    <div className="relative">
      <PageHero
        pageLabel="15"
        weight="semibold"
        title="Métodos de contracepção reversíveis de longa duração (LARC)"
      />

      <TextCard className="space-y-5">
        <Paragraph className="font-semibold" html={fields.intro_1} />
        <Paragraph className="font-semibold" html={fields.intro_2} />
        <Paragraph html={fields.diu_intro} />

        <div>
          <IllustrationFrame src={diuImg?.url} alt={diuImg?.caption || 'DIU'} fit="contain" className="w-full max-w-md mx-auto" rounded={false} />
          {diuImg?.caption && <p className="text-xs text-brand-darker text-center mt-1">{diuImg.caption}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[20px] bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
            <RichHtml className="font-worksans text-sm text-black leading-[22px] [&_p]:m-0" html={fields.diu_cobre} />
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
            <RichHtml className="font-worksans text-sm text-black leading-[22px] [&_p]:m-0" html={fields.diu_hormonal} />
          </div>
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Importante!</p>
          <Paragraph html={fields.importante_ist} />
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">E ainda!</p>
          <Paragraph html={fields.e_ainda} />
        </div>

        <div className="pt-2 border-t border-slate-200">
          <h2 className="font-poppins font-semibold text-brand-dark text-lg mb-2">
            O implante de etonorgestrel (ISE), conhecido comercialmente no Brasil como Implanon®
          </h2>
          <IllustrationFrame
            src={implanonImg?.url}
            alt={implanonImg?.caption || 'Implanon'}
            fit="contain"
            className="w-full max-w-md mx-auto"
            rounded={false}
          />
          {implanonImg?.caption && <p className="text-xs text-brand-darker text-center mt-1 mb-4">{implanonImg.caption}</p>}
          <Paragraph html={fields.implanon_intro_1} />
          <Paragraph html={fields.implanon_intro_2} />
          <Paragraph html={fields.implanon_duracao} />
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Importante:</p>
          <Paragraph html={fields.implanon_importante} />
        </div>
      </TextCard>
    </div>
  );
}
