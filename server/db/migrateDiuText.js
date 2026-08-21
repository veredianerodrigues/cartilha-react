import '../loadEnv.js';
import pool from './pool.js';

// Segundo piloto do editor rich text — primeira página com cards/caixas de
// destaque. Cada campo abaixo tem uma chave de slot (igual a fieldSchemas.js
// no frontend) salva na coluna "heading" do block; Diu.jsx lê pelo nome do
// campo (fields.diu_cobre etc.), não pela ordem — os cards/caixas continuam
// fixos no JSX, só a redação de cada um vem do banco.
const FIELDS = {
  intro_1:
    'Os métodos contraceptivos de longa duração oferecem proteção eficaz contra a gravidez por vários anos, sem a necessidade de uso diário. São opções práticas, seguras e reversíveis, ou seja, a fertilidade pode retornar após sua retirada.',
  intro_2: 'Dentre eles estão o Dispositivo Intrauterino (DIU) e o Implante subdérmico.',
  diu_intro:
    'O DIU é um pequeno objeto em formato de "T" colocado dentro do útero por um <strong>médico ou enfermeiro treinado</strong>. É um método de longa duração, extremamente seguro e muito recomendado para adolescentes por ser prático e não depender de esquecimentos. Existem dois tipos principais:',
  diu_cobre:
    '<strong>DIU de Cobre:</strong> É totalmente gratuito e disponível para qualquer pessoa no SUS. Ele não possui hormônios, não impede a ovulação, mas cria um ambiente que inviabiliza o caminho dos espermatozoides. Tem validade de <strong>10 anos</strong>.',
  diu_hormonal:
    '<strong>DIU Hormonal:</strong> Libera uma quantidade baixa de hormônio diretamente no útero, afinando a parede interna (endométrio) e engrossando o muco do colo do útero para impedir a entrada dos espermatozoides. Tem validade de <strong>5 anos</strong> e está disponível no SUS apenas para casos médicos específicos.',
  importante_ist:
    'Nenhum tipo de DIU protege contra Infecções Sexualmente Transmissíveis (ISTs). Por isso, a camisinha continua sendo recomendada em todas as relações.',
  e_ainda:
    'Quando se orienta adolescentes quanto a métodos contraceptivos, deve-se apresentar todos os disponíveis, inclusive o DIU, pois os benefícios dos métodos intrauterinos extrapolam os riscos.',
  implanon_intro_1:
    'Ele é um bastão bem pequeno e flexível implantado por profissional treinado debaixo da pele do braço. O procedimento é muito rápido e usa anestesia local.',
  implanon_intro_2:
    'Ele impede que o corpo libere o óvulo, deixa o muco do útero grosso (o que bloqueia a entrada dos espermatozoides) e afina a parede interna do útero para evitar a gravidez.',
  implanon_duracao:
    '<strong>Este implante</strong> protege o corpo por <strong>até 3 anos seguidos</strong>. Se você quiser retirar antes desse tempo para engravidar ou mudar de método, pode pedir para tirar a qualquer momento. Para retirar, o profissional faz um corte minúsculo na pele, também com anestesia.<sup data-citation="" data-n="19,23" class="text-[0.7em] leading-none align-super">19,23</sup>',
  implanon_importante:
    'Assim como o DIU, ele fica dentro do corpo <strong>não tem como você esquecer de usar</strong>. Por isso, a chance de falha é quase zero.',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['diu']);
if (!rows[0]) {
  console.error('[migrateDiuText] seção "diu" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa também as sobras do seed antigo (callout/heading/quote_grid) que o
// Diu.jsx bespoke nunca leu — só as imagens ficam (posição fixa no JSX).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateDiuText] ${Object.keys(FIELDS).length} campos inseridos para "diu".`);
await pool.end();
