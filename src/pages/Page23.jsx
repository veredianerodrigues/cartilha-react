import deco from '../assets/page23/deco.svg';

export default function Page23() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">23</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[26px] left-[54px] top-[35px] w-[500px]" style={{ lineHeight: '1.3' }}>
        Anticoncepcionais orais e injetáveis
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '150px', width: '493px', height: '400px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[175px] w-[437px]">
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Anticoncepcional Injetável (Injeção)</p>
        <p className="mb-[14px]">
          O anticoncepcional injetável é um método contraceptivo prático e eficaz para quem prefere não precisar
          tomar um comprimido todos os dias. Existem dois tipos: o mensal e o trimestral. A aplicação é feita por um
          profissional de saúde, geralmente no músculo do braço ou do glúteo e ambas são fornecidas pelo SUS.
        </p>
        <p className="mb-[14px]">
          Primeira aplicação: a injeção anticoncepcional pode ser iniciada nos primeiros 7 dias da menstruação, com
          proteção imediata contra a gravidez. Também pode ser iniciada em outros momentos, desde que haja certeza
          de que não existe gravidez <span className="text-[12px]">(SBP, 2023b).</span>
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Como usar?</p>
        <ul className="list-disc pl-[20px] space-y-[8px] mb-0">
          <li>
            <span className="font-semibold">Primeira dose:</span> recomenda-se que seja aplicada nos primeiros sete
            dias da menstruação. Nessa situação, a proteção contra a gravidez é imediata.
          </li>
          <li>
            <span className="font-semibold">Se a aplicação ocorrer após esse período:</span> a injeção pode ser
            iniciada desde que haja certeza de que não existe gravidez. Nesse caso, recomenda-se utilizar
            preservativo ou evitar relações sexuais durante os primeiros sete dias, até que o método atinja sua
            eficácia contraceptiva.
          </li>
        </ul>
        <p className="text-[12px] mt-[10px]">WHO (2022); SBP (2023b)</p>
      </div>
    </div>
  );
}
