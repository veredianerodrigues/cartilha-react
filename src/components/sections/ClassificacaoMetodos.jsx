import deco from '../../assets/page18/deco.svg';

const ITEMS = [
  { label: 'De barreira:', text: ' como as camisinhas masculina e feminina.' },
  {
    label: 'Métodos de contracepção reversíveis de longa duração (LARC):',
    text: ' Dispositivo intrauterino (DIU); Implante subdérmico de etonorgestrel (ISE).',
  },
  { label: 'Hormonais:', text: ' pílulas, injeções e adesivos.' },
  { label: 'Definitivos:', text: ' laqueadura e vasectomia (cirurgias).' },
  {
    label: 'Comportamentais:',
    text: ' incluem a tabelinha (Ogino-Knaus), o controle da temperatura basal, o exame do muco cervical (Billings), o método sintotérmico e o coito interrompido.',
  },
];

export default function ClassificacaoMetodos() {
  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.3] mb-6">
        Como são classificados os <span className="font-semibold">métodos contraceptivos?</span> Todos eles são{' '}
        <span className="font-semibold">indicados para adolescentes?</span>
      </h1>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 space-y-4">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Com a evolução da ciência, existem muitos métodos contraceptivos. Porém, nem todos estão disponíveis no
          Sistema Único de Saúde (SUS) e nem todos são indicados para adolescentes (como é o caso das cirurgias
          definitivas).
        </p>
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
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            os métodos comportamentais são pouco eficazes durante a adolescência, considerando que nessa fase de
            desenvolvimento muitas vezes não há regularidade no ciclo menstrual devido a mudanças hormonais, e os
            definitivos não são indicados para adolescentes — por isso, discutiremos sobre os demais.{' '}
            <span className="text-xs text-brand-darker">SBP (2023b); Brasil (2022).</span>
          </p>
        </div>
      </div>
    </div>
  );
}
