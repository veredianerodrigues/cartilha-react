import ImagemComLegenda from './ImagemComLegenda.jsx';

// Largura máxima da imagem dentro da folha (nunca passa da largura da tela). A altura
// máxima de cada tamanho fica em ImagemComLegenda.
const TAMANHOS = {
  pagina: 'w-full',
  grande: 'w-full',
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
  esquerda: 'sm:float-left sm:mr-8 sm:mb-3 [&+*]:!mt-0',
  direita: 'sm:float-right sm:ml-8 sm:mb-3 [&+*]:!mt-0',
};
// Em fração da folha: assim o texto ao lado nunca fica espremido.
const LARGURA_FLUTUANTE = {
  media: 'sm:w-1/2 sm:max-w-none',
  pequena: 'sm:w-[40%] sm:max-w-none',
};

export default function BlocoImagem({ bloco }) {
  const flutua = Boolean(LARGURA_FLUTUANTE[bloco.tamanho] && FLUTUANTE[bloco.alinhamento]);
  const classes = flutua
    ? `${TAMANHOS[bloco.tamanho]} ${ALINHAMENTOS[bloco.alinhamento]} ${FLUTUANTE[bloco.alinhamento]} ${LARGURA_FLUTUANTE[bloco.tamanho]}`
    : `${TAMANHOS[bloco.tamanho]} ${ALINHAMENTOS[bloco.alinhamento]}`;
  return <ImagemComLegenda item={bloco.imagem} tamanho={bloco.tamanho} className={classes} />;
}
