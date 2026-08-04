import deco from '../assets/page26/deco.svg';

export default function Page26() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">26</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[26px] left-[54px] top-[35px] w-[500px]" style={{ lineHeight: '1.3' }}>
        Anticoncepcionais orais e injetáveis
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '160px', width: '493px', height: '280px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[186px] w-[437px]">
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Olha só...</p>
        <p>
          O adolescente tem direito à educação sexual, ao acesso à informação sobre contracepção, à confidencialidade,
          ao sigilo sobre sua atividade sexual e à prescrição de métodos anticoncepcionais{' '}
          <span className="text-[12px]">(FEBRASGO, 2017, p. 13).</span> Nenhum método contraceptivo (com exceção dos
          métodos definitivos) deve ser contraindicado tendo como única base a idade. Por outro lado, a falta de
          conhecimento, aconselhamento inadequado, mitos, moralidade em relação à sexualidade são comuns e
          interferem na escolha e no uso do método <span className="text-[12px]">(FEBRASGO, 2017, p. 15).</span>
        </p>
      </div>
    </div>
  );
}
