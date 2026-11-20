import PortableTextView from '../shared/PortableTextView.jsx';
import { VISUAIS_CAIXA as VISUAIS } from '../shared/caixas.js';

// "Texto normal" é o texto corrido; as demais variantes são caixas (ver shared/caixas.js).

export default function BlocoTexto({ bloco, abre = false }) {
  // Texto corrido: o título do bloco é um subtítulo da página.
  if (bloco.variante === 'normal') {
    return (
      <div className="text-tinta">
        {bloco.titulo && (
          <h2 className="font-titulo text-subtitulo text-azul-texto mt-8 mb-2 break-after-avoid">{bloco.titulo}</h2>
        )}
        <PortableTextView value={bloco.conteudo} abre={abre} />
      </div>
    );
  }

  const { caixa, titulo } = VISUAIS[bloco.variante];
  return (
    <div className="break-inside-avoid flow-root">
      <div className={caixa}>
        {bloco.titulo && <p className={titulo}>{bloco.titulo}</p>}
        <PortableTextView value={bloco.conteudo} />
      </div>
      {bloco.fonte && <p className="mt-2 font-texto text-fonte-imagem italic text-tinta-suave">{bloco.fonte}</p>}
    </div>
  );
}
