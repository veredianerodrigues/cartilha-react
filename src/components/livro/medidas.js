// Geometria do livro (Design System "Cartilha", componentes Pagina e Espelho).
// Recebe o espaço disponível e devolve o tamanho da folha, as margens e se cabe o
// espelho (duas páginas). O texto nunca é escalado: o que muda é quanto cabe por folha.

const LARGURA_A5 = 595;
const PROPORCAO_A5 = 1.414;
const ESPELHO_MIN = 1024; // largura a partir da qual abrem duas páginas
const FOLHA_MIN_ESPELHO = 420; // abaixo disso, cada página do espelho fica estreita demais

export const ALTURA_NAVEGACAO = 76;

export function calcularMedidas(larguraArea, alturaArea) {
  const celular = larguraArea < 640;

  if (celular) {
    // No celular a folha ocupa a tela; margens menores.
    const margens = { topo: 44, base: 40, externa: 20, interna: 20 };
    const largura = larguraArea - 16;
    const altura = alturaArea - 16;
    return montar({ espelho: false, largura, altura, margens });
  }

  const margens = { topo: 56, base: 64, externa: 40, interna: 48 };
  const alturaMax = alturaArea - 32;
  const folhaEspelho = Math.min((larguraArea - 64) / 2, LARGURA_A5, alturaMax / PROPORCAO_A5);
  const espelho = larguraArea >= ESPELHO_MIN && folhaEspelho >= FOLHA_MIN_ESPELHO;

  const largura = espelho ? folhaEspelho : Math.min(larguraArea - 48, LARGURA_A5);
  const altura = Math.min(alturaMax, largura * PROPORCAO_A5);
  // Página única fora do espelho não tem lombada: margens laterais iguais.
  return montar({ espelho, largura, altura, margens: espelho ? margens : { ...margens, interna: margens.externa } });
}

function montar({ espelho, largura, altura, margens }) {
  const larguraTexto = Math.floor(largura - margens.externa - margens.interna);
  const alturaTexto = Math.floor(altura - margens.topo - margens.base);
  // Distância entre colunas = as duas margens internas (no espelho, de um lado e do
  // outro da lombada). Na página única tanto faz: a próxima coluna fica escondida.
  const vao = margens.interna * 2;
  const colunasVisiveis = espelho ? 2 : 1;
  return {
    espelho,
    largura: Math.floor(largura),
    altura: Math.floor(altura),
    margens,
    larguraTexto,
    alturaTexto,
    vao,
    colunasVisiveis,
    passoColuna: larguraTexto + vao,
  };
}
