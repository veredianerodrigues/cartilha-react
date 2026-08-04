import deco from '../assets/page17/deco.svg';

export default function Page17() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">17</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[32px] left-[54px] top-[50px] w-[460px]" style={{ lineHeight: '1.44' }}>
        Métodos contraceptivos
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '160px', width: '493px', height: '270px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[186px] w-[437px]">
        <p className="mb-[18px]">
          Se o óvulo não encontrar um espermatozoide, os níveis dos hormônios progesterona e estrogênio diminuem.
          Essa queda dos hormônios faz com que o endométrio (camada interna do útero), que havia se preparado para
          receber uma possível gravidez, se desprenda e seja eliminado através do sangramento menstrual. Assim que a
          menstruação termina, o corpo recomeça um novo ciclo. Contudo, se a gravidez acontecer, o ciclo menstrual
          não se completa e segue o desenvolvimento da gestação{' '}
          <span className="text-[12px]">(Montenegro; Rezende Filho, 2022).</span>
        </p>
      </div>

      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[54px] top-[470px] w-[493px]">
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Atenção...</p>
        <p className="mb-[18px]">
          Para quem deseja ter relações sexuais, mas não quer engravidar existem diversos métodos contraceptivos (ou
          anticoncepcionais), porém não existe um único método que sirva para todo mundo. Cada organismo é diferente,
          e alguns métodos podem ter contraindicações dependendo de cada pessoa.
        </p>
        <p>
          Por isso, o recomendado é escolher o que melhor se adapte às necessidades e à rotina de cada um. Além
          disso, independentemente do método, o que garante a menor chance de falha é o seu uso correto e consistente{' '}
          <span className="text-[12px]">(WHO, 2022).</span>
        </p>
      </div>
    </div>
  );
}
