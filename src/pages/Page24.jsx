import deco from '../assets/page24/deco.svg';

export default function Page24() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">24</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[32px] left-[54px] top-[50px] w-[460px]" style={{ lineHeight: '1.44' }}>
        Anticoncepcionais
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '160px', width: '493px', height: '320px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[184px] w-[437px]">
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Atenção</p>
        <p className="mb-[18px]">
          Quando as mulheres utilizam anticoncepcionais injetáveis trimestrais, implante hormonal ou DIU hormonal e
          desejam fazer a troca por pílulas anticoncepcionais, iniciar a cartela imediatamente após o término da
          validade do método usado anteriormente.
        </p>
        <p className="mb-[18px]">
          Com relação ao intervalo entre as cartelas alguns contraceptivos preveem pausas de quatro a sete dias e
          algumas formulações não preveem pausas.
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Importante lembrar!</p>
        <p>
          Os comprimidos devem ser ingeridos diariamente e preferencialmente no mesmo horário, o esquecimento do uso
          implica em falha contraceptiva, nesse caso recomenda-se o uso de método contraceptivo adicional como
          preservativos <span className="text-[12px]">(FEBRASGO, 2025; SBP, 2023b).</span>
        </p>
      </div>
    </div>
  );
}
