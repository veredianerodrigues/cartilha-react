import '../loadEnv.js';
import pool from './pool.js';

// Piloto do editor rich text: leva o texto que já estava hardcoded (e validado)
// em Apresentacao.jsx para blocks tipo "paragraph" no banco, na ordem em que
// aparecem na página — negritos e citações convertidos para o HTML que o
// RichTextEditor do /admin também produz (<strong>, <sup data-citation>).
const PARAGRAPHS = [
  'Ao longo da vida o ser humano passa por etapas, marcadas por transformações que constroem seu jeito de ser. Uma dessas etapas é a adolescência, na qual ocorre a passagem da infância para a vida adulta, momento em que mudanças físicas, emocionais e psicológicas são naturais. Nesse período algumas atitudes, decisões e ações podem marcar a vida toda.',
  'Você sabe em qual período da vida acontece a adolescência? Será que você está vivendo esse período? Será que já passou?',
  '<strong>A Organização Mundial da Saúde (OMS)</strong> define a adolescência como o período compreendido <strong>entre 10 e 19 anos de idade</strong>, classificação adotada também pelo <strong>Ministério da Saúde</strong> brasileiro nas políticas e ações voltadas à saúde do adolescente.<sup data-citation="" data-n="24,8" class="text-[0.7em] leading-none align-super">24,8</sup> Entretanto, o <strong>Estatuto da Criança e do Adolescente (ECA)</strong> considera adolescente a pessoa com idade entre <strong>12 e 18 anos incompletos</strong>, podendo, excepcionalmente, aplicar-se às pessoas entre <strong>18 e 21 anos</strong> nos casos expressamente previstos em lei,<sup data-citation="" data-n="7" class="text-[0.7em] leading-none align-super">7</sup> além da idade, os aspectos sociais e psicológicos tem influência sobre esse momento, pois cada pessoa apresenta mudanças corporais, afetivas e de desenvolvimento de acordo com sua história particular, ou seja, cada um no seu tempo, poderá passar por algumas transformações.',
  'Na adolescência, juntamente com as várias transformações surge o despertar da sexualidade, que faz parte do desenvolvimento humano e manifesta-se por sensações e sentimentos. É natural que nesse período aconteça o namoro e a iniciação sexual, no entanto, quando os adolescentes têm dúvidas sobre as transformações do seu corpo, sobre as possíveis consequências da atividade sexual sem proteção, ou de forma precoce e imatura, pode acarretar conflitos e prejuízos com implicações em seus projetos futuros.',
  'Conversar sobre a adolescência, sobre interesses, emoções, namoro e, também informar-se sobre as transformações corporais que acontecem nessa fase é importante para que quando ocorrer o início da vida sexual, seja de forma consciente, responsável e saudável.',
  'Esperamos que as informações a seguir ajudem você...',
];

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['apresentacao']);
if (!rows[0]) {
  console.error('[migratePresentationText] seção "apresentacao" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

await pool.query('DELETE FROM blocks WHERE section_id = $1 AND type = $2', [sectionId, 'paragraph']);

for (const [i, body] of PARAGRAPHS.entries()) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, body) VALUES ($1, $2, 'paragraph', $3)`,
    [sectionId, i, body]
  );
}

console.log(`[migratePresentationText] ${PARAGRAPHS.length} parágrafos inseridos para "apresentacao".`);
await pool.end();
