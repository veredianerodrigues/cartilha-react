// Seções que cobrem mais de uma página física do protótipo (cada uma vira sua
// própria tela, navegável via PrevNextNav) — as demais seções contam como 1.
// (adolescencia-chegou, tanner-menino, transformacoes-menina e menstruacao
// foram unificadas em uma página só cada — conteúdo curto demais pra
// justificar telas separadas.)
export const SECTION_PAGE_COUNTS = {};

export function getPageCount(slug) {
  return SECTION_PAGE_COUNTS[slug] || 1;
}
