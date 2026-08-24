// Gerado a partir de um backup completo do conteúdo em produção
// (capturado em 2026-08-05, antes de identificarmos o bug de montagem
// do volume Docker que zerava o banco a cada restart do container).
// Este arquivo é a fonte de verdade completa: árvore de seções + blocos
// de TODAS as 19 seções, não só as 3 pilotos.

export const TREE = [
  {
    slug: "apresentacao",
    title: "Apresentação",
    pageLabel: "04",
  },
  {
    slug: "adolescencia-chegou",
    title: "A adolescência chegou... e agora?",
    pageLabel: "05",
    children: [
      {
        slug: "transformacoes-menino",
        title: "Que transformações ocorrem no corpo do menino?",
        pageLabel: "06",
      },
      {
        slug: "erecao-ejaculacao",
        title: "O que é ereção e ejaculação e quando acontece a primeira ejaculação?",
        pageLabel: "07",
      },
      {
        slug: "tanner-menino",
        title: "Estágios de Tanner (menino)",
        pageLabel: "08",
      },
      {
        slug: "transformacoes-menina",
        title: "Que transformações ocorrem no corpo da menina?",
        pageLabel: "09",
      },
    ],
  },
  {
    slug: "menstruacao",
    title: "E a menstruação... o que é e como acontece?",
    pageLabel: "10",
  },
  {
    slug: "fecundacao",
    title: "Sobre a fecundação... o que é fecundação e como acontece?",
    pageLabel: "11",
  },
  {
    slug: "metodos-contraceptivos",
    title: "Métodos Contraceptivos",
    pageLabel: "12",
    children: [
      {
        slug: "classificacao-metodos",
        title: "Como são classificados os métodos contraceptivos? Todos eles são indicados para adolescentes?",
        pageLabel: "13",
      },
      {
        slug: "metodos-barreira",
        title: "Métodos de Barreira",
        pageLabel: "14",
      },
      {
        slug: "diu",
        title: "Dispositivo Intrauterino (DIU)",
        pageLabel: "15",
      },
      {
        slug: "metodos-hormonais",
        title: "Métodos hormonais",
        pageLabel: "16",
      },
      {
        slug: "mitos-anticoncepcional",
        title: "Mitos relacionados ao anticoncepcional hormonal",
        pageLabel: "17",
      },
    ],
  },
  {
    slug: "direitos-sexuais-reprodutivos",
    title: "Vamos falar sobre direitos sexuais e reprodutivos?",
    pageLabel: "18",
  },
  {
    slug: "gravidez-adolescencia-mudancas",
    title: "E se a gravidez acontecer...",
    pageLabel: "19",
  },
  {
    slug: "orientacao-quem-pode-ajudar",
    title: "Se eu precisar de orientação, quem poderá me ajudar?",
    pageLabel: "20",
  },
  {
    slug: "referencias",
    title: "Referências",
    pageLabel: "21",
  },
];

// Todas as seções já foram removidas daqui, uma a uma, conforme migradas pro
// banco (ver os scripts server/db/migrate*Text.js, cada um com o texto
// validado + chaves de slot que o componente bespoke correspondente espera
// via prop `fields`/`orderedFields`). Se uma entrar de volta aqui, todo
// "npm run seed" apagaria e recriaria os blocks dela com o texto antigo (sem
// as chaves), quebrando a página — já aconteceu uma vez com "diu", este
// comentário existe pra não repetir. Fica vazio até surgir uma seção nova
// que ainda precise do fluxo de seed clássico.
export const SECTION_BLOCKS = {};