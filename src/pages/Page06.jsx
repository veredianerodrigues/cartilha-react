import deco1 from '../assets/page06/deco1.svg';
import deco2 from '../assets/page06/deco2.svg';

export default function Page06() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco1} />
      <img alt="" className="absolute pointer-events-none" style={{ left: '-20.34%', top: '83.97%', width: '96.66%', height: '28.14%' }} src={deco2} />

      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">6</p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '83px', width: '489px', height: '410px' }} />
      <p className="absolute font-poppins font-light text-black text-[32px] left-[74px] top-[115px]">E tem mais...</p>
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[74px] top-[183px] w-[410px]">
        Os caracteres sexuais primários correspondem aos órgãos do sistema reprodutor presentes desde o nascimento.
        Nas meninas, incluem os ovários, as tubas uterinas, o útero, a vagina e a vulva. Nos meninos, compreendem os
        testículos, o pênis, o escroto, as vesículas seminais e a próstata. Durante a puberdade, esses órgãos
        amadurecem e ocorre o desenvolvimento dos caracteres sexuais secundários. Nas meninas, destacam-se o
        desenvolvimento das mamas, o aparecimento dos pelos pubianos e axilares e o alargamento do quadril. Nos
        meninos, ocorre o aumento do volume dos testículos e do pênis, o aparecimento de pelos faciais, corporais,
        axilares e pubianos, o aumento da massa muscular e a mudança da voz.
      </p>

      <div className="absolute bg-[rgba(40,157,210,0.19)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '526px', width: '493px', height: '281px' }} />
      <p className="absolute font-poppins font-light text-black text-[32px] left-[74px] top-[553px]">Portanto ...</p>
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[74px] top-[636px] w-[419px]">
        é importante entender a puberdade como um período relevante de transição e transformações físicas,
        fisiológicas e emocionais da vida de meninas e meninos, destacando que nesse momento o corpo do adolescente
        ganha algumas novas funcionalidades, principalmente no campo da sexualidade.
        <br />
        <span className="text-[12px]">SBP (2023a); Krishna; Witchel (2024)</span>
      </p>
    </div>
  );
}
