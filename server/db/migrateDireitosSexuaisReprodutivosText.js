import '../loadEnv.js';
import pool from './pool.js';

// Migração da página "direitos-sexuais-reprodutivos" (18) pro editor rich
// text. Página curta, sem imagens (DireitosSexuaisReprodutivos.jsx não recebe
// prop `images`) — os 4 parágrafos dentro da caixa de destaque viram campo
// editável, igual ao padrão do Diu.jsx. A citação do último parágrafo já vem
// embutida no HTML salvo (sup inline).
const FIELDS = {
  paragrafo_1:
    'As pessoas têm o direito de decidir se desejam ou não uma gestação, em que momento ela deve acontecer e quantos filhos querem ter, para que esse direito seja exercido de forma consciente e responsável é necessário o conhecimento sobre formas e dispositivos existentes com o objetivo de evitar esse evento.',
  paragrafo_2:
    'Como resultado de reivindicações coletivas emergiu à noção de direitos à saúde sexual e reprodutiva, sendo definido como direitos sexuais a "[...] possibilidade de viver e expressar livremente a sexualidade sem violência, discriminações e imposições [...], o direito do sexo seguro para prevenção da gravidez e de doenças sexualmente transmissíveis (DST) e Aids".',
  paragrafo_3:
    'Direitos reprodutivos referem-se à possibilidade "[...] de acesso a informações, meios, métodos e técnicas para ter ou não filhos.',
  paragrafo_4:
    'Nesse sentido, deve ser garantido a todos os sujeitos sociais (adultos, jovens e adolescentes), de forma equitativa os direitos sexuais e reprodutivos, como expressão do acesso integral à saúde.<sup data-citation="" data-n="3" class="text-[0.7em] leading-none align-super">3</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['direitos-sexuais-reprodutivos']);
if (!rows[0]) {
  console.error('[migrateDireitosSexuaisReprodutivosText] seção "direitos-sexuais-reprodutivos" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa sobras do seed antigo (callout/heading avulsos etc.) que o
// DireitosSexuaisReprodutivos.jsx bespoke não lê mais. Sem imagens nesta página.
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateDireitosSexuaisReprodutivosText] ${Object.keys(FIELDS).length} campos inseridos para "direitos-sexuais-reprodutivos".`);
await pool.end();
