import IllustrationFrame from '../IllustrationFrame.jsx';
import deco1 from '../../assets/page07/deco1.svg';
import deco2 from '../../assets/page07/deco2.svg';

export default function TransformacoesMenino({ images }) {
  const [menino] = images;

  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco1} />

      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
        <h1 className="font-poppins text-brand-dark text-2xl sm:text-3xl leading-[1.3] flex-1">
          <span className="font-light">Que transformações ocorrem no corpo do </span>
          <span className="font-bold uppercase">menino</span>
          <span className="font-light">?</span>
        </h1>
        <div className="w-full sm:w-[220px] shrink-0">
          <IllustrationFrame src={menino?.url} alt={menino?.caption || 'Adolescente menino'} className="w-full h-[200px]" />
          {menino?.caption && <p className="text-xs text-brand-darker mt-1">{menino.caption}</p>}
        </div>
      </div>

      <div className="relative rounded-[24px] sm:rounded-[40px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 space-y-4">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Nos meninos, a puberdade é marcada por diversas transformações físicas. Uma das mais evidentes é o estirão
          de crescimento, período em que ocorre um aumento acelerado da altura, com crescimento médio de 8-9 cm/ano.
          Esse crescimento costuma atingir sua velocidade máxima entre os 13 e 14 anos e desacelera progressivamente
          até o final da adolescência. O maior ganho de peso também ocorre, em geral, por volta dos 14 anos.
        </p>
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          O primeiro sinal da puberdade masculina é o aumento do volume dos testículos, que geralmente ocorre entre
          os 10 e 11 anos. Em seguida, acontece o crescimento do pênis e o surgimento dos pelos pubianos. Entre os 12
          e 14 anos, começam a aparecer os pelos nas axilas, no rosto e em outras regiões do corpo. Nessa fase,
          também aumenta a atividade das glândulas sudoríparas, o que favorece o suor e o odor corporal
          característicos da adolescência. É ainda durante esse período que as ereções espontâneas se tornam mais
          frequentes e ocorre a espermarca (primeira ejaculação).
        </p>
        <p className="text-xs text-brand-darker">Bacil et al., 2020; Krishna; Witchel, 2024; Graber, 2025.</p>
      </div>
    </div>
  );
}
