import '../loadEnv.js';
import pool from './pool.js';

// Migração de texto corrido para "transformacoes-menino" (página 06), mesmo
// padrão de migrateDiuText.js. TransformacoesMenino.jsx lê pelo nome do campo
// (fields.estirao_crescimento etc.) — a imagem e o título continuam fixos no
// JSX, só os parágrafos do HighlightCard viram campo editável.
const FIELDS = {
  estirao_crescimento:
    'Nos meninos, a puberdade é marcada por diversas transformações físicas. Uma das mais evidentes é o estirão de crescimento, período em que ocorre um aumento acelerado da altura, com crescimento médio de 8-9 cm/ano. Esse crescimento costuma atingir sua velocidade máxima entre os 13 e 14 anos e desacelera progressivamente até o final da adolescência. O maior ganho de peso também ocorre, em geral, por volta dos 14 anos.',
  puberdade_sinais:
    'O primeiro sinal da puberdade masculina é o aumento do volume dos testículos, que geralmente ocorre entre 10 e 11 anos. Em seguida, acontece o crescimento do pênis e o surgimento dos pelos pubianos. Correspondente ao período de 12 e 14 anos, começam a aparecer os pelos nas axilas, no rosto e em outras regiões do corpo. Nessa fase, também aumenta a atividade das glândulas sudoríparas, o que favorece o suor e o odor corporal característicos da adolescência. É ainda durante esse período que as ereções espontâneas se tornam mais frequentes e ocorre a espermarca (primeira ejaculação).<sup data-citation="" data-n="2,15,17" class="text-[0.7em] leading-none align-super">2,15,17</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['transformacoes-menino']);
if (!rows[0]) {
  console.error('[migrateTransformacoesMeninoText] seção "transformacoes-menino" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa sobras do seed antigo (callout/heading/quote_grid) que o componente
// bespoke nunca leu — só as imagens ficam (posição fixa no JSX).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateTransformacoesMeninoText] ${Object.keys(FIELDS).length} campos inseridos para "transformacoes-menino".`);
await pool.end();
