import { useRef } from 'react';
import ImagemComLegenda from './ImagemComLegenda.jsx';

function Seta({ direcao, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direcao === 'prev' ? 'Imagem anterior' : 'Próxima imagem'}
      className="shrink-0 w-10 h-10 rounded-full bg-tinta-forte text-papel font-titulo hover:bg-azul-texto transition"
    >
      {direcao === 'prev' ? '←' : '→'}
    </button>
  );
}

function Carrossel({ imagens }) {
  const pista = useRef(null);
  // Rola uma "tela" por vez; a pista tem overflow horizontal, então o swipe de
  // página (useSwipeNavigation) já a ignora e o gesto só rola as imagens.
  const rolar = (sentido) =>
    pista.current.scrollBy({ left: sentido * pista.current.clientWidth, behavior: 'smooth' });

  return (
    <div>
      <div ref={pista} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
        {imagens.map((item) => (
          <div key={item._key} className="snap-center shrink-0 w-[85%] sm:w-[70%]">
            <ImagemComLegenda item={item} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-2">
        <Seta direcao="prev" onClick={() => rolar(-1)} />
        <Seta direcao="next" onClick={() => rolar(1)} />
      </div>
    </div>
  );
}

export default function BlocoGradeImagens({ bloco }) {
  if (bloco.modo === 'carrossel') return <Carrossel imagens={bloco.imagens} />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {bloco.imagens.map((item) => (
        <ImagemComLegenda key={item._key} item={item} />
      ))}
    </div>
  );
}
