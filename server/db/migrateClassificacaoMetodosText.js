import '../loadEnv.js';
import pool from './pool.js';

// Migração da página "classificacao-metodos" (13) pro editor rich text. Os
// parágrafos de texto corrido (intro, a frase que introduz a lista dos cinco
// grupos, e a caixa "Olha só...") viram campo editável. A lista dos cinco
// grupos também virou campo — mas como HTML de <ul> inteiro num campo tipo
// "paragraph" (não um block tipo "list"), pra poder ser editada com os
// mesmos botões de Negrito/Lista do editor rico (o negrito nos rótulos de
// cada item, ex. "Hormonais:", precisa disso). O título continua fixo no JSX.
const LIST_ITEM_CLASS =
  'font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify';

const CINCO_GRUPOS_ITEMS = [
  ['De barreira:', ' como as camisinhas masculina e feminina.'],
  [
    'Métodos de contracepção reversíveis de longa duração (LARC):',
    ' Dispositivo intrauterino (DIU); Implante subdérmico de etonorgestrel (ISE).',
  ],
  ['Hormonais:', ' pílulas, injeções, anel vaginal e adesivos.'],
  ['Definitivos:', ' laqueadura e vasectomia (cirurgias).'],
  [
    'Comportamentais:',
    ' incluem a tabelinha (Ogino-Knaus), o controle da temperatura basal, o exame do muco cervical (Billings), o método sintotérmico e o coito interrompido.',
  ],
];

const cincoGruposHtml = `<ul class="list-disc pl-5 space-y-2">${CINCO_GRUPOS_ITEMS.map(
  ([label, text]) => `<li class="${LIST_ITEM_CLASS}"><strong>${label}</strong>${text}</li>`
).join('')}</ul>`;

const FIELDS = {
  intro:
    'Com a evolução da ciência, existem muitos métodos contraceptivos. Porém, nem todos estão disponíveis no Sistema Único de Saúde (SUS) e nem todos são indicados para adolescentes (como é o caso das cirurgias definitivas).',
  cinco_grupos_intro: 'Quanto à classificação, os métodos anticoncepcionais dividem-se em cinco grupos:',
  cinco_grupos_lista: cincoGruposHtml,
  olha_so:
    'os métodos comportamentais são pouco eficazes durante a adolescência, considerando que nessa fase de desenvolvimento muitas vezes não há regularidade no ciclo menstrual devido a mudanças hormonais, e os definitivos não são indicados para adolescentes — por isso, discutiremos sobre os demais.<sup data-citation="" data-n="9,23" class="text-[0.7em] leading-none align-super">9,23</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['classificacao-metodos']);
if (!rows[0]) {
  console.error('[migrateClassificacaoMetodosText] seção "classificacao-metodos" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa sobras do seed antigo que o ClassificacaoMetodos.jsx bespoke não lê
// mais — não há imagens nesta seção, mas mantemos a mesma cláusula de
// segurança do padrão do Diu.jsx.
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateClassificacaoMetodosText] ${Object.keys(FIELDS).length} campos inseridos para "classificacao-metodos".`);
await pool.end();
