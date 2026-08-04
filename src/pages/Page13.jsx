import designSemNome3 from '../assets/page13/design-sem-nome3.png';
import deco from '../assets/page13/deco.svg';

export default function Page13() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">13</p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px]" style={{ left: '32px', top: '102px', width: '603px', height: '408px' }} />

      <div className="absolute font-poppins font-light text-[#1d4355] left-[91px] top-[130px] w-[289px]" style={{ lineHeight: '1.44' }}>
        <p className="mb-0 text-[32px]">
          E a <span className="font-semibold uppercase">menstruação...</span>
        </p>
        <p className="mb-0 text-[32px]">o que é</p>
        <p className="text-[32px]">e como acontece?</p>
      </div>

      <div className="absolute rounded-[30px] overflow-hidden" style={{ left: '285px', top: '130px', width: '350px', height: '260px' }}>
        <img alt="Ilustração menstruação" className="w-full h-full object-cover" src={designSemNome3} />
      </div>

      <div className="absolute bg-[#289dd2] rounded-[50px]" style={{ left: '25px', top: '548px', width: '546px', height: '351px' }} />
      <div className="absolute font-worksans font-medium text-white text-[14px] text-justify tracking-[0.14px] left-[73px] top-[590px] w-[477px]" style={{ lineHeight: '24.5px' }}>
        <p className="mb-[18px]">
          O amadurecimento dos órgãos reprodutores leva ao início da menstruação, chamada menarca. A menarca
          representa uma importante etapa do desenvolvimento reprodutivo feminino e ocorre, em média, por volta dos
          12 anos, podendo acontecer normalmente entre os 9 e os 15 anos. Ela indica que o organismo está
          adquirindo capacidade reprodutiva.{' '}
          <span className="font-normal text-[12px]">Montenegro; Rezende Filho, 2022; FEBRASGO, 2017</span>
        </p>
      </div>
    </div>
  );
}
