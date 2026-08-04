import grupo2 from '../assets/page09/grupo2.png';
import deco from '../assets/page09/deco.svg';

export default function Page09() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden opacity-95">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">9</p>

      <div className="absolute bg-[rgba(40,157,210,0.19)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '75px', width: '493px', height: '324px' }} />
      <p className="absolute font-poppins font-light text-black text-[32px] left-[74px] top-[113px]">Você sabia...</p>
      <p className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[186px] w-[421px]">
        A puberdade ocorre em diferentes fases, que refletem o grau de maturidade sexual do adolescente. Para
        avaliar esse desenvolvimento os médicos britânicos Marshall e Tanner desenvolveram uma classificação
        conhecida como estágios de Tanner, utilizada até os dias atuais pelos profissionais da saúde. Essa
        classificação permite acompanhar o desenvolvimento físico durante a puberdade, pois adolescentes da mesma
        idade podem apresentar diferentes graus de maturação sexual{' '}
        <span className="text-[12px]">(Marshall; Tanner, 1970).</span>
      </p>

      <div className="absolute rounded-[50px] overflow-hidden" style={{ left: '54px', top: '477px', width: '493px', height: '287px' }}>
        <img alt="Estágios de Tanner" className="w-full h-full object-cover" src={grupo2} />
      </div>
    </div>
  );
}
