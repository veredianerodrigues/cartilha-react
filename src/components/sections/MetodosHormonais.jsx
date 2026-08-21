import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import RichHtml from './shared/RichHtml.jsx';

// Itens 'p' e 'c' tiveram o texto migrado pro banco (fields.<chave>) — ver
// server/db/migrateMetodosHormonaisText.js. Itens 'ul' também vieram pro
// banco, mas como HTML de <ul> inteiro num campo tipo "paragraph" (não
// "list"), pra dar pra editar com os mesmos botões de Negrito/Citação/Lista
// do editor rico — ver RichTextEditor.jsx. Itens 'h' e 'img' continuam 100%
// hardcoded, sem alteração de conteúdo ou estrutura.
const CONTENT = [
  { type: 'p', field: 'intro_liberdade' },
  { type: 'p', field: 'intro_ahc_combinados' },
  { type: 'h', text: 'Como eles funcionam?' },
  { type: 'p', field: 'pilula_como_funciona' },
  { type: 'p', field: 'pilula_formas_administracao' },
  { type: 'ul', field: 'pilula_reversivel_lista' },
  { type: 'c', heading: 'Como você sabe...', field: 'pilula_nao_protege_ist' },
  { type: 'p', field: 'pilula_duas_regras_intro' },
  { type: 'ul', field: 'pilula_regras_lista' },
  { type: 'h', text: 'Como usar?' },
  { type: 'ul', field: 'pilula_como_usar_lista' },
  { type: 'img', idx: 2, alt: 'Planejamento e uso regular do anticoncepcional' },
  { type: 'h', text: 'Anticoncepcional Injetável (Injeção)' },
  { type: 'p', field: 'injetavel_intro' },
  { type: 'p', field: 'injetavel_primeira_aplicacao' },
  { type: 'h', text: 'Como usar?' },
  { type: 'ul', field: 'injetavel_como_usar_lista' },
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
            return <RichHtml key={i} html={fields[item.field]} />;
          }
          return <Paragraph key={i} html={fields[item.field]} />;
        })}
      </TextCard>

    </div>
  );
}
