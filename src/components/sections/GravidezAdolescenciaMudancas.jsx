import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

// Rótulos dos 4 cards de trimestre continuam fixos no JSX; só o texto de cada
// card vem do banco (fields[key]). A citação do card "Puerpério" já vem
// embutida no HTML salvo (sup inline), igual ao padrão do Diu.jsx.
const TRIMESTRES = [
  { label: '1º Trimestre', key: 'trimestre_1' },
  { label: '2º Trimestre', key: 'trimestre_2' },
  { label: '3º Trimestre', key: 'trimestre_3' },
  { label: 'Puerpério (Pós-parto)', key: 'trimestre_puerperio' },
];

export default function GravidezAdolescenciaMudancas({ images, fields = {} }) {
  const [teste, barriga] = images;

  return (
    <div className="relative">
      <PageHero pageLabel="19" weight="semibold" title="E se a gravidez acontecer..." />

      <div className="mb-6">
        <IllustrationFrame src={teste?.url} alt={teste?.caption || 'Teste de gravidez'} className="w-full h-[220px]" />
        {teste?.caption && <p className="text-xs text-brand-darker mt-1">{teste.caption}</p>}
      </div>

      <TextCard className="mb-6 space-y-4">
        <Paragraph html={fields.intro_fecundacao} />
        <Paragraph html={fields.intro_fases_periodo} />
      </TextCard>

      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-stretch">
        <div className="flex-1 grid grid-cols-1 gap-3">
          {TRIMESTRES.map((t) => (
            <div key={t.key} className="rounded-[20px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
              <p className="font-poppins font-semibold text-brand-dark text-sm mb-2">{t.label}</p>
              <div
                className="font-worksans text-sm text-black leading-[22px] [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: fields[t.key] || '' }}
              />
            </div>
          ))}
        </div>
        <div className="w-full sm:w-[220px] shrink-0">
          <IllustrationFrame src={barriga?.url} alt={barriga?.caption || 'Gravidez na adolescência'} className="w-full h-full" />
          {barriga?.caption && <p className="text-xs text-brand-darker mt-1">{barriga.caption}</p>}
        </div>
      </div>

    </div>
  );
}
