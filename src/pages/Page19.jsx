import deco from '../assets/page19/deco.svg';
import preservativo from '../assets/page19/preservativo-masculino.png';

export default function Page19() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">19</p>

      <p className="absolute font-poppins font-light text-[#1d4355] text-[32px] left-[54px] top-[35px] w-[460px]" style={{ lineHeight: '1.44' }}>
        Metódos de <span className="font-semibold uppercase">barreira</span>
      </p>

      <div className="absolute bg-[#f5f5ef] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '90px', width: '493px', height: '717px' }} />

      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[113px] w-[437px]">
        <p>
          Preservativos masculino e feminino (camisinha), diafragma, capuz cervical, esponja contraceptiva. Têm essa
          denominação pois impedem que o espermatozoide entre no útero. Os mais utilizados são os preservativos
          masculino e feminino <span className="text-[12px]">(FINOTTI, 2015).</span>
        </p>
      </div>

      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[215px] w-[437px]">
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Fique ligado!!</p>
        <p>
          Os mais utilizados são os preservativos ou camisinha masculina e feminina e são os únicos métodos que, além
          de evitar a gravidez, protegem contra as Infecções Sexualmente Transmissíveis (ISTs). Ambas são
          distribuídas gratuitamente em qualquer unidade de saúde do SUS, sem necessidade de receita médica.
        </p>
      </div>

      <p className="absolute font-poppins text-black left-[82px] top-[335px]">
        <span className="block text-[24px]">Preservativo</span>
        <span className="block text-[24px] font-semibold">MASCULINO</span>
      </p>
      <div className="absolute rounded-[50px] overflow-hidden shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]" style={{ left: '350px', top: '335px', width: '169px', height: '120px' }}>
        <img alt="Preservativo masculino" className="w-full h-full object-cover" src={preservativo} />
      </div>

      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[440px] w-[437px]">
        <p>
          A camisinha masculina é um método contraceptivo de barreira, feito de látex ou outros materiais, que é
          colocado sobre o pênis ereto para evitar a gravidez e ajudar a prevenir as infecções sexualmente
          transmissíveis (ISTs).
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mt-[14px] mb-[10px]">Como usar:</p>
        <ul className="list-disc pl-[20px] space-y-[8px] mb-0">
          <li>A camisinha deverá ser colocada assim que o pênis estiver ereto, antes de qualquer contato genital ou penetração.</li>
          <li>A ponta do preservativo (o reservatório) deverá ser apertada com os dedos para tirar o ar. Se o ar ficar ali dentro, o preservativo pode estourar durante a relação.</li>
          <li>Mantendo a ponta apertada, a camisinha deverá ser desenrolada da cabeça do pênis (glande) até a base.</li>
          <li>Para retirada segura, logo após a ejaculação, enquanto o pênis ainda estiver ereto, deverá ser retirado da vagina segurando firmemente a base da camisinha junto ao corpo para evitar que ela escorregue e o sêmen vaze.</li>
        </ul>
        <p className="text-[12px] mt-[10px]">BRASIL (2022); WHO (2022).</p>
      </div>
    </div>
  );
}
