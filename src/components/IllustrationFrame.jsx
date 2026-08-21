import { useEffect, useState } from 'react';

export default function IllustrationFrame({
  src,
  alt = '',
  side = 'left',
  className = '',
  fit = 'cover',
  rounded = true,
  shadow = false,
  zoomable = true,
}) {
  const [open, setOpen] = useState(false);
  const cornerClass = !rounded
    ? ''
    : side === 'left'
      ? 'rounded-r-[24px] sm:rounded-r-[50px]'
      : 'rounded-l-[24px] sm:rounded-l-[50px]';
  const shadowClass = shadow ? 'shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]' : '';

  // Fecha com Esc; só escuta enquanto o lightbox está aberto.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center min-h-[160px] border-2 border-dashed border-brand-blue/40 bg-[rgba(29,67,85,0.03)] ${cornerClass} ${className}`}
      >
        <span className="font-worksans text-xs text-brand-darker/60 text-center px-4">Imagem a cadastrar</span>
      </div>
    );
  }

  // fit="contain" mostra a imagem inteira, sem cortar (para infográficos/diagramas
  // que precisam aparecer por completo) — "cover" (padrão) preenche o quadro cortando
  // as bordas, para fotos soltas.
  const imgClassName = fit === 'contain' ? 'w-full h-auto object-contain' : 'w-full h-full object-cover';

  return (
    <>
      <div className={`overflow-hidden ${cornerClass} ${shadowClass} ${className}`}>
        {zoomable ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block w-full h-full cursor-zoom-in"
            aria-label={`Ampliar imagem${alt ? `: ${alt}` : ''}`}
          >
            <img src={src} alt={alt} loading="lazy" decoding="async" className={imgClassName} />
          </button>
        ) : (
          <img src={src} alt={alt} loading="lazy" decoding="async" className={imgClassName} />
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt || 'Imagem ampliada'}
        >
          <img src={src} alt={alt} className="max-w-[80vw] max-h-[95vh] w-auto h-auto object-contain" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl leading-none p-2 rounded-full hover:bg-white/10"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
