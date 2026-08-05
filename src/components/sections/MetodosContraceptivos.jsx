import IllustrationFrame from '../IllustrationFrame.jsx';
import deco from '../../assets/page17/deco.svg';

export default function MetodosContraceptivos({ images }) {
  const [foto] = images;

  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 mb-6">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Se o óvulo não encontrar um espermatozoide, os níveis dos hormônios progesterona e estrogênio diminuem.
          Essa queda dos hormônios faz com que o endométrio (camada interna do útero), que havia se preparado para
          receber uma possível gravidez, se desprenda e seja eliminado através do sangramento menstrual. Assim que a
          menstruação termina, o corpo recomeça um novo ciclo. Contudo, se a gravidez acontecer, o ciclo menstrual
          não se completa e segue o desenvolvimento da gestação{' '}
          <span className="text-xs text-brand-darker">(Montenegro; Rezende Filho, 2022).</span>
        </p>
      </div>

      <h1 className="font-poppins font-semibold text-brand-dark text-2xl sm:text-3xl mb-6">Métodos contraceptivos</h1>

      <div className="flex flex-col sm:flex-row gap-5 items-stretch">
        <div className="flex-1 space-y-2">
          <p className="font-poppins font-bold text-brand-blue text-base">Atenção...</p>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Para quem deseja ter relações sexuais, mas não quer engravidar, existem diversos métodos contraceptivos
            (ou anticoncepcionais), porém não existe um único método que sirva para todo mundo. Cada organismo é
            diferente, e alguns métodos podem ter contraindicações dependendo de cada pessoa. Por isso, o
            recomendado é escolher o que melhor se adapte às necessidades e à rotina de cada um. Além disso,
            independentemente do método, o que garante a menor chance de falha é o seu uso correto e consistente{' '}
            <span className="text-xs text-brand-darker">(WHO, 2022).</span>
          </p>
        </div>
        <div className="w-full sm:w-[220px] shrink-0">
          <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Métodos contraceptivos'} className="w-full h-[220px]" />
          {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
        </div>
      </div>
    </div>
  );
}
