import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Cite from './shared/Cite.jsx';
import Paragraph from './shared/Paragraph.jsx';

// Citações no padrão numérico: sempre coladas ao fim do trecho a que pertencem
// (texto vira JSX terminando em <Cite n={...} />), nunca como item à parte —
// um item de citação separado herdaria o space-y do TextCard e flutuaria solto,
// em vez de grudar visualmente na frase que ele credita.
//
// Itens 'p' e 'c' tiveram o texto migrado pro banco (fields.<chave>) — ver
// server/db/migrateMetodosHormonaisText.js. Itens 'h', 'ul' e 'img' continuam
// 100% hardcoded, sem alteração de conteúdo ou estrutura.
const CONTENT = [
  { type: 'p', field: 'intro_liberdade' },
  { type: 'p', field: 'intro_ahc_combinados' },
  { type: 'h', text: 'Como eles funcionam?' },
  { type: 'p', field: 'pilula_como_funciona' },
  { type: 'p', field: 'pilula_formas_administracao' },
  {
    type: 'ul',
    items: [
      'Ela é um método reversível: isso significa que, se a mulher parar de tomar, o corpo volta a ovular normalmente e ela pode engravidar.',
    ],
  },
  { type: 'c', heading: 'Como você sabe...', field: 'pilula_nao_protege_ist' },
  { type: 'p', field: 'pilula_duas_regras_intro' },
  {
    type: 'ul',
    items: [
      'Zero esquecimentos: ela precisa ser tomada todos os dias, de preferência rigorosamente no mesmo horário.',
      <>
        Cuidado com outros remédios: alguns medicamentos podem cortar ou diminuir o efeito da pílula no organismo.
        Por isso, sempre avise ao médico ou dentista que você toma pílula antes de começar qualquer tratamento.
        <Cite n={[12, 23]} />
      </>,
    ],
  },
  { type: 'h', text: 'Como usar?' },
  {
    type: 'ul',
    items: [
      'Primeira vez de uso: se a pílula for iniciada até o 5º dia da menstruação, a proteção contra a gravidez é imediata. Se for iniciada após esse período, ela também pode ser usada, desde que não haja gravidez, mas será necessário utilizar camisinha ou evitar relações sexuais durante os primeiros 7 dias.',
      'Troca de outro método hormonal: Se você já usava outro anticoncepcional hormonal (como injeção, adesivo, anel ou outra pílula) corretamente e não há risco de gravidez, a nova pílula pode ser iniciada imediatamente, sem precisar esperar a próxima menstruação e sem necessidade de usar preservativo como proteção.',
      'Troca do anticoncepcional injetável: a pílula pode ser iniciada na data em que seria aplicada a próxima injeção, sem necessidade de utilizar um método de apoio.',
      <>
        Após usar a pílula do dia seguinte: a pílula anticoncepcional pode ser iniciada imediatamente, sem esperar
        a próxima menstruação. Quem já utilizava a pílula deve continuar a cartela normalmente. É necessário usar
        camisinha ou evitar relações sexuais durante os primeiros 7 dias.
        <Cite n={19} />
      </>,
    ],
  },
  { type: 'img', idx: 2, alt: 'Planejamento e uso regular do anticoncepcional' },
  { type: 'h', text: 'Anticoncepcional Injetável (Injeção)' },
  { type: 'p', field: 'injetavel_intro' },
  { type: 'p', field: 'injetavel_primeira_aplicacao' },
  { type: 'h', text: 'Como usar?' },
  {
    type: 'ul',
    items: [
      'Primeira dose: recomenda-se que seja aplicada nos primeiros sete dias da menstruação. Nessa situação, a proteção contra a gravidez é imediata.',
      <>
        Se a aplicação ocorrer após esse período: a injeção pode ser iniciada desde que haja certeza de que não
        existe gravidez. Nesse caso, recomenda-se utilizar preservativo ou evitar relações sexuais durante os
        primeiros sete dias, até que o método atinja sua eficácia contraceptiva.
        <Cite n={[19, 23]} />
      </>,
    ],
  },
  {
    type: 'c',
    heading: 'Atenção',
    fields: ['injetavel_atencao_troca', 'injetavel_atencao_intervalo'],
  },
  {
    type: 'c',
    heading: 'Importante lembrar!',
    field: 'pilula_importante_esquecimento',
  },
  { type: 'p', field: 'outros_dispositivos_intro' },
  { type: 'h', text: 'Anel Vaginal' },
  { type: 'img', idx: 3, alt: 'Anel vaginal anticoncepcional' },
  { type: 'p', field: 'anel_descricao' },
  { type: 'p', field: 'anel_como_usar' },
  { type: 'h', text: 'Adesivo Anticoncepcional' },
  { type: 'img', idx: 1, alt: 'Adesivo anticoncepcional' },
  { type: 'p', field: 'adesivo_descricao' },
  { type: 'p', field: 'adesivo_caracteristicas' },
  { type: 'h', text: 'Contracepção de emergência (pílula do dia seguinte)' },
  { type: 'p', field: 'emergencia_intro' },
  { type: 'p', field: 'emergencia_tempo_fator' },
  {
    type: 'c',
    heading: 'Atenção',
    fields: ['emergencia_atencao_prazo', 'emergencia_atencao_risco', 'emergencia_atencao_lembrete'],
  },
  {
    type: 'c',
    heading: 'Olha só...',
    field: 'emergencia_direitos_adolescente',
  },
];

export default function MetodosHormonais({ images, fields = {} }) {
  const overview = images[0];

  return (
    <div className="relative">
      <PageHero pageLabel="16" weight="semibold" title="Anticoncepcionais hormonais" />

      <div className="mb-6 w-full sm:w-[70%]">
        <IllustrationFrame src={overview?.url} alt={overview?.caption || 'Métodos hormonais'} className="w-full h-[220px]" />
        {overview?.caption && <p className="text-xs text-brand-darker mt-1">{overview.caption}</p>}
      </div>

      <TextCard className="space-y-4">
        {CONTENT.map((item, i) => {
          if (item.type === 'img') {
            const img = images[item.idx];
            const widthClass = item.idx === 1 ? 'w-full' : 'w-full sm:w-[70%]';
            return (
              <div key={i} className={widthClass}>
                <IllustrationFrame
                  src={img?.url}
                  alt={img?.caption || item.alt}
                  className="w-full h-[200px]"
                />
                {img?.caption && <p className="text-xs text-brand-darker mt-1">{img.caption}</p>}
              </div>
            );
          }
          if (item.type === 'h') {
            return (
              <p key={i} className="font-poppins font-bold text-brand-blue text-base pt-2">
                {item.text}
              </p>
            );
          }
          if (item.type === 'c') {
            const fieldKeys = item.fields ?? [item.field];
            return (
              <div key={i} className="rounded-[20px] bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4 space-y-3">
                <p className="font-poppins font-bold text-brand-blue text-sm mb-1">{item.heading}</p>
                {fieldKeys.map((key) => (
                  <Paragraph key={key} html={fields[key]} />
                ))}
              </div>
            );
          }
          if (item.type === 'ul') {
            return (
              <ul key={i} className="list-disc pl-5 space-y-2">
                {item.items.map((li, j) => (
                  <li key={j} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
                    {li}
                  </li>
                ))}
              </ul>
            );
          }
          return <Paragraph key={i} html={fields[item.field]} />;
        })}
      </TextCard>

    </div>
  );
}
