import '../loadEnv.js';
import pool from './pool.js';

// Migração da página "gravidez-adolescencia-mudancas" (19) pro editor rich
// text. O texto introdutório e o texto dos 4 cards de trimestre viram campo
// editável — os rótulos dos cards ("1º Trimestre" etc.) e as imagens
// continuam fixos no JSX, igual ao padrão do Diu.jsx. As citações já vêm
// embutidas no HTML salvo (sup inline).
const FIELDS = {
  intro_fecundacao:
    'Após a fecundação, o corpo feminino passa por uma série de transformações fisiológicas. Cada mulher percebe essas mudanças de maneira única, o que pode gerar sentimentos de vulnerabilidade física e emocional durante a gestação.<sup data-citation="" data-n="1" class="text-[0.7em] leading-none align-super">1</sup>',
  intro_fases_periodo: 'Essas fases são divididas em períodos marcantes:',
  trimestre_1:
    'É marcado por intensas transformações hormonais para sustentar a gravidez. Surgem sintomas como a interrupção da menstruação, mudanças no sono e no apetite, aumento das mamas e do volume de sangue, além de enjoos e vômitos.',
  trimestre_2:
    'É uma fase de adaptação mais confortável. O útero cresce visivelmente, a mãe começa a sentir os movimentos do bebê e o peito inicia a produção do colostro (o primeiro leite).',
  trimestre_3:
    'O bebê cresce de forma acelerada. O tamanho do útero passa a pressionar os outros órgãos da mãe, o que costuma causar desconfortos como dor nas costas (lombar), falta de ar, azia e refluxo.',
  trimestre_puerperio:
    'Após o nascimento do bebê, o corpo entra em um período de recuperação física profunda, marcado pelo início de novas experiências desafiadoras e afetuosas, como a amamentação.<sup data-citation="" data-n="10" class="text-[0.7em] leading-none align-super">10</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['gravidez-adolescencia-mudancas']);
if (!rows[0]) {
  console.error('[migrateGravidezAdolescenciaMudancasText] seção "gravidez-adolescencia-mudancas" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa sobras do seed antigo (callout/heading avulsos etc.) que o
// GravidezAdolescenciaMudancas.jsx bespoke não lê mais — as imagens ficam (posição fixa).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateGravidezAdolescenciaMudancasText] ${Object.keys(FIELDS).length} campos inseridos para "gravidez-adolescencia-mudancas".`);
await pool.end();
