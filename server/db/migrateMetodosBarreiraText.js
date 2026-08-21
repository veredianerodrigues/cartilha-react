import '../loadEnv.js';
import pool from './pool.js';

// Migração da página "metodos-barreira" (14) pro editor rich text. Só o
// texto corrido (parágrafos e caixa "Fique ligado!!") vira campo editável —
// os títulos "Preservativo masculino/feminino", os rótulos "Como usar", as
// imagens com os passos de uso (já desenhados nelas) e as citações <Cite/>
// continuam fixos no JSX, igual ao padrão do Diu.jsx.
const FIELDS = {
  intro:
    'Eles recebem esse nome porque criam uma barreira física que impede o espermatozoide de entrar no útero. Esse grupo inclui o diafragma, o capuz cervical, a esponja contraceptiva e os preservativos (camisinha) masculina e feminina.',
  fique_ligado:
    'Os mais utilizados são os preservativos ou camisinha masculina e feminina, e são os únicos métodos que, além de evitar a gravidez, protegem contra as Infecções Sexualmente Transmissíveis <strong>(ISTs)</strong>. Ambas são distribuídas gratuitamente em qualquer unidade de saúde do SUS, sem necessidade de receita médica.',
  masculino_intro:
    'A camisinha masculina é um método contraceptivo de barreira, feito de látex ou outros materiais, que é colocado sobre o pênis ereto para evitar a gravidez e ajudar a prevenir as infecções sexualmente transmissíveis (ISTs).',
  feminino_intro_1:
    'A camisinha feminina também é um método contraceptivo de barreira, distribuído gratuitamente nas Unidades Básicas de Saúde e que não necessita de prescrição médica.',
  feminino_intro_2:
    'É constituído por uma bolsa fina, flexível e resistente, com um anel em cada extremidade.',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['metodos-barreira']);
if (!rows[0]) {
  console.error('[migrateMetodosBarreiraText] seção "metodos-barreira" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa sobras do seed antigo (callout/heading avulsos etc.) que o
// MetodosBarreira.jsx bespoke não lê mais — as imagens ficam (posição fixa).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateMetodosBarreiraText] ${Object.keys(FIELDS).length} campos inseridos para "metodos-barreira".`);
await pool.end();
