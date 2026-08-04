import meninoPensando from '../assets/page05/menino-pensando.png';
import designSemNome from '../assets/page05/design-sem-nome.png';
import deco1 from '../assets/page05/deco1.svg';
import deco2 from '../assets/page05/deco2.svg';

export default function Page05() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '-20.34%', top: '83.97%', width: '96.66%', height: '28.14%' }} src={deco1} />
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco2} />

      <p className="absolute font-poppins font-light text-[#1d4355] text-[24px] left-[36px] top-[36px]" style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}>
        A ADOLESCÊNCIA CHEGOU.... E AGORA?
      </p>
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">5</p>

      <div className="absolute rounded-[50px] overflow-hidden" style={{ left: '36px', top: '132px', width: '287px', height: '247px' }}>
        <img alt="Ilustração de adolescente" className="w-full h-full object-cover" src={designSemNome} />
      </div>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '313px', top: '101px', width: '246px', height: '314px' }} />
      <p className="absolute font-poppins font-bold text-[16px] text-black left-[347px] top-[125px]">O Que é Puberdade?</p>
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[347px] top-[153px] w-[198px]">
        A puberdade é uma fase natural do desenvolvimento em que o corpo passa por mudanças físicas e hormonais,
        tornando-se capaz de se reproduzir. Ela ocorre entre os 8 e 13 anos nas meninas, e entre os 9 e 14 anos nos
        meninos, durando cerca de 3 a 4 anos. É o momento em que o corpo começa a se preparar para a vida adulta{' '}
        <span className="text-[12px]">(Castilho, Mattos; Pedrosa, 2024; Sartor; Fiorin; Sulbacher, 2025).</span>
      </p>

      <div className="absolute font-poppins font-bold text-[16px] text-black left-[32px] top-[434px] w-[311px]">
        <p className="mb-0">O que acontece no corpo</p>
        <p>humano nesse período?</p>
      </div>

      <div className="absolute bg-[#f6efe7] rounded-l-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '261px', top: '439px', width: '338px', height: '368px' }} />
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[289px] top-[465px] w-[255px]">
        O comando para as transformações presentes na adolescência começa no cérebro. Uma glândula chamada hipófise
        libera dois hormônios: o LH (luteinizante) e o FSH (folículo-estimulante). Eles viajam pelo sangue e
        estimulam os órgãos sexuais. Nos meninos, os testículos passam a produzir testosterona (responsável pela voz
        mais grossa, pelos e desenvolvimento físico) e a produzir os espermatozoides. Nas meninas, os ovários passam
        a produzir estrogênio (estradiol) e progesterona, hormônios que atuam no amadurecimento dos óvulos e
        controlam o ciclo menstrual <span className="text-[12px]">(Brasil, 2017; Krishna; Witchel, 2024).</span>
      </p>

      <div className="absolute rounded-[40px] overflow-hidden" style={{ left: '40px', top: '501px', width: '200px', height: '280px' }}>
        <img alt="Menino pensando" className="w-full h-full object-cover" src={meninoPensando} />
      </div>
    </div>
  );
}
