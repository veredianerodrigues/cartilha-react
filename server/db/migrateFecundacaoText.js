import '../loadEnv.js';
import pool from './pool.js';

// Mesmo padrão de migrateDiuText.js. Cada campo abaixo tem uma chave de slot
// (igual a fieldSchemas.js no frontend) salva na coluna "heading" do block;
// Fecundacao.jsx lê pelo nome do campo (fields.fecundacao_intro etc.) — a
// imagem do diagrama continua fixa no JSX, só a redação corrida vem do banco.
const FIELDS = {
  fecundacao_intro:
    'A <strong>fecundação</strong> é o encontro do espermatozoide e do óvulo. Esse momento único marca o início da gestação e de um novo ser.',
  sequencia_intro: 'Para que a fecundação aconteça, o corpo passa por uma sequência precisa de eventos:',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['fecundacao']);
if (!rows[0]) {
  console.error('[migrateFecundacaoText] seção "fecundacao" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa as sobras do seed antigo (callout/heading/quote_grid) que o
// Fecundacao.jsx bespoke nunca leu — só as imagens ficam (posição fixa no JSX).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateFecundacaoText] ${Object.keys(FIELDS).length} campos inseridos para "fecundacao".`);
await pool.end();
