import IllustrationFrame from '../IllustrationFrame.jsx';
import deco11 from '../../assets/page11/deco.svg';
import deco12 from '../../assets/page12/deco.svg';

export default function TransformacoesMenina({ images }) {
  const [mamas, foto, pelos] = images;

  return (
    <div className="relative space-y-6">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco11} />

      <div>
        <p className="font-poppins font-light text-brand-dark text-base mb-1">Que transformações ocorrem no</p>
        <h1 className="font-poppins text-brand-dark text-2xl sm:text-3xl">
          <span className="font-light">corpo da </span>
          <span className="font-bold uppercase">menina</span>
          <span className="font-light">?</span>
        </h1>
      </div>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[#f5f5ef] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          A primeira manifestação de puberdade na menina é o surgimento do broto mamário que se inicia por volta dos
          8 anos com término aos 15-16 anos, seguido pelo crescimento dos pelos pubianos, pelo estirão puberal e
          ganho de peso.
        </p>
      </div>

      <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Adolescentes'} className="w-full h-[300px]" />

      <div className="rounded-[24px] sm:rounded-[40px] bg-[#f5f5ef] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Nas meninas, o primeiro sinal visível da puberdade é o surgimento do broto mamário, que corresponde ao
          início do desenvolvimento das mamas. Esse processo ocorre geralmente entre os 9 e 10 anos, podendo iniciar
          normalmente entre os 8 e os 13 anos. Em seguida, ou quase ao mesmo tempo, começam a surgir os pelos
          pubianos e inicia-se o estirão puberal, período em que ocorre o crescimento mais acelerado da altura, cujo
          pico costuma acontecer entre os 11 e 12 anos. O maior ganho de peso também ocorre, em geral, entre os 12 e
          13 anos. Após a menarca (primeira menstruação), o crescimento desacelera progressivamente.{' '}
          <span className="text-xs text-brand-darker">Bacil et al., 2020; Krishna; Witchel, 2024; Graber, 2025.</span>
        </p>
      </div>

      <div className="relative">
        <img alt="" className="absolute pointer-events-none -top-[8%] -right-[6%] w-[30%] max-w-[200px] -z-10" src={deco12} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <IllustrationFrame src={mamas?.url} alt={mamas?.caption || 'Estágios de Tanner - mamas'} fit="contain" className="w-full" />
          <IllustrationFrame src={pelos?.url} alt={pelos?.caption || 'Estágios de Tanner - pelos pubianos'} fit="contain" className="w-full" />
        </div>

        <div className="rounded-[24px] sm:rounded-[40px] bg-[#f5f5ef] p-6 sm:p-8">
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Também é utilizada a escala de Tanner para caracterização do desenvolvimento puberal no corpo feminino.
            Nas meninas ela avalia o desenvolvimento das mamas (M) e, assim como nos meninos, os pelos púbicos (P).
            Dessa maneira, as mamas são classificadas em (M1 a M5), sendo M1 para estágios de desenvolvimento
            inicial (mama infantil) e M5 para mama adulta; quanto a pilosidade (P), o aparecimento de pelos é
            classificado como (P1 a P5), sendo P1 fase pré-adolescente (não há pelos) e P5 pelos do tipo adulto{' '}
            <span className="text-xs text-brand-darker">(Marshall; Tanner, 1970; Meneses; Ocampos, 2008).</span>
          </p>
          {mamas?.caption && <p className="text-xs text-brand-darker mt-3">{mamas.caption}</p>}
        </div>
      </div>
    </div>
  );
}
