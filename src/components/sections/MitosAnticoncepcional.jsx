import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';

// Chaves dos 3 cards de mito/verdade — a redação vem do banco (fields), mas a
// quantidade/posição dos cards continua fixa no JSX. A citação do último card
// já vem embutida no HTML salvo (sup inline), igual ao padrão do Diu.jsx.
const MYTH_KEYS = ['mito_1', 'mito_2', 'mito_3'];

// Lista com marcadores — 100% hardcoded, não migra (regra do time).
const FACTS = [
  'A pílula anticoncepcional não se acumula no organismo.',
  'A pílula deve ser tomada diariamente.',
  'O uso da pílula não causa infertilidade.',
  'A pílula não causa malformações no bebê.',
  'A pílula não aumenta a chance de gravidez gemelar (gêmeos).',
  'A pílula não altera, por si só, o desejo sexual.',
  'A pílula não interrompe uma gravidez já existente.',
];

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
              <div
                className="font-worksans text-sm text-black leading-[22px] [&_p]:m-0"
                dangerouslySetInnerHTML={{ __html: fields[key] || '' }}
              />
            </div>
          ))}
        </div>
      </div>

      <HighlightCard variant="blue">
        <p className="font-poppins font-bold text-brand-blue text-base mb-3">Fique por dentro!</p>
        <ul className="list-disc pl-5 space-y-2 mb-4">
          {FACTS.map((text, i) => (
            <li key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px]">
              {text}
            </li>
          ))}
        </ul>
      </HighlightCard>

    </div>
  );
}
