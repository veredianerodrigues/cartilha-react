import IllustrationFrame from '../IllustrationFrame.jsx';
import deco from '../../assets/page16/deco.svg';

export default function Fecundacao({ images }) {
  const [diagram] = images;

  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.4] mb-5">
        <span className="font-semibold">Sobre a fecundação...</span>
        <br />o que é a fecundação e como ela acontece?
      </h1>

      <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify mb-6">
        A fecundação é o encontro do espermatozoide e do óvulo. Esse momento único marca o início da gestação e de
        um novo ser. Para que a fecundação aconteça, o corpo passa por uma sequência precisa de eventos:
      </p>

      <IllustrationFrame
        src={diagram?.url}
        alt={diagram?.caption || 'Fecundação'}
        fit="contain"
        className="w-full max-w-md mx-auto mb-2"
      />

      {diagram?.caption && <p className="font-worksans text-brand-dark text-xs tracking-[0.12px]">{diagram.caption}</p>}
    </div>
  );
}
