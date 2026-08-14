import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Cite from './shared/Cite.jsx';

const MYTHS = [
  'É verdade que o anticoncepcional engorda? Não exatamente. Estudos científicos mostram que as pílulas anticoncepcionais não causam ganho de gordura. A única exceção importante é a injeção anticoncepcional de três meses, que por ser uma dose mais concentrada, pode causar ganho de peso real (geralmente entre 2 kg e 3 kg).',
  'O anticoncepcional ajuda a melhorar a acne (espinhas)? Sim, é verdade para os anticoncepcionais hormonais combinados! As pílulas reduzem a oleosidade da pele e do couro cabeludo, ajudando muito a controlar cravos e espinhas.',
  'Existem outros benefícios além de evitar a gravidez? Com certeza. Além de prevenir a gravidez, a pílula pode trazer outros benefícios, como melhorar a acne, diminuir as cólicas, reduzir o fluxo menstrual, ajudar a manter a menstruação mais regular e aliviar alguns sintomas da TPM, como o inchaço e a irritabilidade. Além disso, seu uso também está associado à redução do risco de alguns tipos de câncer, como o de ovário e o de endométrio.',
];

const FACTS = [
  'A pílula anticoncepcional não se acumula no organismo.',
  'A pílula deve ser tomada diariamente.',
  'O uso da pílula não causa infertilidade.',
  'A pílula não causa malformações no bebê.',
  'A pílula não aumenta a chance de gravidez gemelar (gêmeos).',
  'A pílula não altera, por si só, o desejo sexual.',
  'A pílula não interrompe uma gravidez já existente.',
];

export default function MitosAnticoncepcional({ images }) {
  const [foto] = images;

  return (
    <div className="relative">
      <PageHero pageLabel="22" weight="semibold" title="Mitos relacionados ao anticoncepcional hormonal" />

      <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-6">
        <div className="w-full sm:w-[40%] shrink-0">
          <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Mitos sobre anticoncepcional'} className="w-full h-full" />
          {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
        </div>

        <div className="flex-1 grid grid-cols-1 gap-3">
          {MYTHS.map((text, i) => (
            <div key={i} className="rounded-[20px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
              <p className="font-worksans text-sm text-black leading-[22px]">{text}</p>
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
        <p className="text-sm text-brand-darker">
          <Cite n={[12, 19]} />
        </p>
      </HighlightCard>

    </div>
  );
}
