import PubertyIntroRow from '../PubertyIntroRow.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import SectionSubtitle from './shared/SectionSubtitle.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function AdolescenciaChegou({ images, fields = {} }) {
  const [girl, boy] = images;

  return (
    <div className="relative px-1">
      <PageHero title="A adolescência chegou.... e agora?" pageLabel="05" />

      <PubertyIntroRow
        image={girl?.url}
        imageAlt="Adolescente pensativa"
        imageCaption={girl?.caption}
        heading="O Que é Puberdade?"
        bodyHtml={fields.puberdade_definicao}
      />

      <PubertyIntroRow
        reverse
        image={boy?.url}
        imageAlt="Adolescente pensativo"
        headingAbove="O que acontece no corpo humano nesse período?"
        imageCaption={boy?.caption}
        bodyHtml={fields.puberdade_hormonios}
      />

      <TextCard className="mb-6">
        <SectionSubtitle>E tem mais...</SectionSubtitle>
        <Paragraph html={fields.puberdade_caracteres_sexuais} />
      </TextCard>

      <HighlightCard variant="blue">
        <SectionSubtitle>Portanto ...</SectionSubtitle>
        <Paragraph html={fields.puberdade_conclusao} />
      </HighlightCard>

    </div>
  );
}
