import '../loadEnv.js';
import pool from './pool.js';

// Migração de texto corrido para "transformacoes-menina" (página 09), mesmo
// padrão de migrateDiuText.js. TransformacoesMenina.jsx lê pelo nome do campo
// (fields.transformacoes_corpo_menina etc.) — o título, o par de imagens com
// legenda (recém ajustado) e as demais imagens continuam 100% fixos no JSX;
// só os dois parágrafos de texto corrido viram campo editável.
const FIELDS = {
  transformacoes_corpo_menina:
    'Nas meninas, o primeiro sinal visível da puberdade é o surgimento do broto mamário, que corresponde ao início do desenvolvimento das mamas. Esse processo ocorre geralmente entre os 9 e 10 anos, podendo iniciar normalmente entre os 8 e os 13 anos. Em seguida, ou quase ao mesmo tempo, começam a surgir os pelos pubianos e inicia-se o estirão puberal, período em que ocorre o crescimento mais acelerado da altura, cujo pico costuma acontecer entre os 11 e 12 anos. O maior ganho de peso também ocorre, em geral, entre os 12 e 13 anos. Após a menarca (primeira menstruação), o crescimento desacelera progressivamente.<sup data-citation="" data-n="2,15,17" class="text-[0.7em] leading-none align-super">2,15,17</sup>',
  tanner_estagios_meninas:
    'Nas meninas, são observados o crescimento das mamas (M) e dos pelos pubianos (P), classificados em cinco estágios, de 1 a 5. Assim como no caso dos meninos, o estágio 1 corresponde ao período antes do início da puberdade, enquanto o estágio 5 indica que o desenvolvimento físico foi concluído. Os estágios intermediários representam as diferentes mudanças que acontecem durante a puberdade.<sup data-citation="" data-n="17,18" class="text-[0.7em] leading-none align-super">17,18</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['transformacoes-menina']);
if (!rows[0]) {
  console.error('[migrateTransformacoesMeninaText] seção "transformacoes-menina" não encontrada no banco.');
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

console.log(`[migrateTransformacoesMeninaText] ${Object.keys(FIELDS).length} campos inseridos para "transformacoes-menina".`);
await pool.end();
