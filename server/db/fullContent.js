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

// A maioria das seções foi removida daqui de propósito, uma a uma, conforme
// migradas pro banco (ver os scripts server/db/migrate*Text.js, cada um com o
// texto validado + chaves de slot que o componente bespoke correspondente
// espera via prop `fields`). Só sobra aqui o que ainda não foi migrado —
// hoje, só "referencias" (é uma lista bibliográfica, não parágrafos de
// prosa, ainda não migrada pro mesmo esquema). Se ficasse aqui uma seção já
// migrada, todo "npm run seed" apagaria e recriaria os blocks dela com o
// texto antigo (sem as chaves), quebrando a página — já aconteceu uma vez
// com "diu", este comentário existe pra não repetir. Pra migrar uma seção
// nova pro mesmo esquema, tire a entrada dela daqui.
export const SECTION_BLOCKS = {
  "referencias": [
    { type: "list", items: ["ALVES, T. V.; BEZERRA, M. M. M. Principais alterações fisiológicas e psicológicas durante o período gestacional. Rev. Mult. Psic., Jaboatão dos Guararapes, v. 14, n. 49, p. 114-126, fev. 2020. Disponível em: https://idonline.emnuvens.com.br/id/article/view/2324/3608#. Acesso em: 06 jun. 2026.", "BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Ações Programáticas Estratégicas. Diretrizes nacionais para a atenção integral à saúde de adolescentes e jovens na promoção, proteção e recuperação da saúde. Brasília: Ministério da Saúde, 2010. Disponível em: http://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_nacionais_atencao_saude_adolescentes_jovens_promocao_saude.pdf. Acesso em: 9 jul. 2026.", "BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Ações Programáticas Estratégicas. Caderneta de saúde do adolescente: menino. Brasília: Ministério da Saúde, 2012a. Disponível em: https://saude.rs.gov.br/upload/arquivos/carga20190754/10135428-caderneta-saude-adolescente-menino.pdf. Acesso em: 1 jul. 2026.", "BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Ações Programáticas Estratégicas. Caderneta de saúde do adolescente: menina. Brasília: Ministério da Saúde, 2012b. Disponível em: https://saude.rs.gov.br/upload/arquivos/carga20190755/10135513-caderneta-saude-adolescente-menina.pdf. Acesso em: 1 jul. 2026.", "BRASIL. Ministério da Saúde. Protocolo clínico e diretrizes terapêuticas para atenção integral às pessoas com infecções sexualmente transmissíveis (IST). Brasília: Ministério da Saúde, 2022. Disponível em: https://www.gov.br/aids/pt-br/central-de-conteudo/pcdts/2022/ist/pcdt-ist-2022_isbn-1.pdf/@@display-file/file. Acesso em: 7 jul. 2026.", "BRASIL. Lei nº 8.069, de 13 de julho de 1990. Dispõe sobre o Estatuto da Criança e do Adolescente e dá outras providências. 13. ed. Brasília: Senado Federal, 2017. Disponível em: https://www2.senado.leg.br/bdsf/bitstream/handle/id/534718/eca_1ed.pdf. Acesso em: 9 jul. 2026.", "BRASIL. Ministério da Saúde. Secretaria de Atenção Primária à Saúde. Manual técnico de anticoncepção. Brasília: Ministério da Saúde, 2022. Disponível em: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-sexual-e-reprodutiva/contracepcao. Acesso em: 12 jul. 2026.", "CASTILHO, S. B.; MATTOS, V. G. da S.; PEDROSA, L. G. B. Impactos físicos e emocionais da gestação na adolescência: uma revisão de literatura. Revista Foco, [S. l.], v. 17, n. 5, p. e4934, 2024. Disponível em: https://ojs.focopublicacoes.com.br/foco/article/view/4934. Acesso em: 22 jun. 2026.", "FEDERAÇÃO BRASILEIRA DAS ASSOCIAÇÕES DE GINECOLOGIA E OBSTETRÍCIA (FEBRASGO). Anticoncepção para adolescentes. São Paulo: Connexomm, 2017. (Série Orientações e Recomendações FEBRASGO, n. 9). Disponível em: https://www.febrasgo.org.br/media/k2/attachments/15-ANTICONCEPCAO_PARA_ADOLESCENTES.pdf. Acesso em: 11 jul. 2026.", "FEDERAÇÃO BRASILEIRA DAS ASSOCIAÇÕES DE GINECOLOGIA E OBSTETRÍCIA (FEBRASGO). Anticoncepção hormonal combinada. Femina, [S. l.], v. 53, n. 12, p. 1382-1389, 2025. Disponível em: https://femina.org.br/wp-content/uploads/sites/12/articles_xml/0100-7254-femina-53-12-1382/0100-7254-femina-53-12-1382.pdf. Acesso em: 12 jul. 2026.", "FINOTTI, M. C. C. F. Manual de anticoncepção. São Paulo: Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO), 2015. Disponível em: https://portaldeboaspraticas.iff.fiocruz.br/biblioteca/manual-de-anticoncepcao. Acesso em: 5 jul. 2026.", "GEMELLI, I. F. B.; FARIAS, E. S.; SPRITZER, P. M. Associação da composição corporal e idade da menarca em meninas e adolescentes na Amazônia Brasileira. Jornal de Pediatria, Porto Alegre, v. 96, n. 2, p. 240-246, mar./abr. 2020. Disponível em: https://www.scielo.br/scielo.php?pid=S0021-75572020000200240&script=sci_arttext&tlng=pt. Acesso em: 3 jul. 2026.", "GRABER, E. G. Physical Growth and Sexual Maturation of Adolescents. MSD Manual Professional Edition, [S. l.], jan. 2025. Disponível em: https://www.msdmanuals.com/professional/pediatrics/growth-and-development/physical-growth-and-sexual-maturation-of-adolescents. Acesso em: 3 jul. 2026.", "GUYTON, A. C.; HALL, J. E. Tratado de Fisiologia Médica. 14. ed. Rio de Janeiro: Elsevier, 2021.", "KRISHNA, K. B.; WITCHEL, S. F. Puberdade normal e anormal. In: FEINGOLD, K. R. et al. (ed.). Endotext. South Dartmouth: MDText.com, 2024. Disponível em: https://www.ncbi.nlm.nih.gov/books/NBK279024/#norm-abnorm-puberty.STAGING_OF_PUBERTY. Acesso em: 3 jul. 2026.", "MARSHALL, W. A.; TANNER, J. M. Variations in the pattern of pubertal changes in boys. Archives of Disease in Childhood, [S. l.], v. 45, n. 239, p. 13-23, fev. 1970. Disponível em: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2020414/. Acesso em: 3 jul. 2026.", "ORGANIZAÇÃO MUNDIAL DA SAÚDE. Family planning: a global handbook for providers: evidence-based guidance developed through worldwide collaboration. 4. ed. Genebra: Organização Mundial da Saúde, 2022. Disponível em: https://fphandbook.org/. Acesso em: 7 jul. 2026.", "REZENDE FILHO, Jorge de; MONTENEGRO, Carlos Antonio. Rezende obstetrícia fundamental. 14. ed. Rio de Janeiro: Guanabara Koogan, 2022.", "SARTOR, B. C.; FIORIN, P. B. G.; SULZBACHER, M. M. Infância acelerada: a complexidade da puberdade precoce e a importância do acompanhamento clínico. Revista DELOS, Curitiba, v. 18, n. 74, p. 1-22, 2025. DOI: https://doi.org/10.55905/rdelosv18.n74-044. Disponível em: https://ojs.revistadelos.com/delos/article/view/2347. Acesso em: 20 jun. 2026.", "SOCIEDADE BRASILEIRA DE PEDIATRIA. Departamento Científico de Medicina do Adolescente (gestão 2022-2024). Como reconhecer um ciclo menstrual normal em adolescentes? Rio de Janeiro: Sociedade Brasileira de Pediatria, 2023a. (Guia Prático de Atualização). Disponível em: https://www.sbp.com.br/fileadmin/user_upload/24065c-GPA_-_ComoReconhecer_CicloMenstrual_Nl_em_Adl.pdf. Acesso em: 7 jul. 2026.", "SOCIEDADE BRASILEIRA DE PEDIATRIA. Departamento Científico de Adolescência. Contracepção na adolescência: o que há de novo? Rio de Janeiro: Sociedade Brasileira de Pediatria, 2023b. (Guia Prático de Atualização). Disponível em: https://www.sbp.com.br/fileadmin/user_upload/24200f-GPA_ISBN-_Atualiza_MetodosEfetivos_Contracepcao_Adl.pdf. Acesso em: 1 jul. 2026."] },
  ],
};