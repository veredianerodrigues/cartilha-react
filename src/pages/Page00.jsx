import designSemNome from '../assets/page00/design-sem-nome.png';
import group0 from '../assets/page00/group0.svg';
import group1 from '../assets/page00/group1.svg';
import group2 from '../assets/page00/group2.svg';
import group3 from '../assets/page00/group3.svg';
import group4 from '../assets/page00/group4.svg';
import group5 from '../assets/page00/group5.svg';

export default function Page00() {
  return (
    <div className="relative w-[595px] h-[842px] bg-[#f5f5ef] overflow-hidden">
      <img alt="" className="absolute" style={{ left: '58.43%', top: '47.37%', width: '44.91%', height: '26.94%' }} src={group0} />
      <img alt="" className="absolute" style={{ left: '-17.02%', top: '-34.17%', width: '71.8%', height: '134.99%' }} src={group1} />
      <img alt="" className="absolute" style={{ left: '-16.53%', top: '27.37%', width: '37.34%', height: '35.59%' }} src={group2} />
      <img alt="" className="absolute" style={{ left: '-10.98%', top: '65.97%', width: '61.59%', height: '49.47%' }} src={group3} />
      <img alt="" className="absolute" style={{ left: '66.4%', top: '-10.83%', width: '57.91%', height: '86.02%' }} src={group4} />
      <img alt="" className="absolute" style={{ left: '55.74%', top: '78%', width: '58.79%', height: '31.31%' }} src={group5} />

      <div className="absolute text-right text-[#1d4355] font-poppins font-light text-[32px] leading-[1.065]" style={{ right: '59.19%', top: '11.52%' }}>
        <p>VAMOS</p>
        <p>CONVERSAR</p>
        <p>SOBRE</p>
      </div>

      <p className="absolute text-right text-[#1d4355] font-poppins font-light text-[10px] whitespace-nowrap" style={{ right: '59.19%', top: '23.39%' }}>
        #saudesexualereprodutiva
      </p>

      <div
        className="absolute text-left text-[#1d4355] tracking-[1.74px]"
        style={{ left: '42.82%', top: '10.92%', fontFamily: '"Bebas Neue", sans-serif', fontSize: '58px', lineHeight: '0.5619' }}
      >
        <p className="mb-[34px]">GRAVIDEZ NA</p>
        <p>ADOLESCÊNCIA?</p>
      </div>

      <div className="absolute overflow-hidden pointer-events-none" style={{ left: '8.23%', top: '31.46%', right: '-0.08%', bottom: '5.61%' }}>
        <img alt="" className="absolute" style={{ left: 0, top: '1.11%', width: '103.74%', height: '97.99%' }} src={designSemNome} />
      </div>
    </div>
  );
}
