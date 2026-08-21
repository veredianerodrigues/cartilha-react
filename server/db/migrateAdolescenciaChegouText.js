import '../loadEnv.js';
import pool from './pool.js';

// Migração da página "adolescencia-chegou" (05) pro editor rich text. Os 4
// blocos de texto corrido (2 PubertyIntroRow + 2 Paragraph) viram campo
// editável — os títulos/rótulos ("O Que é Puberdade?", "E tem mais...",
// "Portanto ...") e as imagens continuam fixos no JSX, igual ao padrão do
// Diu.jsx. As citações já vêm embutidas no HTML salvo (sup inline).
const FIELDS = {
  puberdade_definicao:
    'A puberdade é uma fase natural do desenvolvimento em que o corpo passa por mudanças físicas e hormonais, tornando-se capaz de se reproduzir. Ela ocorre entre os 8 e 13 anos nas meninas, e entre os 9 e 14 anos nos meninos, durando cerca de 3 a 4 anos. É o momento em que o corpo começa a se preparar para a vida adulta.<sup data-citation="" data-n="10,21" class="text-[0.7em] leading-none align-super">10,21</sup>',
  puberdade_hormonios:
    'O comando para as transformações presentes na adolescência começa no cérebro. Uma glândula chamada hipófise libera dois hormônios: o LH (luteinizante) e o FSH (folículo-estimulante). Eles viajam pelo sangue e estimulam os órgãos sexuais. Nos meninos, os testículos passam a produzir testosterona (responsável pela voz mais grossa, pelos e desenvolvimento físico) e a produzir os espermatozoides. Nas meninas, os ovários passam a produzir estrogênio (estradiol) e progesterona, hormônios que atuam no amadurecimento dos óvulos e controlam o ciclo menstrual.<sup data-citation="" data-n="8,17" class="text-[0.7em] leading-none align-super">8,17</sup>',
  puberdade_caracteres_sexuais:
    'Os caracteres sexuais primários correspondem aos órgãos do sistema reprodutor presentes desde o nascimento. Nas meninas, incluem os ovários, as tubas uterinas, o útero, a vagina e a vulva. Nos meninos, compreendem os testículos, o pênis, o escroto, as vesículas seminais e a próstata. Durante a puberdade, esses órgãos amadurecem e ocorre o desenvolvimento dos caracteres sexuais secundários. Nas meninas, destacam-se o desenvolvimento das mamas, o aparecimento dos pelos pubianos e axilares e o alargamento do quadril. Nos meninos, ocorre o aumento do volume dos testículos e do pênis, o aparecimento de pelos faciais, corporais, axilares e pubianos, o aumento da massa muscular e a mudança da voz.<sup data-citation="" data-n="17,22" class="text-[0.7em] leading-none align-super">17,22</sup>',
  puberdade_conclusao:
    'é importante entender a puberdade como um período relevante de transição e transformações físicas, fisiológicas e emocionais da vida de meninas e meninos, destacando que nesse momento o corpo do adolescente ganha algumas novas funcionalidades, principalmente no campo da sexualidade.',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['adolescencia-chegou']);
if (!rows[0]) {
  console.error('[migrateAdolescenciaChegouText] seção "adolescencia-chegou" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa sobras do seed antigo (callout/heading avulsos etc.) que o
// AdolescenciaChegou.jsx bespoke não lê mais — as imagens ficam (posição fixa).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateAdolescenciaChegouText] ${Object.keys(FIELDS).length} campos inseridos para "adolescencia-chegou".`);
await pool.end();
