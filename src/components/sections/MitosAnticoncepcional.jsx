import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import RichHtml from './shared/RichHtml.jsx';

// Chaves dos 3 cards de mito/verdade — a redação vem do banco (fields), mas a
// quantidade/posição dos cards continua fixa no JSX. A citação do último card
// já vem embutida no HTML salvo (sup inline), igual ao padrão do Diu.jsx.
const MYTH_KEYS = ['mito_1', 'mito_2', 'mito_3'];

export default function MitosAnticoncepcional({ images, fields = {} }) {
  const [foto] = images;

  return (
    <div className="relative">
      <PageHero pageLabel="17" weight="semibold" title="Mitos relacionados ao anticoncepcional hormonal" />

      <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-6">
        <div className="w-full sm:w-[40%] shrink-0">
          <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Mitos sobre anticoncepcional'} className="w-full h-full" />
          {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
        </div>

        <div className="flex-1 grid grid-cols-1 gap-3">
          {MYTH_KEYS.map((key) => (
            <div key={key} className="rounded-[20px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
              <RichHtml className="font-worksans text-sm text-black leading-[22px] [&_p]:m-0" html={fields[key]} />
            </div>
          ))}
        </div>
      </div>

      <HighlightCard variant="blue">
        <p className="font-poppins font-bold text-brand-blue text-base mb-3">Fique por dentro!</p>
        <RichHtml
          className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] mb-4 [&_ul]:mb-0"
          html={fields.fique_por_dentro_lista}
        />
      </HighlightCard>

    </div>
  );
}
