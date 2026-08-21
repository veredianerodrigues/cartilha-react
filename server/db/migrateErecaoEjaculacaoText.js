import '../loadEnv.js';
import pool from './pool.js';

// Migração de texto corrido para "erecao-ejaculacao" (página 07), mesmo
// padrão de migrateDiuText.js. ErecaoEjaculacao.jsx lê pelo nome do campo
// (fields.erecao_ejaculacao_definicao etc.) — a imagem e o título continuam
// fixos no JSX, só os parágrafos do TextCard viram campo editável.
const FIELDS = {
  erecao_ejaculacao_definicao:
    'A ereção é o enrijecimento do pênis causado pelo aumento do fluxo de sangue nessa região. Na adolescência, ela pode ocorrer em resposta ao desejo sexual, mas também é comum acontecer de forma espontânea e involuntária, como parte do desenvolvimento normal do organismo. Já a ejaculação é a saída do sêmen pelo pênis. O sêmen é um líquido esbranquiçado que tem a função de nutrir e transportar os espermatozoides.',
  espermarca_explicacao:
    'Como mencionado, a primeira ejaculação do menino é chamada de espermarca e geralmente ocorre por volta dos 13 anos, embora possa acontecer em idades diferentes. Ela pode ocorrer durante o sono, em um fenômeno normal conhecido como polução noturna, ou em outras situações. A espermarca representa um importante marco da puberdade e indica que o sistema reprodutor masculino está amadurecendo e adquirindo capacidade reprodutiva.<sup data-citation="" data-n="15,17,19" class="text-[0.7em] leading-none align-super">15,17,19</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['erecao-ejaculacao']);
if (!rows[0]) {
  console.error('[migrateErecaoEjaculacaoText] seção "erecao-ejaculacao" não encontrada no banco.');
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

console.log(`[migrateErecaoEjaculacaoText] ${Object.keys(FIELDS).length} campos inseridos para "erecao-ejaculacao".`);
await pool.end();
