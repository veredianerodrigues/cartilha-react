import image5 from '../assets/page12/image5.png';
import deco from '../assets/page12/deco.svg';

export default function Page12() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">12</p>

      <div className="absolute rounded-[20px] overflow-hidden" style={{ left: '33px', top: '121px', width: '529px', height: '288px' }}>
        <img alt="Estágios de Tanner - mamas e pelos pubianos" className="w-full h-full object-contain" src={image5} />
      </div>

      <div className="absolute bg-[#f5f5ef] rounded-[50px]" style={{ left: '23px', top: '471px', width: '546px', height: '336px' }} />
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[73px] top-[503px] w-[453px]">
        Fonte: Brasil (2012b. p. 32-33)
      </p>
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[73px] top-[530px] w-[453px]">
        Nas meninas, são observados o crescimento das mamas (M) e dos pelos pubianos (P), classificados em cinco
        estágios, de 1 a 5. Assim como no caso dos meninos, o estágio 1 corresponde ao período antes do início da
        puberdade, enquanto o estágio 5 indica que o desenvolvimento físico foi concluído. Os estágios
        intermediários representam as diferentes mudanças que acontecem durante a puberdade.{' '}
        <span className="text-[12px]">(Marshall; Tanner, 1970; Krishna; Witchel, 2024).</span>
      </p>
    </div>
  );
}
