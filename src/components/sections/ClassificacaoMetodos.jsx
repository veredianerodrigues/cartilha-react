import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

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

export default function ClassificacaoMetodos() {
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
        <Paragraph>
          Com a evolução da ciência, existem muitos métodos contraceptivos. Porém, nem todos estão disponíveis no
          Sistema Único de Saúde (SUS) e nem todos são indicados para adolescentes (como é o caso das cirurgias
          definitivas).
        </Paragraph>
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px]">
          Quanto à classificação, os métodos anticoncepcionais dividem-se em cinco grupos:
        </p>
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
          <Paragraph>
            os métodos comportamentais são pouco eficazes durante a adolescência, considerando que nessa fase de
            desenvolvimento muitas vezes não há regularidade no ciclo menstrual devido a mudanças hormonais, e os
            definitivos não são indicados para adolescentes — por isso, discutiremos sobre os demais.
            <Cite n={[9, 23]} />
          </Paragraph>
        </div>
      </TextCard>

    </div>
  );
}
