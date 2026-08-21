import '../loadEnv.js';
import pool from './pool.js';

// Migração de texto corrido para "tanner-menino" (página 08), mesmo padrão de
// migrateDiuText.js. TannerMenino.jsx lê pelo nome do campo (fields.tanner_intro
// etc.) — o rótulo "Você sabia...", o par de imagens com legenda (recém
// ajustado) e as demais imagens continuam 100% fixos no JSX; só os dois
// parágrafos de texto corrido viram campo editável.
const FIELDS = {
  tanner_intro:
    'A puberdade ocorre em diferentes fases, que refletem o grau de maturidade sexual do adolescente. Para avaliar esse desenvolvimento os médicos britânicos Marshall e Tanner desenvolveram uma classificação conhecida como estágios de Tanner, utilizada até os dias atuais pelos profissionais da saúde. Essa classificação permite acompanhar o desenvolvimento físico durante a puberdade, pois adolescentes da mesma idade podem apresentar diferentes graus de maturação sexual.<sup data-citation="" data-n="18" class="text-[0.7em] leading-none align-super">18</sup>',
  tanner_estagios_meninos:
    'Nos meninos, são avaliados o crescimento da genitália (G) e dos pelos pubianos (P). Cada um deles é dividido em cinco estágios, de 1 a 5. O estágio 1 indica que a puberdade ainda não começou, enquanto o estágio 5 representa o desenvolvimento físico completo. Os estágios 2, 3 e 4 mostram as mudanças que acontecem ao longo da puberdade.<sup data-citation="" data-n="18" class="text-[0.7em] leading-none align-super">18</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['tanner-menino']);
if (!rows[0]) {
  console.error('[migrateTannerMeninoText] seção "tanner-menino" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateTannerMeninoText] ${Object.keys(FIELDS).length} campos inseridos para "tanner-menino".`);
await pool.end();
