import '../loadEnv.js';
import pool from './pool.js';

// Terceiro piloto do editor rich text — mesmo padrão de migrateDiuText.js.
// Cada campo abaixo tem uma chave de slot (igual a fieldSchemas.js no
// frontend) salva na coluna "heading" do block; Menstruacao.jsx lê pelo nome
// do campo (fields.ciclo_intro etc.), não pela ordem — os cards, a lista de
// imagens e os rótulos em negrito (ex. "Fique atenta...") continuam fixos no
// JSX, só a redação corrida vem do banco.
const FIELDS = {
  menarca_definicao:
    'O amadurecimento dos órgãos reprodutores leva ao início da menstruação, chamada menarca. A menarca representa uma importante etapa do desenvolvimento reprodutivo feminino e ocorre, em média, por volta dos 12 anos, podendo acontecer normalmente entre os 9 e os 15 anos. Ela indica que o organismo está adquirindo capacidade reprodutiva.<sup data-citation="" data-n="11,20" class="text-[0.7em] leading-none align-super">11,20</sup>',
  ciclo_intro:
    'O ciclo menstrual corresponde ao período entre o primeiro dia de uma menstruação e o primeiro dia da seguinte. Durante esse ciclo, os hormônios estimulam o amadurecimento do óvulo e sua liberação pelo ovário (ovulação). Após a ovulação, a progesterona prepara o útero para uma possível gravidez.',
  ciclo_sem_fecundacao:
    'Caso a fecundação não ocorra, seja por não ter praticado relação sexual ou por ter usado um método contraceptivo, como a camisinha, os níveis desses hormônios baixam, provocando a descamação do endométrio (camada interna do útero), que é eliminada pela vagina na forma de sangue, caracterizando a menstruação.',
  fluxo_duracao:
    'O fluxo menstrual costuma durar de 3 a 7 dias. Nos primeiros anos após a menarca, é comum que o ciclo menstrual varie entre 21 e 45 dias. Com o amadurecimento do organismo, tende a se tornar mais regular, variando geralmente entre 21 e 35 dias.<sup data-citation="" data-n="20,22" class="text-[0.7em] leading-none align-super">20,22</sup>',
  fique_atenta_texto:
    'Nos primeiros anos após a menarca, é comum que o ciclo menstrual seja irregular, pois o organismo ainda está amadurecendo.',
  voce_sabia_texto:
    'A precocidade ou atraso na ocorrência da menarca são influenciados por diversos fatores como a hereditariedade, fatores nutricionais, físicos, emocionais, exercício, gordura corporal e contexto social.<sup data-citation="" data-n="14" class="text-[0.7em] leading-none align-super">14</sup>',
  engravidar_antes_menarca:
    'na adolescência, <strong>é possível engravidar antes mesmo da primeira menstruação</strong>. Por outro lado, também é comum que os primeiros ciclos menstruais sejam <strong>anovulatórios</strong> (ou seja, sem a liberação de um óvulo). Isso acontece porque o corpo ainda está passando por um amadurecimento hormonal e pode não produzir os picos de hormônios necessários para a ovulação. Por conta dessa imaturidade fisiológica natural da idade, a jovem pode apresentar ciclos irregulares e sangramentos inesperados, situações que fazem parte do ajuste normal do organismo nessa fase.<sup data-citation="" data-n="22" class="text-[0.7em] leading-none align-super">22</sup>',
  registro_calendario:
    'que a adolescente registre em um calendário as datas dos ciclos, ou seja: “[...] a cada mês, o dia que inicia e o dia que termina o sangramento. Por exemplo: começou no dia 13 de janeiro e terminou no dia 17 [...]”.<sup data-citation="" data-n="5" class="text-[0.7em] leading-none align-super">5</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['menstruacao']);
if (!rows[0]) {
  console.error('[migrateMenstruacaoText] seção "menstruacao" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa as sobras do seed antigo (callout/heading/quote_grid) que o
// Menstruacao.jsx bespoke nunca leu — só as imagens ficam (posição fixa no JSX).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateMenstruacaoText] ${Object.keys(FIELDS).length} campos inseridos para "menstruacao".`);
await pool.end();
