import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Imagem que amplia ao toque (lightbox). A moldura (retrato, cena, ilustração) fica
// em ImagemComLegenda; aqui é só a imagem e o zoom. Carrega já (eager): nas folhas do
// livro fora da tela, o carregamento preguiçoso atrasava a imagem ao virar a página.
// O lightbox vai por portal para o <body>: as páginas do livro são deslocadas com
// transform, e um position: fixed dentro delas ficaria preso à página em vez da tela.
export default function IllustrationFrame({ src, alt = '', largura, altura, imgClassName = '', style }) {
  const [open, setOpen] = useState(false);

  // Fecha com Esc; só escuta enquanto o lightbox está aberto.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        // touch-manipulation: sem isso, um toque com qualquer micro-deslize pode fazer
        // o navegador mobile (Safari principalmente) não disparar o clique.
        // data-zoomable é o gancho que useSwipeNavigation usa pra não competir com o toque.
        className="block w-full h-full cursor-zoom-in touch-manipulation"
        data-zoomable="true"
        aria-label={`Ampliar imagem${alt ? `: ${alt}` : ''}`}
      >
        <img
          src={src}
          alt={alt}
          width={largura}
          height={altura}
          loading="eager"
          decoding="async"
          className={imgClassName}
          style={style}
        />
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 cursor-zoom-out"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={alt || 'Imagem ampliada'}
          >
            <img src={src} alt={alt} className="max-w-[90vw] max-h-[95vh] w-auto h-auto object-contain" />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl leading-none p-2 rounded-full hover:bg-white/10"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>,
          document.body,
        )}
    </>
  );
}
