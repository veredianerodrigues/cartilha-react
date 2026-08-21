import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

const ITEMS = [
  { label: 'De barreira:', text: ' como as camisinhas masculina e feminina.' },
  {
    label: 'Métodos de contracepção reversíveis de longa duração (LARC):',
    text: ' Dispositivo intrauterino (DIU); Implante subdérmico de etonorgestrel (ISE).',
  },
  { label: 'Hormonais:', text: ' pílulas, injeções, anel vaginal e adesivos.' },
  { label: 'Definitivos:', text: ' laqueadura e vasectomia (cirurgias).' },
  {
    label: 'Comportamentais:',
    text: ' incluem a tabelinha (Ogino-Knaus), o controle da temperatura basal, o exame do muco cervical (Billings), o método sintotérmico e o coito interrompido.',
  },
];

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
        <ul className="list-disc pl-5 space-y-2">
          {ITEMS.map((item, i) => (
            <li key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
              <span className="font-semibold">{item.label}</span>
              {item.text}
            </li>
          ))}
        </ul>
        <div className="pt-2">
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Olha só...</p>
          <Paragraph html={fields.olha_so} />
        </div>
      </TextCard>

    </div>
  );
}
