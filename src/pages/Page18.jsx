import deco from '../assets/page18/deco.svg';

export default function Page18() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">18</p>

      <div className="absolute font-poppins font-light text-[#1d4355] left-[54px] top-[35px] w-[500px]" style={{ lineHeight: '1.3' }}>
        <p className="text-[24px]">
          Como são classificados os <span className="font-semibold">métodos contraceptivos?</span> Todos eles são{' '}
          <span className="font-semibold">indicados para adolescentes?</span>
        </p>
      </div>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '190px', width: '493px', height: '440px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[215px] w-[437px]">
        <p className="mb-[14px]">
          Com a evolução da ciência, existem muitos métodos contraceptivos. Porém, nem todos estão disponíveis no
          Sistema Único de Saúde (SUS) e nem todos são indicados para adolescentes (como é o caso das cirurgias
          definitivas).
        </p>
        <p className="mb-[10px]">Quanto à classificação, os métodos anticoncepcionais dividem-se em cinco grupos:</p>
        <ul className="list-disc pl-[20px] mb-0 space-y-[8px]">
          <li><span className="font-semibold">De barreira:</span> como as camisinhas masculina e feminina.</li>
          <li><span className="font-semibold">Métodos de contracepção reversíveis de longa duração (LARC):</span> Dispositivo intrauterino (DIU); Implante subdérmico de etonorgestrel (ISE).</li>
          <li><span className="font-semibold">Hormonais:</span> pílulas, injeções e adesivos.</li>
          <li><span className="font-semibold">Definitivos:</span> laqueadura e vasectomia (cirurgias).</li>
          <li><span className="font-semibold">Comportamentais:</span> incluem a tabelinha (Ogino-Knaus), o controle da temperatura basal, o exame do muco cervical (Billings), o método sintotérmico e o coito interrompido.</li>
        </ul>
      </div>

      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[54px] top-[660px] w-[493px]">
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Olha só...</p>
        <p>
          os métodos comportamentais são pouco eficazes durante a adolescência, considerando que nessa fase de
          desenvolvimento, muitas vezes não há uma regularidade no ciclo menstrual, devido a mudanças hormonais e os
          definitivos não são indicados para adolescentes, discutiremos sobre os demais{' '}
          <span className="text-[12px]">SBP (2023b); Brasil (2022).</span>
        </p>
      </div>
    </div>
  );
}
