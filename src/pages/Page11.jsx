import meninas from '../assets/page11/meninas.png';
import deco from '../assets/page11/deco.svg';

export default function Page11() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">11</p>

      <div className="absolute font-poppins text-black left-[82px] top-[35px] w-[371px]">
        <p className="mb-0 text-[16px] font-light">Que transformações ocorrem no</p>
        <p className="text-[32px]">
          <span className="font-light">corpo da </span>
          <span className="font-bold uppercase">meninA</span>
          <span className="font-light">?</span>
        </p>
      </div>

      <div className="absolute bg-[#f5f5ef] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '115px', width: '544px', height: '89px', borderTopLeftRadius: '50px', borderTopRightRadius: '50px' }} />
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[99px] top-[149px] w-[442px]">
        A primeira manifestação de puberdade na menina é o surgimento do broto mamário que se inicia por volta dos 8
        anos com término aos 15-16 anos, seguido pelo crescimento dos pelos pubianos, pelo estirão puberal e ganho
        de peso.
      </p>

      <div className="absolute overflow-hidden" style={{ left: '0px', top: '198px', width: '595px', height: '446px', borderBottomRightRadius: '50px', borderTopLeftRadius: '50px' }}>
        <img alt="Meninas" className="w-full h-full object-cover" src={meninas} />
      </div>

      <div className="absolute bg-[#f5f5ef] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '1px', top: '565px', width: '544px', height: '242px' }} />
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[54px] top-[600px] w-[442px]">
        Nas meninas, o primeiro sinal visível da puberdade é o surgimento do broto mamário, que corresponde ao início
        do desenvolvimento das mamas. Esse processo ocorre geralmente entre os 9 e 10 anos, podendo iniciar
        normalmente entre os 8 e os 13 anos. Em seguida, ou quase ao mesmo tempo, começam a surgir os pelos pubianos
        e inicia-se o estirão puberal, período em que ocorre o crescimento mais acelerado da altura, cujo pico
        costuma acontecer entre os 11 e 12 anos. O maior ganho de peso também ocorre, em geral, entre os 12 e 13
        anos. Após a menarca (primeira menstruação), o crescimento desacelera progressivamente.{' '}
        <span className="text-[12px]">Bacil et al., 2020; Krishna; Witchel, 2024; Graber, 2025</span>
      </p>
    </div>
  );
}
