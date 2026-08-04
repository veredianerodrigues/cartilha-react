import deco from '../assets/page27/deco.svg';

export default function Page27() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">27</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[24px] left-[54px] top-[30px] w-[500px]" style={{ lineHeight: '1.3' }}>
        Mitos relacionados ao anticoncepcional hormonal
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '125px', width: '493px', height: '695px' }} />
      <div className="absolute font-worksans text-black text-[13.5px] text-justify tracking-[0.14px] leading-[20px] left-[80px] top-[146px] w-[441px]">
        <p className="mb-[12px]">
          <span className="font-semibold">É verdade que o anticoncepcional engorda?</span> Não exatamente. Estudos
          científicos mostram que as pílulas anticoncepcionais não causam ganho de gordura. A única exceção
          importante é a injeção anticoncepcional de três meses que, por ser uma dose mais concentrada, pode causar
          ganho de peso real (geralmente entre 2 kg e 3 kg).
        </p>
        <p className="mb-[12px]">
          <span className="font-semibold">O anticoncepcional ajuda a melhorar a acne (espinhas)?</span> Sim, é
          verdade para os anticoncepcionais hormonais combinados! As pílulas reduzem a oleosidade da pele e couro
          cabeludo, ajudando muito a controlar cravos e espinhas.
        </p>
        <p className="mb-[12px]">
          <span className="font-semibold">Existem outros benefícios além de evitar a gravidez?</span> Com certeza.
          Além de prevenir a gravidez, a pílula pode trazer outros benefícios, como melhorar a acne, diminuir as
          cólicas, reduzir o fluxo menstrual, ajudar a manter a menstruação mais regular e aliviar alguns sintomas da
          TPM, como o inchaço e a irritabilidade. Além disso, seu uso também está associado à redução do risco de
          alguns tipos de câncer, como o de ovário e o de endométrio.
        </p>

        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Fique por dentro!</p>
        <ul className="list-disc pl-[18px] space-y-[6px] mb-[10px]">
          <li>A pílula anticoncepcional não se acumula no organismo.</li>
          <li>A pílula deve ser tomada diariamente.</li>
          <li>O uso da pílula não causa infertilidade.</li>
          <li>A pílula não causa malformações no bebê.</li>
          <li>A pílula não aumenta a chance de gravidez gemelar (gêmeos).</li>
          <li>A pílula não altera, por si só, o desejo sexual.</li>
          <li>A pílula não interrompe uma gravidez já existente.</li>
        </ul>
        <p className="text-[11px]">FEBRASGO (2025); WHO (2022).</p>
      </div>
    </div>
  );
}
