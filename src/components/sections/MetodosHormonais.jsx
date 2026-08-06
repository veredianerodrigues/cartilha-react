import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';

const CONTENT = [
  { type: 'p', text: 'Os anticoncepcionais trouxeram liberdade para as mulheres, porque permitem que elas planejem com segurança se e quando querem engravidar.' },
  { type: 'p', text: 'A maioria desses métodos são chamados de Anticoncepcionais Hormonais Combinados (AHC) porque juntam dois hormônios: o estrogênio e a progesterona.' },
  { type: 'h', text: 'Como eles funcionam?' },
  { type: 'p', text: 'A progesterona age fazendo com que o corpo não libere nenhum óvulo (um processo chamado de anovulação). Sem um óvulo disponível, o espermatozoide não tem quem fecundar e a gravidez simplesmente não acontece. Esses hormônios podem ser colocados no corpo de várias formas (como adesivos na pele, comprimidos ou injeções), mas o formato mais conhecido e utilizado no Brasil e no mundo é a chamada pílula anticoncepcional. Ela é um método reversível: isso significa que, se a mulher parar de tomar, o corpo volta a ovular normalmente e ela pode engravidar.' },
  { type: 'c', heading: 'Como você sabe...', text: 'A pílula não protege contra Infecções Sexualmente Transmissíveis (ISTs). Para se proteger delas, o único método indicado é o uso da camisinha (masculina ou feminina) em todas as relações.' },
  { type: 'p', text: 'Para o sucesso da pílula, duas regras são fundamentais:' },
  {
    type: 'ul',
    items: [
      'Zero esquecimentos: ela precisa ser tomada todos os dias, de preferência rigorosamente no mesmo horário.',
      'Cuidado com outros remédios: alguns medicamentos podem cortar ou diminuir o efeito da pílula no organismo. Por isso, sempre avise ao médico ou dentista que você toma pílula antes de começar qualquer tratamento (FEBRASGO, 2025; SBP, 2023).',
    ],
  },
  { type: 'h', text: 'Como usar?' },
  {
    type: 'ul',
    items: [
      'Primeira vez de uso: se a pílula for iniciada até o 5º dia da menstruação, a proteção contra a gravidez é imediata. Se for iniciada após esse período, ela também pode ser usada, desde que não haja gravidez, mas será necessário utilizar camisinha ou evitar relações sexuais durante os primeiros 7 dias.',
      'Troca de outro método hormonal: se o método anterior estava sendo utilizado corretamente e não há suspeita de gravidez, a pílula pode ser iniciada imediatamente, sem precisar esperar a próxima menstruação. Nesse caso, não é necessário utilizar um método de apoio.',
      'Troca do anticoncepcional injetável: a pílula pode ser iniciada na data em que seria aplicada a próxima injeção, sem necessidade de utilizar um método de apoio.',
      'Após usar a pílula do dia seguinte: a pílula anticoncepcional pode ser iniciada imediatamente, sem esperar a próxima menstruação. Quem já utilizava a pílula deve continuar a cartela normalmente. É necessário usar camisinha ou evitar relações sexuais durante os primeiros 7 dias.',
    ],
  },
  { type: 'cite', text: 'WHO (2022).' },
  { type: 'img', idx: 2, alt: 'Planejamento e uso regular do anticoncepcional' },
  { type: 'h', text: 'Anticoncepcional Injetável (Injeção)' },
  { type: 'p', text: 'O anticoncepcional injetável é um método contraceptivo prático e eficaz para quem prefere não precisar tomar um comprimido todos os dias. Existem dois tipos: o mensal e o trimestral. A aplicação é feita por um profissional de saúde, geralmente no músculo do braço ou do glúteo, e ambas são fornecidas pelo SUS.' },
  { type: 'h', text: 'Como usar?' },
  {
    type: 'ul',
    items: [
      'Primeira dose: recomenda-se que seja aplicada nos primeiros sete dias da menstruação. Nessa situação, a proteção contra a gravidez é imediata.',
      'Se a aplicação ocorrer após esse período: a injeção pode ser iniciada desde que haja certeza de que não existe gravidez. Nesse caso, recomenda-se utilizar preservativo ou evitar relações sexuais durante os primeiros sete dias, até que o método atinja sua eficácia contraceptiva.',
    ],
  },
  { type: 'cite', text: 'WHO (2022); SBP (2023b).' },
  { type: 'c', heading: 'Atenção', text: 'Quando as mulheres utilizam anticoncepcionais injetáveis trimestrais, implante hormonal ou DIU hormonal e desejam fazer a troca por pílulas anticoncepcionais, devem iniciar a cartela imediatamente após o término da validade do método usado anteriormente. Com relação ao intervalo entre as cartelas, alguns contraceptivos preveem pausas de quatro a sete dias e algumas formulações não preveem pausas.' },
  { type: 'c', heading: 'Importante lembrar!', text: 'Os comprimidos devem ser ingeridos diariamente e preferencialmente no mesmo horário. O esquecimento do uso implica em falha contraceptiva; nesse caso, recomenda-se o uso de método contraceptivo adicional, como preservativos.' },
  { type: 'cite', text: 'FEBRASGO (2025); SBP (2023b).' },
  { type: 'p', text: 'Também existem outros dispositivos hormonais, são eles:' },
  { type: 'h', text: 'Anel Vaginal' },
  { type: 'img', idx: 3, alt: 'Anel vaginal anticoncepcional' },
  { type: 'p', text: 'É um anel de plástico bem flexível e macio que libera hormônios no corpo, impedindo a ovulação.' },
  { type: 'p', text: 'Como usar: você mesma coloca e retira o anel de dentro da vagina. Ele deve ficar lá dentro por 3 semanas seguidas. Na 4ª semana, você tira o anel para fazer uma pausa (que é quando a menstruação desce) e depois coloca um anel novo. É discreto, regula o ciclo e não altera em nada a saúde da sua região íntima.' },
  { type: 'cite', text: 'FEBRASGO (2025); SBP (2023b).' },
  { type: 'h', text: 'Adesivo Anticoncepcional' },
  { type: 'img', idx: 1, alt: 'Adesivo anticoncepcional' },
  { type: 'p', text: 'É um adesivo que vai soltando hormônios direto na corrente sanguínea para bloquear a ovulação. É bem fino e colante, você gruda na pele (pode ser no braço, nas costas ou na barriga) e troca por um novo uma vez por semana, durante 3 semanas. A 4ª semana é livre de adesivo (a semana de pausa para menstruar).' },
  { type: 'p', text: 'É um método moderno e seguro, bom para quem esquece de tomar remédio todo dia. Porém, como ele fica colado na pele, fica visível, o que algumas adolescentes podem não curtir. Pode causar uma leve coceira ou irritação na pele onde foi colado.' },
  { type: 'cite', text: 'FEBRASGO (2025); SBP (2023b).' },
  { type: 'h', text: 'Contracepção de emergência (pílula do dia seguinte)' },
  { type: 'p', text: 'A pílula do dia seguinte é um método para ser usado apenas em emergências — como quando a camisinha estoura, sai do lugar ou você esquece de tomar o anticoncepcional comum. Para que ela funcione e evite uma gravidez, o tempo é o fator mais importante.' },
  { type: 'c', heading: 'Atenção', text: 'O ideal é tomar a pílula o mais rápido possível. Se você tomar nas primeiras 12 a 24 horas após a relação desprotegida, a eficácia dela é máxima. O prazo da bula (até 3 dias): a bula do medicamento garante o funcionamento seguro se tomado em até 72 horas (3 dias) após a relação. O limite máximo (até 5 dias): a Organização Mundial da Saúde (OMS) afirma que a pílula ainda pode funcionar se tomada em até 120 horas (5 dias). Mas atenção: a chance de o remédio falhar aumenta drasticamente a cada dia que passa. Se você deixar para tomar depois do terceiro dia, o risco de engravidar é bem maior. Lembre-se: ela se chama pílula "do dia seguinte" — quanto mais você demorar para tomar, menor será o efeito dela no organismo!' },
  { type: 'cite', text: 'SBP (2023b).' },
  { type: 'c', heading: 'Olha só...', text: 'O adolescente tem direito à educação sexual, ao acesso à informação sobre contracepção, à confidencialidade, ao sigilo sobre sua atividade sexual e à prescrição de métodos anticoncepcionais (FEBRASGO, 2017, p. 13). Nenhum método contraceptivo (com exceção dos métodos definitivos) deve ser contraindicado tendo como única base a idade. Por outro lado, a falta de conhecimento, aconselhamento inadequado, mitos e moralidade em relação à sexualidade são comuns e interferem na escolha e no uso do método (FEBRASGO, 2017, p. 15).' },
];

export default function MetodosHormonais({ images }) {
  const overview = images[0];

  return (
    <div className="relative">
      <PageHero pageLabel="17" weight="semibold" title="Anticoncepcionais hormonais" />

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
            return (
              <div key={i} className="rounded-[20px] bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
                <p className="font-poppins font-bold text-brand-blue text-sm mb-1">{item.heading}</p>
                <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">{item.text}</p>
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
          if (item.type === 'cite') {
            return (
              <p key={i} className="text-xs text-brand-darker">
                {item.text}
              </p>
            );
          }
          return (
            <p key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
              {item.text}
            </p>
          );
        })}
      </TextCard>

    </div>
  );
}
