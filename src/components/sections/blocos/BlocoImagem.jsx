import ImagemComLegenda from './ImagemComLegenda.jsx';

// Largura máxima da imagem dentro da coluna de texto (nunca passa da largura da tela).
const TAMANHOS = {
  auto: 'w-full',
  media: 'w-full max-w-[440px]',
  pequena: 'w-full max-w-[260px]',
};

// Posição da imagem na linha; só aparece quando o tamanho não ocupa a largura toda.
const ALINHAMENTOS = {
  esquerda: 'mr-auto',
  centro: 'mx-auto',
  direita: 'ml-auto',
};

// Esquerda/direita com tamanho média ou pequena: a imagem flutua e o texto dos blocos
// seguintes corre ao lado. No celular continua em coluna única. O bloco seguinte perde a
// margem de cima para o texto começar alinhado ao topo da imagem.
const FLUTUANTE = {
  esquerda: 'sm:float-left sm:mr-5 sm:mb-2 [&+*]:!mt-0',
  direita: 'sm:float-right sm:ml-5 sm:mb-2 [&+*]:!mt-0',
};
// Em fração da coluna (a coluna é a página do livro, que muda com a tela): assim o
// texto ao lado nunca fica espremido.
const LARGURA_FLUTUANTE = {
  media: 'sm:w-1/2 sm:max-w-none',
  pequena: 'sm:w-[40%] sm:max-w-none',
};

export default function BlocoImagem({ bloco }) {
  // Página inteira: a figura ocupa uma folha sozinha; o texto para antes e continua
  // na folha seguinte (no espelho, fica lado a lado com o texto).
  if (bloco.tamanho === 'pagina') {
    return <ImagemComLegenda item={bloco.imagem} paginaInteira className="break-before-column break-after-column" />;
  }

  const flutua = bloco.tamanho !== 'auto' && FLUTUANTE[bloco.alinhamento];
  const classes = flutua
    ? `${TAMANHOS[bloco.tamanho]} ${ALINHAMENTOS[bloco.alinhamento]} ${FLUTUANTE[bloco.alinhamento]} ${LARGURA_FLUTUANTE[bloco.tamanho]}`
    : `${TAMANHOS[bloco.tamanho]} ${ALINHAMENTOS[bloco.alinhamento]}`;
  return <ImagemComLegenda item={bloco.imagem} className={classes} />;
}
