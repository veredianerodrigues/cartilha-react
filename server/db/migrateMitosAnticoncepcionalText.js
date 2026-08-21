import '../loadEnv.js';
import pool from './pool.js';

// Migração da página "mitos-anticoncepcional" (17) pro editor rich text. O
// texto dos 3 cards de mito/verdade e a lista "Fique por dentro!" viram
// campo editável — a imagem continua fixa no JSX, igual ao padrão do
// Diu.jsx. A citação do último card já vem embutida no HTML salvo. A lista
// vira um <ul> inteiro num campo tipo "paragraph" (não "list"), pra dar pra
// editar com os mesmos botões de rich text do resto (ver RichTextEditor.jsx).
const LIST_ITEM_CLASS = 'font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify';

const FIQUE_POR_DENTRO_ITEMS = [
  'A pílula anticoncepcional não se acumula no organismo.',
  'A pílula deve ser tomada diariamente.',
  'O uso da pílula não causa infertilidade.',
  'A pílula não causa malformações no bebê.',
  'A pílula não aumenta a chance de gravidez gemelar (gêmeos).',
  'A pílula não altera, por si só, o desejo sexual.',
  'A pílula não interrompe uma gravidez já existente.',
];

const fiqueProDentroHtml = `<ul class="list-disc pl-5 space-y-2">${FIQUE_POR_DENTRO_ITEMS.map(
  (text) => `<li class="${LIST_ITEM_CLASS}">${text}</li>`
).join('')}</ul>`;

const FIELDS = {
  mito_1:
    'É verdade que o anticoncepcional engorda? Não exatamente. Estudos científicos mostram que as pílulas anticoncepcionais não causam ganho de gordura. A única exceção importante é a injeção anticoncepcional de três meses, que por ser uma dose mais concentrada, pode causar ganho de peso real (geralmente entre 2 kg e 3 kg).',
  mito_2:
    'O anticoncepcional ajuda a melhorar a acne (espinhas)? Sim, é verdade para os anticoncepcionais hormonais combinados! As pílulas reduzem a oleosidade da pele e do couro cabeludo, ajudando muito a controlar cravos e espinhas.',
  mito_3:
    'Existem outros benefícios além de evitar a gravidez? Com certeza. Além de prevenir a gravidez, a pílula pode trazer outros benefícios, como melhorar a acne, diminuir as cólicas, reduzir o fluxo menstrual, ajudar a manter a menstruação mais regular e aliviar alguns sintomas da TPM, como o inchaço e a irritabilidade. Além disso, seu uso também está associado à redução do risco de alguns tipos de câncer, como o de ovário e o de endométrio.<sup data-citation="" data-n="12,19" class="text-[0.7em] leading-none align-super">12,19</sup>',
  fique_por_dentro_lista: fiqueProDentroHtml,
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['mitos-anticoncepcional']);
if (!rows[0]) {
  console.error('[migrateMitosAnticoncepcionalText] seção "mitos-anticoncepcional" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa sobras do seed antigo (callout/heading avulsos etc.) que o
// MitosAnticoncepcional.jsx bespoke não lê mais — as imagens ficam (posição fixa).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateMitosAnticoncepcionalText] ${Object.keys(FIELDS).length} campos inseridos para "mitos-anticoncepcional".`);
await pool.end();
