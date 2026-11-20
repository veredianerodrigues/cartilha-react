// As 6 variantes de caixa do Studio ("Tipo de caixa") viram 4 visuais (Design System,
// componente Caixa). Nenhuma caixa tem sombra. Usado pelo bloco de texto e pela caixa
// inserida dentro do texto rico.
// flow-root: ao lado de uma imagem flutuante a caixa fica ao lado dela (e desce se não couber),
// em vez de passar por baixo da imagem.
const CAIXA = 'rounded-caixa p-6 break-inside-avoid flow-root';
const TITULO_CAIXA = 'font-titulo text-titulo-caixa mb-2';

const CURIOSIDADE = { caixa: `${CAIXA} bg-azul-claro text-tinta`, titulo: `${TITULO_CAIXA} text-azul-texto` };

export const VISUAIS_CAIXA = {
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
