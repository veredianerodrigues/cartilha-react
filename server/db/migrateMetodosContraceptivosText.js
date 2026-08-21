import '../loadEnv.js';
import pool from './pool.js';

// Migração da página "metodos-contraceptivos" (12) pro editor rich text.
// Os dois parágrafos de texto corrido viram campo editável; o rótulo
// "Atenção...", o título "Métodos contraceptivos" e a imagem continuam
// fixos no JSX, igual ao padrão do Diu.jsx.
const FIELDS = {
  ciclo_menstrual:
    'Se o óvulo não encontrar um espermatozoide, os níveis dos hormônios progesterona e estrogênio diminuem. Essa queda dos hormônios faz com que o endométrio (camada interna do útero), que havia se preparado para receber uma possível gravidez, se desprenda e seja eliminado através do sangramento menstrual. Assim que a menstruação termina, o corpo recomeça um novo ciclo. Contudo, se a gravidez acontecer, o ciclo menstrual não se completa e segue o desenvolvimento da gestação.<sup data-citation="" data-n="20" class="text-[0.7em] leading-none align-super">20</sup>',
  atencao:
    'Para quem deseja ter relações sexuais, mas não quer engravidar existem diversos métodos <strong>contraceptivos</strong> (ou anticoncepcionais), porém não existe um único método que sirva para todo mundo. Cada organismo é diferente, e alguns métodos podem ter contraindicações dependendo de cada pessoa. Por isso, o recomendado é escolher o que melhor se adapte <strong>às</strong> necessidades e à rotina de cada um. Além disso, independentemente do método, o que garante a menor chance de falha é o seu uso correto e consistente.<sup data-citation="" data-n="19" class="text-[0.7em] leading-none align-super">19</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['metodos-contraceptivos']);
if (!rows[0]) {
  console.error('[migrateMetodosContraceptivosText] seção "metodos-contraceptivos" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa sobras do seed antigo que o MetodosContraceptivos.jsx bespoke não lê
// mais — as imagens ficam (posição fixa no JSX).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateMetodosContraceptivosText] ${Object.keys(FIELDS).length} campos inseridos para "metodos-contraceptivos".`);
await pool.end();
