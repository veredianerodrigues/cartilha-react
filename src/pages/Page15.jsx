import deco1 from '../assets/page15/deco1.svg';
import deco2 from '../assets/page15/deco2.svg';

export default function Page15() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '-20.34%', top: '83.97%', width: '96.66%', height: '28.14%' }} src={deco1} />
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco2} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">15</p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px]" style={{ left: '32px', top: '78px', width: '603px', height: '190px' }} />
      <div className="absolute font-poppins text-[#1d4355] text-[36px] left-[74px] top-[118px] w-[456px]" style={{ lineHeight: '1.4' }}>
        <p className="mb-0">
          <span className="font-semibold">Você sabia</span>...
        </p>
      </div>
      <p className="absolute font-worksans text-[#163341] text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[227px] w-[457px]">
        A precocidade ou atraso na ocorrência da menarca são influenciados por diversos fatores como a
        hereditariedade, fatores nutricionais, físicos, emocionais, exercício, gordura corporal e contexto social{' '}
        <span className="text-[12px]">(GEMELLI; FARIAS; SPITZER, 2020).</span>
      </p>

      <div className="absolute font-worksans text-[#163341] text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[54px] top-[300px] w-[493px]">
        <p className="font-poppins font-bold not-italic text-[#289dd2] text-[16px] mb-[10px]">E tem mais:</p>
        <p className="mb-[18px]">
          na adolescência, é possível engravidar antes mesmo da primeira menstruação. Por outro lado, também é
          comum que os primeiros ciclos menstruais sejam anovulatórios (ou seja, sem a liberação de um óvulo). Isso
          acontece porque o corpo ainda está passando por um amadurecimento hormonal e pode não produzir os picos
          de hormônios necessários para a ovulação. Por conta dessa imaturidade fisiológica natural da idade, a
          jovem pode apresentar ciclos irregulares e sangramentos inesperados, situações que fazem parte do ajuste
          normal do organismo nessa fase <span className="text-[12px]">(SBP, 2023a).</span>
        </p>
        <p className="font-poppins font-bold not-italic text-[#289dd2] text-[16px] mb-[10px]">Portanto recomenda-se...</p>
        <p className="mb-[18px]">
          que a adolescente registre em um calendário as datas dos ciclos, ou seja: "[...] a cada mês, o dia que
          inicia e o dia que termina o sangramento. Por exemplo: começou no dia 13 de janeiro e terminou no dia 17
          [...]" <span className="text-[12px]">(BRASIL, 2012b, p. 36).</span>
        </p>
        <p>
          E ainda... existem aplicativos gratuitos que auxiliam no registro da menstruação, previsão da próxima
          menstruação, período fértil e sintomas relacionados ao ciclo.
        </p>
      </div>
    </div>
  );
}
