import deco from '../assets/page30/deco.svg';

export default function Page30() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">30</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[24px] left-[54px] top-[35px] w-[500px]" style={{ lineHeight: '1.3' }}>
        Se eu precisar de orientação, quem poderá me ajudar?
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '150px', width: '493px', height: '440px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[178px] w-[437px]">
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">É fundamental…</p>
        <p className="mb-[18px]">
          Você não precisa passar por isso sozinho, conversar em casa sobre as transformações do corpo, os
          sentimentos, os medos e as inseguranças é fundamental para atravessar essa fase com mais leveza e
          segurança.
        </p>
        <p>
          Procure o posto de saúde, as unidades de saúde (os postos de saúde) são o principal ponto de apoio para
          esse momento. O enfermeiro e a equipe de saúde estão ali para acolher você. Eles oferecem consultas,
          distribuem e orientam sobre métodos contraceptivos e conversam abertamente sobre direitos sexuais e
          reprodutivos, garantindo que você tome decisões informadas e seguras sobre o seu futuro.
        </p>
      </div>
    </div>
  );
}
