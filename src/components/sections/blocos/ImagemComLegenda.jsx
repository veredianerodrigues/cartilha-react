import IllustrationFrame from '../../IllustrationFrame.jsx';
import { urlFor } from '../../../lib/sanity.js';

// Uma imagem com legenda ("Figura: …") e fonte. Usada pelo bloco de imagem e pela grade.
export default function ImagemComLegenda({ item }) {
  return (
    <figure className="m-0">
      <IllustrationFrame
        src={urlFor(item.imagem).url()}
        alt={item.alt}
        fit="contain"
        className="w-full rounded-xl"
      />
      {(item.legenda || item.fonte) && (
        <figcaption className="font-worksans text-xs text-brand-darker mt-1 space-y-0.5">
          {item.legenda && <p className="m-0">{item.legenda}</p>}
          {item.fonte && <p className="m-0 italic">{item.fonte}</p>}
        </figcaption>
      )}
    </figure>
  );
}
