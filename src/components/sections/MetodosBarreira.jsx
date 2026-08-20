import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

// TODO: o Word 10-08 traz uma imagem nova para "Como usar a camisinha
// masculina" com os 4 passos e um rodapé "IMPORTANTE" já desenhados na
// própria arte (comentário cF23: "a escrita abaixo é a mesma da ilustração,
// não precisa colocar na cartilha"). A imagem local ainda é a foto-estoque
// antiga sem os passos — quando a Cariane cadastrar a nova pelo /admin,
// remover MASCULINA_STEPS e o <ul> que a renderiza, para não duplicar texto.
const MASCULINA_STEPS = [
  'A camisinha deverá ser colocada assim que o pênis estiver ereto, antes de qualquer contato genital ou penetração.',
  'A ponta do preservativo (o reservatório) deverá ser apertada com os dedos para tirar o ar. Se o ar ficar ali dentro, o preservativo pode estourar durante a relação.',
  'Mantendo a ponta apertada, a camisinha deverá ser desenrolada da cabeça do pênis (glande) até a base.',
];

// TODO: mesma situação da masculina (ver comentário acima) — o Word 10-08 traz
// uma imagem nova "Como usar a camisinha feminina" com 5 passos + rodapé
// "IMPORTANTE" na própria arte (comentário cF30: "Não precisa colocar na
// cartilha já esta na imagem"). Hoje nem existe imagem local para a feminina
// (mostra placeholder) — remover FEMININA_STEPS quando a nova imagem entrar.
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
            além de evitar a gravidez, protegem contra as Infecções Sexualmente Transmissíveis{' '}
            <span className="font-semibold">(ISTs)</span>. Ambas são
            distribuídas gratuitamente em qualquer unidade de saúde do SUS, sem necessidade de receita médica.
          </Paragraph>
        </div>

        <div>
          <h2 className="font-poppins text-xl sm:text-2xl text-brand-dark mb-4">
            Preservativo <span className="font-semibold">masculino</span>
          </h2>
          <Paragraph className="mb-4">
            A camisinha masculina é um método contraceptivo de barreira, feito de látex ou outros materiais, que é
            colocado sobre o pênis ereto para evitar a gravidez e ajudar a prevenir as infecções sexualmente
            transmissíveis (ISTs).
          </Paragraph>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Como usar</p>
          <IllustrationFrame src={masculina?.url} alt={masculina?.caption || 'Preservativo masculino'} fit="contain" className="w-full" />
          {masculina?.caption && <p className="text-xs text-brand-darker mt-1">{masculina.caption}</p>}
          <ul className="list-disc pl-5 space-y-2 mt-4">
            {MASCULINA_STEPS.map((text, i) => (
              <li key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
                {text}
              </li>
            ))}
          </ul>
          {/* O Word 10-08 cita "BRASIL (2022)" sem a letra aqui; adotei a 9
              (Manual técnico de anticoncepção) — confirmar com a Cariane se não
              é a 6 (Protocolo clínico IST). */}
          <p className="text-sm text-brand-darker mt-3">
            <Cite n={[9, 19]} />
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <h2 className="font-poppins text-xl sm:text-2xl text-brand-dark mb-4">
            Preservativo <span className="font-semibold">feminino</span>
          </h2>
          <Paragraph className="mb-4">
            A camisinha feminina também é um método contraceptivo de barreira, distribuído gratuitamente nas
            Unidades Básicas de Saúde e que não necessita de prescrição médica.
          </Paragraph>
          <Paragraph className="mb-4">
            É constituído por uma bolsa fina, flexível e resistente, com um anel em cada extremidade.
          </Paragraph>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Como usar</p>
          <IllustrationFrame src={feminina?.url} alt={feminina?.caption || 'Preservativo feminino'} fit="contain" className="w-full" />
          {feminina?.caption && <p className="text-xs text-brand-darker mt-1">{feminina.caption}</p>}
          <ul className="list-disc pl-5 space-y-2 mt-4">
            {FEMININA_STEPS.map((text, i) => (
              <li key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
                {text}
              </li>
            ))}
          </ul>
          {/* O Word 10-08 cita "BRASIL (2022)" sem a letra aqui; adotei a 9
              (Manual técnico de anticoncepção) — confirmar com a Cariane se não
              é a 6 (Protocolo clínico IST). */}
          <p className="text-sm text-brand-darker mt-3">
            <Cite n={[9, 19]} />
          </p>
        </div>
      </HighlightCard>

    </div>
  );
}
