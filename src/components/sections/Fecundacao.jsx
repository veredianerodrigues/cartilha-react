import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function Fecundacao({ images }) {
  const [diagram] = images;

  return (
    <div className="relative">
      <PageHero
        pageLabel="11"
        title={
          <>
            <span className="font-semibold">Sobre a fecundação...</span>
            <br />o que é a fecundação e como ela acontece?
          </>
        }
      />

      <Paragraph className="mb-6">
        A fecundação é o encontro do espermatozoide e do óvulo. Esse momento único marca o início da gestação e de
        um novo ser. Para que a fecundação aconteça, o corpo passa por uma sequência precisa de eventos:
      </Paragraph>

      <IllustrationFrame
        src={diagram?.url}
        alt={diagram?.caption || 'Fecundação'}
        fit="contain"
        className="w-full max-w-md mx-auto mb-2"
        rounded={false}
      />

      {diagram?.caption && <p className="font-worksans text-brand-dark text-xs tracking-[0.12px]">{diagram.caption}</p>}

    </div>
  );
}
