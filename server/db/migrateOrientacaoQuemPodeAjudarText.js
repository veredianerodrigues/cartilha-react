import '../loadEnv.js';
import pool from './pool.js';

// Migração de texto corrido para "orientacao-quem-pode-ajudar" (página 20),
// mesmo padrão de migrateDiuText.js. OrientacaoQuemPodeAjudar.jsx lê pelo nome
// do campo (fields.fundamental_conversar etc.) — o rótulo "É fundamental…", o
// título e a imagem continuam fixos no JSX; só os dois parágrafos de texto
// corrido viram campo editável.
const FIELDS = {
  fundamental_conversar:
    'Você não precisa passar por isso sozinho, conversar em casa sobre as transformações do corpo, os sentimentos, os medos e as inseguranças é fundamental para atravessar essa fase com mais leveza e segurança.',
  procure_posto_saude:
    'Procure o posto de saúde, as unidades de saúde (os postos de saúde) são o principal ponto de apoio para esse momento. O enfermeiro e a equipe de saúde estão ali para acolher você. Eles oferecem consultas, distribuem e orientam sobre métodos contraceptivos e conversam abertamente sobre direitos sexuais e reprodutivos, garantindo que você tome decisões informadas e seguras sobre o seu futuro.',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['orientacao-quem-pode-ajudar']);
if (!rows[0]) {
  console.error('[migrateOrientacaoQuemPodeAjudarText] seção "orientacao-quem-pode-ajudar" não encontrada no banco.');
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

console.log(`[migrateOrientacaoQuemPodeAjudarText] ${Object.keys(FIELDS).length} campos inseridos para "orientacao-quem-pode-ajudar".`);
await pool.end();
