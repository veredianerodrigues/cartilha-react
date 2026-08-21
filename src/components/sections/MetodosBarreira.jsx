import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

export default function MetodosBarreira({ images, fields = {} }) {
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
        <Paragraph html={fields.intro} />

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Fique ligado!!</p>
          <Paragraph html={fields.fique_ligado} />
        </div>

        <div>
          <h2 className="font-poppins text-xl sm:text-2xl text-brand-dark mb-4">
            Preservativo <span className="font-semibold">masculino</span>
          </h2>
          <Paragraph className="mb-4" html={fields.masculino_intro} />
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
          <Paragraph className="mb-4" html={fields.feminino_intro_1} />
          <Paragraph className="mb-4" html={fields.feminino_intro_2} />
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
