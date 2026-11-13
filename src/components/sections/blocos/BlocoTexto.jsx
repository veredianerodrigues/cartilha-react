import TextCard from '../shared/TextCard.jsx';
import HighlightCard from '../shared/HighlightCard.jsx';
import PortableTextView from '../shared/PortableTextView.jsx';

const TITULO = 'font-poppins font-bold text-base mb-2';
const TITULO_AZUL = `${TITULO} text-brand-blue`;

// Cada variante do Studio ("Tipo de caixa") vira um estilo; reaproveita os cards
// que já existiam no design. `saibaMais` e `dica` são estilos novos.
const VARIANTES = {
  normal: {
    Wrapper: ({ children }) => <div className="text-black">{children}</div>,
    titulo: TITULO_AZUL,
  },
  saibaMais: {
    Wrapper: ({ children }) => <HighlightCard variant="blue">{children}</HighlightCard>,
    titulo: TITULO_AZUL,
  },
  voceSabia: {
    Wrapper: ({ children }) => <TextCard className="text-black">{children}</TextCard>,
    titulo: TITULO_AZUL,
  },
  fiqueAtento: {
    Wrapper: ({ children }) => <TextCard className="text-black">{children}</TextCard>,
    titulo: TITULO_AZUL,
  },
  importante: {
    Wrapper: ({ children }) => <HighlightCard variant="solid">{children}</HighlightCard>,
    titulo: `${TITULO} text-white`,
  },
  olhaSo: {
    Wrapper: ({ children }) => (
      <div className="rounded-[20px] bg-white shadow p-4 text-black">{children}</div>
    ),
    titulo: TITULO_AZUL,
  },
  dica: {
    Wrapper: ({ children }) => (
      <div className="rounded-[24px] sm:rounded-[40px] bg-brand-teal/20 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 text-black">
        {children}
      </div>
    ),
    titulo: TITULO_AZUL,
  },
};

export default function BlocoTexto({ bloco }) {
  const { Wrapper, titulo } = VARIANTES[bloco.variante];

  return (
    <Wrapper>
      {bloco.titulo && <p className={titulo}>{bloco.titulo}</p>}
      <PortableTextView value={bloco.conteudo} />
    </Wrapper>
  );
}
