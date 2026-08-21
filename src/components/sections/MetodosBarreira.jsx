import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

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
