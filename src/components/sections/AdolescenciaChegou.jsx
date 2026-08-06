import PubertyIntroRow from '../PubertyIntroRow.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import SectionSubtitle from './shared/SectionSubtitle.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function AdolescenciaChegou({ images }) {
  const [girl, boy] = images;

  return (
    <div className="relative px-1">
      <PageHero title="A adolescência chegou.... e agora?" pageLabel="05" />

      <PubertyIntroRow
        image={girl?.url}
        imageAlt="Adolescente pensativa"
        imageCaption={girl?.caption}
        heading="O Que é Puberdade?"
        body="A puberdade é uma fase natural do desenvolvimento em que o corpo passa por mudanças físicas e hormonais, tornando-se capaz de se reproduzir. Ela ocorre entre os 8 e 13 anos nas meninas, e entre os 9 e 14 anos nos meninos, durando cerca de 3 a 4 anos. É o momento em que o corpo começa a se preparar para a vida adulta."
        citation="(Castilho, Mattos; Pedrosa, 2024; Sartor; Fiorin; Sulbacher, 2025)."
      />

      <PubertyIntroRow
        reverse
        image={boy?.url}
        imageAlt="Adolescente pensativo"
        imageCaption={boy?.caption}
        headingAbove="O que acontece no corpo humano nesse período?"
        body="O comando para as transformações presentes na adolescência começa no cérebro. Uma glândula chamada hipófise libera dois hormônios: o LH (luteinizante) e o FSH (folículo-estimulante). Eles viajam pelo sangue e estimulam os órgãos sexuais. Nos meninos, os testículos passam a produzir testosterona (responsável pela voz mais grossa, pelos e desenvolvimento físico) e a produzir os espermatozoides. Nas meninas, os ovários passam a produzir estrogênio (estradiol) e progesterona, hormônios que atuam no amadurecimento dos óvulos e controlam o ciclo menstrual."
        citation="(Brasil, 2017; Krishna; Witchel, 2024)."
      />

      <TextCard className="mb-6">
        <SectionSubtitle>E tem mais...</SectionSubtitle>
        <Paragraph>
          Os caracteres sexuais primários correspondem aos órgãos do sistema reprodutor presentes desde o
          nascimento. Nas meninas, incluem os ovários, as tubas uterinas, o útero, a vagina e a vulva. Nos meninos,
          compreendem os testículos, o pênis, o escroto, as vesículas seminais e a próstata. Durante a puberdade,
          esses órgãos amadurecem e ocorre o desenvolvimento dos caracteres sexuais secundários. Nas meninas,
          destacam-se o desenvolvimento das mamas, o aparecimento dos pelos pubianos e axilares e o alargamento do
          quadril. Nos meninos, ocorre o aumento do volume dos testículos e do pênis, o aparecimento de pelos
          faciais, corporais, axilares e pubianos, o aumento da massa muscular e a mudança da voz.
        </Paragraph>
      </TextCard>

      <HighlightCard variant="blue">
        <SectionSubtitle>Portanto ...</SectionSubtitle>
        <Paragraph>
          é importante entender a puberdade como um período relevante de transição e transformações físicas,
          fisiológicas e emocionais da vida de meninas e meninos, destacando que nesse momento o corpo do
          adolescente ganha algumas novas funcionalidades, principalmente no campo da sexualidade.{' '}
          <span className="text-xs text-brand-darker">SBP (2023a); Krishna; Witchel (2024).</span>
        </Paragraph>
      </HighlightCard>

    </div>
  );
}
