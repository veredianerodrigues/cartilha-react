export default function IllustrationFrame({ src, alt = '', side = 'left', className = '', fit = 'cover' }) {
  const cornerClass =
    side === 'left'
      ? 'rounded-r-[24px] sm:rounded-r-[50px]'
      : 'rounded-l-[24px] sm:rounded-l-[50px]';

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
  return (
    <div className={`overflow-hidden ${cornerClass} shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] ${className}`}>
      <img
        src={src}
        alt={alt}
        className={fit === 'contain' ? 'w-full h-auto object-contain' : 'w-full h-full object-cover'}
      />
    </div>
  );
}
