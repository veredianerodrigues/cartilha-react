import menino from '../assets/page07/menino.png';
import deco1 from '../assets/page07/deco1.svg';
import deco2 from '../assets/page07/deco2.svg';

export default function Page07() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco1} />
      <img alt="" className="absolute pointer-events-none" style={{ left: '-20.34%', top: '83.97%', width: '96.66%', height: '28.14%' }} src={deco2} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">7</p>

      <div className="absolute font-poppins text-black left-[54px] top-[60px] w-[329px]">
        <p className="font-light leading-[1.44] mb-0 text-[32px]">Que transformações ocorrem no</p>
        <p className="font-light leading-[1.44] mb-0 text-[32px]">corpo do</p>
        <p className="text-[32px]">
          <span className="font-bold leading-[1.44] uppercase">menino</span>
          <span className="font-light leading-[1.44]">?</span>
        </p>
      </div>

      <div className="absolute rounded-[50px] overflow-hidden" style={{ left: '272px', top: '109px', width: '235px', height: '246px' }}>
        <img alt="Menino" className="w-full h-full object-cover" src={menino} />
      </div>

      <div className="absolute bg-[rgba(40,157,210,0.19)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '345px', width: '493px', height: '460px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[380px] w-[421px]">
        <p className="mb-[18px]">
          Nos meninos, a puberdade é marcada por diversas transformações físicas. Uma das mais evidentes é o estirão
          de crescimento, período em que ocorre um aumento acelerado da altura, com crescimento médio de 8-9
          cm/ano. Esse crescimento costuma atingir sua velocidade máxima entre os 13 e 14 anos e desacelera
          progressivamente até o final da adolescência. O maior ganho de peso também ocorre, em geral, por volta
          dos 14 anos.
        </p>
        <p className="mb-[18px]">
          O primeiro sinal da puberdade masculina é o aumento do volume dos testículos, que geralmente ocorre entre
          os 10 e 11 anos. Em seguida, acontece o crescimento do pênis e o surgimento dos pelos pubianos. Entre os
          12 e 14 anos, começam a aparecer os pelos nas axilas, no rosto e em outras regiões do corpo. Nessa fase,
          também aumenta a atividade das glândulas sudoríparas, o que favorece o suor e o odor corporal
          característicos da adolescência. É ainda durante esse período que as ereções espontâneas se tornam mais
          frequentes e ocorre a espermarca (primeira ejaculação).
        </p>
        <p className="text-[12px]">Bacil et al., 2020; Krishna; Witchel, 2024; Graber, 2025</p>
      </div>
    </div>
  );
}
