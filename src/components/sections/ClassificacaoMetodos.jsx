import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function ClassificacaoMetodos({ fields = {} }) {
  return (
    <div className="relative">
      <PageHero
        pageLabel="13"
        title={
          <>
            Como são classificados os <span className="font-semibold">métodos contraceptivos?</span> Todos eles são{' '}
            <span className="font-semibold">indicados para adolescentes?</span>
          </>
        }
      />

      <TextCard className="space-y-4">
        <Paragraph html={fields.intro} />
        <div
          className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] [&_p]:m-0"
          dangerouslySetInnerHTML={{ __html: fields.cinco_grupos_intro || '' }}
        />
        <div dangerouslySetInnerHTML={{ __html: fields.cinco_grupos_lista || '' }} />
        <div className="pt-2">
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Olha só...</p>
          <Paragraph html={fields.olha_so} />
        </div>
      </TextCard>

    </div>
  );
}
