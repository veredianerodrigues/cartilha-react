import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import bcrypt from 'bcryptjs';
import db from './init.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Árvore de seções, espelhando o Sumário original (Page03.jsx): capítulos em
// negrito viram nós de topo, os demais itens viram filhos. O DIU (página 21)
// não tinha entrada própria no sumário antigo (o texto pulava direto de
// "Métodos de Barreira" para "Métodos hormonais") e ganha uma aqui.
const TREE = [
  { slug: 'apresentacao', title: 'Apresentação', pageLabel: '04' },
  {
    slug: 'adolescencia-chegou',
    title: 'A adolescência chegou... e agora?',
    pageLabel: '05',
    children: [
      { slug: 'puberdade', title: 'O que é puberdade?', pageLabel: '05' },
      { slug: 'corpo-humano-periodo', title: 'O que acontece no corpo humano nesse período?', pageLabel: '05' },
      { slug: 'transformacoes-menino', title: 'Que transformações ocorrem no corpo do menino?', pageLabel: '07' },
      {
        slug: 'erecao-ejaculacao',
        title: 'O que é ereção e ejaculação e quando acontece a primeira ejaculação?',
        pageLabel: '08',
      },
      { slug: 'transformacoes-menina', title: 'Que transformações ocorrem no corpo da menina?', pageLabel: '11' },
    ],
  },
  { slug: 'menstruacao', title: 'E a menstruação... o que é e como acontece?', pageLabel: '13' },
  { slug: 'fecundacao', title: 'Sobre a fecundação... o que é fecundação e como acontece?', pageLabel: '16' },
  {
    slug: 'metodos-contraceptivos',
    title: 'Métodos Contraceptivos',
    pageLabel: '17',
    children: [
      {
        slug: 'classificacao-metodos',
        title: 'Como são classificados os métodos contraceptivos? Todos eles são indicados para adolescentes?',
        pageLabel: '18',
      },
      { slug: 'metodos-comportamentais', title: 'Métodos comportamentais', pageLabel: '18' },
      { slug: 'metodos-barreira', title: 'Métodos de Barreira', pageLabel: '19' },
      { slug: 'diu', title: 'Dispositivo Intrauterino (DIU)', pageLabel: '21' },
      { slug: 'metodos-hormonais', title: 'Métodos hormonais', pageLabel: '22' },
      { slug: 'mitos-anticoncepcional', title: 'Mitos relacionados ao anticoncepcional hormonal', pageLabel: '27' },
    ],
  },
  { slug: 'direitos-sexuais-reprodutivos', title: 'Vamos falar sobre direitos sexuais e reprodutivos?', pageLabel: '28' },
  { slug: 'gravidez-adolescencia-mudancas', title: 'Gravidez na adolescência e mudanças', pageLabel: '29' },
  { slug: 'orientacao-quem-pode-ajudar', title: 'Se eu precisar de orientação, quem poderá me ajudar?', pageLabel: '31' },
  { slug: 'referencias', title: 'Referências', pageLabel: '32' },
];

function seedTree() {
  const insertSection = db.prepare(
    `INSERT INTO sections (parent_id, slug, order_index, page_label, title)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET
       parent_id = excluded.parent_id,
       order_index = excluded.order_index,
       page_label = excluded.page_label,
       title = excluded.title`
  );
  const getIdBySlug = db.prepare('SELECT id FROM sections WHERE slug = ?');

  function insertNode(node, parentId, orderIndex) {
    insertSection.run(parentId, node.slug, orderIndex, node.pageLabel, node.title);
    const id = getIdBySlug.get(node.slug).id;
    (node.children || []).forEach((child, i) => insertNode(child, id, i));
    return id;
  }

  TREE.forEach((node, i) => insertNode(node, null, i));
}

function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('ADMIN_EMAIL/ADMIN_PASSWORD não definidos no .env — pulando criação do usuário admin.');
    return;
  }

  const hash = bcrypt.hashSync(password, 10);
  db.prepare(
    `INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
     ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash`
  ).run(email, hash);
}

function clearBlocks(slug) {
  const section = db.prepare('SELECT id FROM sections WHERE slug = ?').get(slug);
  db.prepare('DELETE FROM blocks WHERE section_id = ?').run(section.id);
  return section.id;
}

function insertBlocks(slug, blocks) {
  const sectionId = clearBlocks(slug);
  const insert = db.prepare(
    `INSERT INTO blocks (section_id, order_index, type, heading, body, items_json, image_url, image_caption)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  blocks.forEach((b, i) => {
    insert.run(
      sectionId,
      i,
      b.type,
      b.heading ?? null,
      b.body ?? null,
      b.items ? JSON.stringify(b.items) : null,
      b.imageUrl ?? null,
      b.imageCaption ?? null
    );
  });
}

function copyPilotImage() {
  const src = path.join(__dirname, '..', '..', 'src', 'assets', 'page16', 'diagram.png');
  const destDir = path.join(__dirname, '..', 'uploads');
  const dest = path.join(destDir, 'fecundacao-diagrama.png');
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
}

function seedPilotContent() {
  copyPilotImage();

  insertBlocks('fecundacao', [
    {
      type: 'paragraph',
      body: 'A fecundação é o encontro do espermatozoide e do óvulo. Esse momento único marca o início da gestação e de um novo ser. Para que a fecundação aconteça, o corpo passa por uma sequência precisa de eventos:',
    },
    {
      type: 'image',
      imageUrl: '/uploads/fecundacao-diagrama.png',
      imageCaption: 'Fonte: Elaborada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), com base em WHO (2022); Krishna; Witchel (2024).',
    },
    {
      type: 'quote_grid',
      items: [
        'Durante uma relação sexual desprotegida (sem o uso de um método contraceptivo), os espermatozoides presentes no sêmen são liberados dentro da vagina.',
        'Através dos movimentos de suas próprias caudas e contando com a ajuda das contrações naturais do útero, os espermatozoides sobem pelo aparelho genital feminino.',
        'Enquanto isso, o óvulo, que foi liberado pelo ovário na ovulação, é direcionado para a tuba uterina, onde fica aguardando.',
        'É exatamente ali, na tuba uterina, que os espermatozoides encontram o óvulo. Apenas um deles conseguirá romper a barreira do óvulo e entrar, completando a fecundação.',
      ],
    },
    { type: 'paragraph', body: '(WHO, 2022)' },
  ]);

  insertBlocks('diu', [
    {
      type: 'paragraph',
      body: 'Os métodos contraceptivos de longa duração oferecem proteção eficaz contra a gravidez por vários anos, sem a necessidade de uso diário. São opções práticas, seguras e reversíveis, ou seja, a fertilidade pode retornar após sua retirada.',
    },
    {
      type: 'paragraph',
      body: 'Dentre eles estão o Dispositivo Intrauterino (DIU) e o Implante subdérmico. O DIU é um pequeno objeto em formato de "T" colocado dentro do útero por um médico ou enfermeiro treinado. É um método de longa duração, extremamente seguro e muito recomendado para adolescentes por ser prático e não depender de esquecimentos. Existem dois tipos principais:',
    },
    {
      type: 'quote_grid',
      items: [
        'DIU de Cobre: É totalmente gratuito e disponível para qualquer pessoa no SUS. Ele não possui hormônios, não impede a ovulação, mas cria um ambiente que inviabiliza o caminho dos espermatozoides. Tem validade de 10 anos.',
        'DIU Hormonal: Libera uma quantidade baixa de hormônio diretamente no útero, afinando a parede interna (endométrio) e engrossando o muco do colo do útero para impedir a entrada dos espermatozoides. Tem validade de 5 anos e está disponível no SUS apenas para casos médicos específicos.',
      ],
    },
    {
      type: 'callout',
      heading: 'Importante!',
      body: 'Nenhum tipo de DIU protege contra Infecções Sexualmente Transmissíveis (ISTs). Por isso, o uso da camisinha continua sendo obrigatório em todas as relações.',
    },
    {
      type: 'callout',
      heading: 'E ainda!',
      body: 'Quando se orienta adolescentes quanto a métodos contraceptivos, deve-se apresentar todos os disponíveis, inclusive o DIU, pois os benefícios dos métodos intrauterinos extrapolam os riscos.',
    },
    {
      type: 'heading',
      heading: 'O implante de etonorgestrel (ISE), conhecido comercialmente no Brasil como Implanon®',
    },
    {
      type: 'paragraph',
      body: 'Ele é um bastão bem pequeno e flexível implantado por profissional treinado debaixo da pele do braço. O procedimento é muito rápido e usa anestesia local. Ele impede que o corpo libere o óvulo, deixa o muco do útero grosso (o que bloqueia a entrada dos espermatozoides) e afina a parede interna do útero para evitar a gravidez. Este implante protege o corpo por até 3 anos seguidos. Se você quiser retirar antes desse tempo para engravidar ou mudar de método, pode pedir para tirar a qualquer momento. Para retirar, o profissional faz um corte minúsculo na pele, também com anestesia.',
    },
    {
      type: 'callout',
      heading: 'Importante:',
      body: 'Assim como o DIU, ele fica dentro do corpo, não tem como você esquecer de usar. Por isso, a chance de falha é quase zero.',
    },
    {
      type: 'paragraph',
      body: 'SBP (2023b); WHO (2022). Fonte: Elaborado pela autora com auxílio do ChatGPT (OpenAI), 2026.',
    },
  ]);

  insertBlocks('referencias', [
    {
      type: 'list',
      items: [
        'ALVES, T. V.; BEZERRA, M. M. M. Principais alterações fisiológicas e psicológicas durante o período gestacional. Rev. Mult. Psic., Jaboatão dos Guararapes, v. 14, n. 49, p. 114-126, fev. 2020. Disponível em: https://idonline.emnuvens.com.br/id/article/view/2324/3608#. Acesso em: 06 jun. 2026.',
        'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Ações Programáticas Estratégicas. Diretrizes nacionais para a atenção integral à saúde de adolescentes e jovens na promoção, proteção e recuperação da saúde. Brasília: Ministério da Saúde, 2010. Disponível em: http://bvsms.saude.gov.br/bvs/publicacoes/diretrizes_nacionais_atencao_saude_adolescentes_jovens_promocao_saude.pdf. Acesso em: 9 jul. 2026.',
        'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Ações Programáticas Estratégicas. Caderneta de saúde do adolescente: menino. Brasília: Ministério da Saúde, 2012a. Disponível em: https://saude.rs.gov.br/upload/arquivos/carga20190754/10135428-caderneta-saude-adolescente-menino.pdf. Acesso em: 1 jul. 2026.',
        'BRASIL. Ministério da Saúde. Secretaria de Atenção à Saúde. Departamento de Ações Programáticas Estratégicas. Caderneta de saúde do adolescente: menina. Brasília: Ministério da Saúde, 2012b. Disponível em: https://saude.rs.gov.br/upload/arquivos/carga20190755/10135513-caderneta-saude-adolescente-menina.pdf. Acesso em: 1 jul. 2026.',
        'BRASIL. Ministério da Saúde. Protocolo clínico e diretrizes terapêuticas para atenção integral às pessoas com infecções sexualmente transmissíveis (IST). Brasília: Ministério da Saúde, 2022. Disponível em: https://www.gov.br/aids/pt-br/central-de-conteudo/pcdts/2022/ist/pcdt-ist-2022_isbn-1.pdf/@@display-file/file. Acesso em: 7 jul. 2026.',
        'BRASIL. Lei nº 8.069, de 13 de julho de 1990. Dispõe sobre o Estatuto da Criança e do Adolescente e dá outras providências. 13. ed. Brasília: Senado Federal, 2017. Disponível em: https://www2.senado.leg.br/bdsf/bitstream/handle/id/534718/eca_1ed.pdf. Acesso em: 9 jul. 2026.',
        'BRASIL. Ministério da Saúde. Secretaria de Atenção Primária à Saúde. Manual técnico de anticoncepção. Brasília: Ministério da Saúde, 2022. Disponível em: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher/saude-sexual-e-reprodutiva/contracepcao. Acesso em: 12 jul. 2026.',
        'CASTILHO, S. B.; MATTOS, V. G. da S.; PEDROSA, L. G. B. Impactos físicos e emocionais da gestação na adolescência: uma revisão de literatura. Revista Foco, [S. l.], v. 17, n. 5, p. e4934, 2024. Disponível em: https://ojs.focopublicacoes.com.br/foco/article/view/4934. Acesso em: 22 jun. 2026.',
        'FEDERAÇÃO BRASILEIRA DAS ASSOCIAÇÕES DE GINECOLOGIA E OBSTETRÍCIA (FEBRASGO). Anticoncepção para adolescentes. São Paulo: Connexomm, 2017. (Série Orientações e Recomendações FEBRASGO, n. 9). Disponível em: https://www.febrasgo.org.br/media/k2/attachments/15-ANTICONCEPCAO_PARA_ADOLESCENTES.pdf. Acesso em: 11 jul. 2026.',
        'FEDERAÇÃO BRASILEIRA DAS ASSOCIAÇÕES DE GINECOLOGIA E OBSTETRÍCIA (FEBRASGO). Anticoncepção hormonal combinada. Femina, [S. l.], v. 53, n. 12, p. 1382-1389, 2025. Disponível em: https://femina.org.br/wp-content/uploads/sites/12/articles_xml/0100-7254-femina-53-12-1382/0100-7254-femina-53-12-1382.pdf. Acesso em: 12 jul. 2026.',
        'FINOTTI, M. C. C. F. Manual de anticoncepção. São Paulo: Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO), 2015. Disponível em: https://portaldeboaspraticas.iff.fiocruz.br/biblioteca/manual-de-anticoncepcao. Acesso em: 5 jul. 2026.',
        'GEMELLI, I. F. B.; FARIAS, E. S.; SPRITZER, P. M. Associação da composição corporal e idade da menarca em meninas e adolescentes na Amazônia Brasileira. Jornal de Pediatria, Porto Alegre, v. 96, n. 2, p. 240-246, mar./abr. 2020. Disponível em: https://www.scielo.br/scielo.php?pid=S0021-75572020000200240&script=sci_arttext&tlng=pt. Acesso em: 3 jul. 2026.',
        'GRABER, E. G. Physical Growth and Sexual Maturation of Adolescents. MSD Manual Professional Edition, [S. l.], jan. 2025. Disponível em: https://www.msdmanuals.com/professional/pediatrics/growth-and-development/physical-growth-and-sexual-maturation-of-adolescents. Acesso em: 3 jul. 2026.',
        'GUYTON, A. C.; HALL, J. E. Tratado de Fisiologia Médica. 14. ed. Rio de Janeiro: Elsevier, 2021.',
        'KRISHNA, K. B.; WITCHEL, S. F. Puberdade normal e anormal. In: FEINGOLD, K. R. et al. (ed.). Endotext. South Dartmouth: MDText.com, 2024. Disponível em: https://www.ncbi.nlm.nih.gov/books/NBK279024/#norm-abnorm-puberty.STAGING_OF_PUBERTY. Acesso em: 3 jul. 2026.',
        'MARSHALL, W. A.; TANNER, J. M. Variations in the pattern of pubertal changes in boys. Archives of Disease in Childhood, [S. l.], v. 45, n. 239, p. 13-23, fev. 1970. Disponível em: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2020414/. Acesso em: 3 jul. 2026.',
        'ORGANIZAÇÃO MUNDIAL DA SAÚDE. Family planning: a global handbook for providers: evidence-based guidance developed through worldwide collaboration. 4. ed. Genebra: Organização Mundial da Saúde, 2022. Disponível em: https://fphandbook.org/. Acesso em: 7 jul. 2026.',
        'REZENDE FILHO, Jorge de; MONTENEGRO, Carlos Antonio. Rezende obstetrícia fundamental. 14. ed. Rio de Janeiro: Guanabara Koogan, 2022.',
        'SARTOR, B. C.; FIORIN, P. B. G.; SULZBACHER, M. M. Infância acelerada: a complexidade da puberdade precoce e a importância do acompanhamento clínico. Revista DELOS, Curitiba, v. 18, n. 74, p. 1-22, 2025. DOI: https://doi.org/10.55905/rdelosv18.n74-044. Disponível em: https://ojs.revistadelos.com/delos/article/view/2347. Acesso em: 20 jun. 2026.',
      ],
    },
  ]);
}

seedTree();
seedAdmin();
seedPilotContent();

console.log('Seed concluído: árvore de seções + 3 seções-piloto (fecundação, DIU, referências).');
