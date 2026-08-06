import IllustrationFrame from '../IllustrationFrame.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import SectionTitle from './shared/SectionTitle.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function MetodosComportamentais({ images }) {
  const [foto] = images;

  return (
    <div className="relative">
      <SectionTitle weight="semibold">Métodos comportamentais</SectionTitle>

      <Paragraph className="mb-6">
        Os métodos comportamentais dependem da observação do próprio ciclo para identificar os dias férteis, sem uso
        de medicamentos ou dispositivos. Incluem a tabelinha (Ogino-Knaus), o controle da temperatura basal, o exame
        do muco cervical (Billings), o método sintotérmico e o coito interrompido.
      </Paragraph>

      <div className="mb-6">
        <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Métodos comportamentais'} className="w-full h-[280px]" />
        {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
      </div>

      <HighlightCard variant="blue">
        <p className="font-poppins font-bold text-brand-blue text-base mb-2">Olha só...</p>
        <Paragraph>
          esses métodos são pouco eficazes durante a adolescência, considerando que nessa fase de desenvolvimento
          muitas vezes não há regularidade no ciclo menstrual devido a mudanças hormonais.{' '}
          <span className="text-xs text-brand-darker">SBP (2023b); Brasil (2022).</span>
        </Paragraph>
      </HighlightCard>
    </div>
  );
}
