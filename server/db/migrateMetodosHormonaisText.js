import '../loadEnv.js';
import pool from './pool.js';

// Terceiro piloto do editor rich text — a página mais longa da cartilha
// (pílula, injetável, anel vaginal, adesivo, pílula do dia seguinte). Cada
// campo abaixo tem uma chave de slot (igual a fieldSchemas.js no frontend)
// salva na coluna "heading" do block; MetodosHormonais.jsx lê pelo nome do
// campo (fields.pilula_como_funciona etc.), não pela ordem. Os subtítulos
// ('h') e imagens ('img') continuam 100% hardcoded no JSX. Os parágrafos
// ('p'), caixas de destaque ('c') e listas ('ul') viraram campos de banco —
// as listas como <ul> inteiro num campo tipo "paragraph" (não "list"), pra
// dar pra editar com os botões de rich text (ver RichTextEditor.jsx).
const LIST_ITEM_CLASS = 'font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify';
const listHtml = (items) =>
  `<ul class="list-disc pl-5 space-y-2">${items.map((text) => `<li class="${LIST_ITEM_CLASS}">${text}</li>`).join('')}</ul>`;

const FIELDS = {
  intro_liberdade:
    'Os anticoncepcionais trouxeram liberdade para as mulheres, porque permitem que elas planejem com segurança se e quando querem engravidar.',
  intro_ahc_combinados:
    'A maioria desses métodos são chamados de Anticoncepcionais Hormonais Combinados (AHC) porque juntam dois hormônios: o estrogênio e a progesterona.',
  pilula_como_funciona:
    'A progesterona age fazendo com que o corpo não libere nenhum óvulo (um processo chamado de anovulação). Sem um óvulo disponível, o espermatozoide não tem quem fecundar e a gravidez simplesmente não acontece.',
  pilula_formas_administracao:
    'Esses hormônios podem ser colocados no corpo de várias formas (como adesivos na pele, comprimidos ou injeções), mas o formato mais conhecido e utilizado no Brasil e no mundo é a chamada pílula anticoncepcional.',
  pilula_nao_protege_ist:
    'A pílula não protege contra Infecções Sexualmente Transmissíveis (ISTs). Para se proteger delas, o único método indicado é o uso da camisinha (masculina ou feminina) em todas as relações.',
  pilula_duas_regras_intro: 'Para o sucesso da pílula, duas regras são fundamentais:',
  pilula_reversivel_lista: listHtml([
    'Ela é um método reversível: isso significa que, se a mulher parar de tomar, o corpo volta a ovular normalmente e ela pode engravidar.',
  ]),
  pilula_regras_lista: listHtml([
    'Zero esquecimentos: ela precisa ser tomada todos os dias, de preferência rigorosamente no mesmo horário.',
    'Cuidado com outros remédios: alguns medicamentos podem cortar ou diminuir o efeito da pílula no organismo. Por isso, sempre avise ao médico ou dentista que você toma pílula antes de começar qualquer tratamento.<sup data-citation="" data-n="12,23" class="text-[0.7em] leading-none align-super">12,23</sup>',
  ]),
  pilula_como_usar_lista: listHtml([
    'Primeira vez de uso: se a pílula for iniciada até o 5º dia da menstruação, a proteção contra a gravidez é imediata. Se for iniciada após esse período, ela também pode ser usada, desde que não haja gravidez, mas será necessário utilizar camisinha ou evitar relações sexuais durante os primeiros 7 dias.',
    'Troca de outro método hormonal: Se você já usava outro anticoncepcional hormonal (como injeção, adesivo, anel ou outra pílula) corretamente e não há risco de gravidez, a nova pílula pode ser iniciada imediatamente, sem precisar esperar a próxima menstruação e sem necessidade de usar preservativo como proteção.',
    'Troca do anticoncepcional injetável: a pílula pode ser iniciada na data em que seria aplicada a próxima injeção, sem necessidade de utilizar um método de apoio.',
    'Após usar a pílula do dia seguinte: a pílula anticoncepcional pode ser iniciada imediatamente, sem esperar a próxima menstruação. Quem já utilizava a pílula deve continuar a cartela normalmente. É necessário usar camisinha ou evitar relações sexuais durante os primeiros 7 dias.<sup data-citation="" data-n="19" class="text-[0.7em] leading-none align-super">19</sup>',
  ]),
  injetavel_intro:
    'O anticoncepcional injetável é um método contraceptivo prático e eficaz para quem prefere não precisar tomar um comprimido todos os dias. Existem dois tipos: o mensal e o trimestral. A aplicação é feita por um profissional de saúde, geralmente no músculo do braço ou do glúteo, e ambas são fornecidas pelo SUS.',
  injetavel_primeira_aplicacao:
    'Primeira aplicação: a injeção anticoncepcional pode ser iniciada nos primeiros 7 dias da menstruação, com proteção imediata contra a gravidez. Também pode ser iniciada em outros momentos, desde que haja certeza de que não existe gravidez.<sup data-citation="" data-n="23" class="text-[0.7em] leading-none align-super">23</sup>',
  injetavel_como_usar_lista: listHtml([
    'Primeira dose: recomenda-se que seja aplicada nos primeiros sete dias da menstruação. Nessa situação, a proteção contra a gravidez é imediata.',
    'Se a aplicação ocorrer após esse período: a injeção pode ser iniciada desde que haja certeza de que não existe gravidez. Nesse caso, recomenda-se utilizar preservativo ou evitar relações sexuais durante os primeiros sete dias, até que o método atinja sua eficácia contraceptiva.<sup data-citation="" data-n="19,23" class="text-[0.7em] leading-none align-super">19,23</sup>',
  ]),
  injetavel_atencao_troca:
    'Quando as mulheres utilizam anticoncepcionais injetáveis trimestrais, implante hormonal ou DIU hormonal e desejam fazer a troca por pílulas anticoncepcionais, devem iniciar a cartela imediatamente após o término da validade do método usado anteriormente.',
  injetavel_atencao_intervalo:
    'Com relação ao intervalo entre as cartelas, alguns contraceptivos preveem pausas de quatro a sete dias e algumas formulações não preveem pausas.<sup data-citation="" data-n="12,23" class="text-[0.7em] leading-none align-super">12,23</sup>',
  pilula_importante_esquecimento:
    'Os comprimidos devem ser ingeridos diariamente e preferencialmente no mesmo horário. O esquecimento do uso implica em falha contraceptiva; nesse caso, recomenda-se o uso de método contraceptivo adicional, como preservativos.<sup data-citation="" data-n="12,23" class="text-[0.7em] leading-none align-super">12,23</sup>',
  outros_dispositivos_intro: 'Também... Existem outros dispositivos hormonais, são eles:',
  anel_descricao:
    'É um anel de plástico bem flexível e macio que libera hormônios no corpo, impedindo a ovulação.',
  anel_como_usar:
    'Como usar: você mesma coloca e retira o anel de dentro da vagina. Ele deve ficar lá dentro por 3 semanas seguidas. Na 4ª semana, você tira o anel para fazer uma pausa (que é quando a menstruação desce) e depois coloca um anel novo. É discreto, regula o ciclo e não altera em nada a saúde da sua região íntima.<sup data-citation="" data-n="12,23" class="text-[0.7em] leading-none align-super">12,23</sup>',
  adesivo_descricao:
    'É um adesivo que vai soltando hormônios direto na corrente sanguínea para bloquear a ovulação. É bem fino e colante, você gruda na pele (pode ser no braço, nas costas ou na barriga) e troca por um novo uma vez por semana, durante 3 semanas. A 4ª semana é livre de adesivo (a semana de pausa para menstruar).',
  adesivo_caracteristicas:
    'É um método moderno e seguro, bom para quem esquece de tomar remédio todo dia. Porém, como ele fica colado na pele, fica visível, o que algumas adolescentes podem não curtir. Pode causar uma leve coceira ou irritação na pele onde foi colado.<sup data-citation="" data-n="12,23" class="text-[0.7em] leading-none align-super">12,23</sup>',
  emergencia_intro:
    'A pílula do dia seguinte é um método para ser usado apenas em emergências — como quando a camisinha estoura, sai do lugar ou você esquece de tomar o anticoncepcional comum.',
  emergencia_tempo_fator: 'Para que ela funcione e evite uma gravidez, o tempo é o fator mais importante.',
  emergencia_atencao_prazo:
    'A bula do medicamento garante o funcionamento seguro se tomado em até 72 horas (3 dias) após a relação. O limite máximo é até 5 dias. A Organização Mundial da Saúde (OMS) afirma que a pílula ainda pode funcionar se tomada em até 120 horas (5 dias). Porém o ideal é tomar a pílula o mais rápido possível. Se você tomar nas primeiras 12 a 24 horas após a relação desprotegida, a eficácia dela é máxima.<sup data-citation="" data-n="23" class="text-[0.7em] leading-none align-super">23</sup>',
  emergencia_atencao_risco:
    'Mas atenção: a chance de o remédio falhar aumenta drasticamente a cada dia que passa. Se você deixar para tomar depois do terceiro dia, o risco de engravidar é bem maior.',
  emergencia_atencao_lembrete:
    'Lembre-se: Ela se chama pílula "do dia seguinte": quanto mais você demorar para tomar, menor será o efeito dela no organismo!',
  emergencia_direitos_adolescente:
    'O adolescente tem direito à educação sexual, ao acesso à informação sobre contracepção, à confidencialidade, ao sigilo sobre sua atividade sexual e à prescrição de métodos anticoncepcionais. Nenhum método contraceptivo (com exceção dos métodos definitivos) deve ser contraindicado tendo como única base a idade. Por outro lado, a falta de conhecimento, aconselhamento inadequado, mitos e moralidade em relação à sexualidade são comuns e interferem na escolha e no uso do método.<sup data-citation="" data-n="11" class="text-[0.7em] leading-none align-super">11</sup>',
};

const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['metodos-hormonais']);
if (!rows[0]) {
  console.error('[migrateMetodosHormonaisText] seção "metodos-hormonais" não encontrada no banco.');
  process.exit(1);
}
const sectionId = rows[0].id;

// Limpa as sobras do seed antigo (callout/heading/quote_grid) que o
// MetodosHormonais.jsx bespoke nunca leu — só as imagens ficam (posição fixa
// no JSX).
await pool.query(`DELETE FROM blocks WHERE section_id = $1 AND type != 'image'`, [sectionId]);

let i = 0;
for (const [key, body] of Object.entries(FIELDS)) {
  await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body) VALUES ($1, $2, 'paragraph', $3, $4)`,
    [sectionId, i, key, body]
  );
  i += 1;
}

console.log(`[migrateMetodosHormonaisText] ${Object.keys(FIELDS).length} campos inseridos para "metodos-hormonais".`);
await pool.end();
