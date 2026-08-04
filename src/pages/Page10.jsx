import image2 from '../assets/page10/image2.png';
import image3 from '../assets/page10/image3.png';
import deco from '../assets/page10/deco.svg';

export default function Page10() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">10</p>

      <div className="absolute bg-[rgba(40,157,210,0.19)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '73px', width: '493px', height: '277px' }} />
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[99px] w-[421px]">
        Nos meninos, são avaliados o crescimento da genitália (G) e dos pelos pubianos (P). Cada um deles é dividido
        em cinco estágios, de 1 a 5. O estágio 1 indica que a puberdade ainda não começou, enquanto o estágio 5
        representa o desenvolvimento físico completo. Os estágios 2, 3 e 4 mostram as mudanças que acontecem ao
        longo da puberdade <span className="text-[12px]">(Marshall; Tanner, 1970).</span>
      </p>

      <img alt="Estágios de Tanner - genitália" className="absolute object-cover" style={{ left: '299px', top: '390px', width: '260px', height: '333px' }} src={image2} />
      <img alt="Estágios de Tanner - pelos pubianos" className="absolute object-cover" style={{ left: '41px', top: '379px', width: '259px', height: '342px' }} src={image3} />

      <p className="absolute font-worksans text-black text-[12px] left-[54px] top-[732px] tracking-[0.12px]">Fonte: Brasil (2012a. p. 32-33)</p>
    </div>
  );
}
