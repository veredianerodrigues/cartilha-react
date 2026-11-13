import PortableTextView from '../shared/PortableTextView.jsx';

// As 7 variantes do Studio ("Tipo de caixa") viram 4 visuais de caixa + o texto
// corrido (Design System, componente Caixa). Nenhuma caixa tem sombra.
const CAIXA = 'rounded-caixa p-6 break-inside-avoid';
const TITULO_CAIXA = 'font-titulo text-titulo-caixa mb-2';

const CURIOSIDADE = { caixa: `${CAIXA} bg-azul-claro text-tinta`, titulo: `${TITULO_CAIXA} text-azul-texto` };

const VISUAIS = {
  voceSabia: CURIOSIDADE,
  saibaMais: CURIOSIDADE,
  olhaSo: CURIOSIDADE,
  fiqueAtento: {
    caixa: `${CAIXA} rounded-t-none border-t-[3px] border-azul-marca bg-neutro-claro text-tinta`,
    titulo: `${TITULO_CAIXA} text-azul-texto`,
  },
  dica: { caixa: `${CAIXA} bg-teal-claro text-tinta`, titulo: `${TITULO_CAIXA} text-azul-texto` },
  importante: { caixa: `${CAIXA} bg-destaque text-sobre-destaque`, titulo: `${TITULO_CAIXA} text-sobre-destaque` },
};

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
    <div className="break-inside-avoid">
      <div className={caixa}>
        {bloco.titulo && <p className={titulo}>{bloco.titulo}</p>}
        <PortableTextView value={bloco.conteudo} />
      </div>
      {bloco.fonte && <p className="mt-2 font-texto text-fonte-imagem italic text-tinta-suave">{bloco.fonte}</p>}
    </div>
  );
}
