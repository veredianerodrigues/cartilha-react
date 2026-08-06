import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

const MASCULINA_STEPS = [
  'A camisinha deverá ser colocada assim que o pênis estiver ereto, antes de qualquer contato genital ou penetração.',
  'A ponta do preservativo (o reservatório) deverá ser apertada com os dedos para tirar o ar. Se o ar ficar ali dentro, o preservativo pode estourar durante a relação.',
  'Mantendo a ponta apertada, a camisinha deverá ser desenrolada da cabeça do pênis (glande) até a base.',
  'Para retirada segura, logo após a ejaculação, enquanto o pênis ainda estiver ereto, deverá ser retirado da vagina segurando firmemente a base da camisinha junto ao corpo para evitar que ela escorregue e o sêmen vaze.',
];

const FEMININA_STEPS = [
  'O anel interno é introduzido na vagina para manter o preservativo posicionado, enquanto o anel externo permanece fora da vagina, cobrindo parcialmente a vulva.',
  'Durante a relação sexual, o preservativo impede o contato do pênis e do esperma com a mucosa vaginal, reduzindo o risco de gravidez e contribuindo para a prevenção das infecções sexualmente transmissíveis (ISTs).',
  'Após a relação sexual, o preservativo deve ser retirado cuidadosamente, evitando o extravasamento do sêmen, e descartado no lixo, não devendo ser reutilizado.',
];

export default function MetodosBarreira({ images }) {
  const [masculina, feminina] = images;

  return (
    <div className="relative">
      <PageHero
        pageLabel="14"
        title={
          <>
            Métodos de <span className="font-semibold uppercase">barreira</span>
          </>
        }
      />

      <HighlightCard variant="cream" className="space-y-6">
        <Paragraph>
          Eles recebem esse nome porque criam uma barreira física que impede o espermatozoide de entrar no útero.
          Esse grupo inclui o diafragma, o capuz cervical, a esponja contraceptiva e os preservativos (camisinha)
          masculina e feminina.
        </Paragraph>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Fique ligado!!</p>
          <Paragraph>
            Os mais utilizados são os preservativos ou camisinha masculina e feminina, e são os únicos métodos que,
            além de evitar a gravidez, protegem contra as Infecções Sexualmente Transmissíveis (ISTs). Ambas são
            distribuídas gratuitamente em qualquer unidade de saúde do SUS, sem necessidade de receita médica.
          </Paragraph>
        </div>

        <div>
          <h2 className="font-poppins text-xl sm:text-2xl text-brand-dark mb-4">
            Preservativo <span className="font-semibold">masculino</span>
          </h2>
          <IllustrationFrame src={masculina?.url} alt={masculina?.caption || 'Preservativo masculino'} fit="contain" className="w-full" />
          {masculina?.caption && <p className="text-xs text-brand-darker mt-1">{masculina.caption}</p>}
        </div>

        <div>
          <Paragraph className="mb-4">
            A camisinha masculina é um método contraceptivo de barreira, feito de látex ou outros materiais, que é
            colocado sobre o pênis ereto para evitar a gravidez e ajudar a prevenir as infecções sexualmente
            transmissíveis (ISTs).
          </Paragraph>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Como usar</p>
          <ul className="list-disc pl-5 space-y-2">
            {MASCULINA_STEPS.map((text, i) => (
              <li key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
                {text}
              </li>
            ))}
          </ul>
          <p className="text-xs text-brand-darker mt-3">BRASIL (2022); WHO (2022).</p>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <h2 className="font-poppins text-xl sm:text-2xl text-brand-dark mb-4">
            Preservativo <span className="font-semibold">feminino</span>
          </h2>
          <IllustrationFrame src={feminina?.url} alt={feminina?.caption || 'Preservativo feminino'} fit="contain" className="w-full" />
          {feminina?.caption && <p className="text-xs text-brand-darker mt-1">{feminina.caption}</p>}
        </div>

        <div>
          <Paragraph className="mb-4">
            A camisinha feminina também é um método contraceptivo de barreira, distribuído gratuitamente nas
            Unidades Básicas de Saúde e que não necessita de prescrição médica. É constituída por uma bolsa fina,
            flexível e resistente, com um anel em cada extremidade.
          </Paragraph>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Como usar</p>
          <ul className="list-disc pl-5 space-y-2">
            {FEMININA_STEPS.map((text, i) => (
              <li key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
                {text}
              </li>
            ))}
          </ul>
          <p className="text-xs text-brand-darker mt-3">BRASIL (2022); WHO (2022).</p>
        </div>
      </HighlightCard>

    </div>
  );
}
