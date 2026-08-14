import IllustrationFrame from '../IllustrationFrame.jsx';
import { PageHeroBlob } from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

export default function TransformacoesMenino({ images }) {
  const [menino] = images;

  return (
    <div className="relative">
      <PageHeroBlob pageLabel="06" />

      <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
        <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.3] flex-1">
          Que transformações ocorrem no corpo do <span className="font-bold uppercase">menino</span>?
        </h1>
        <div className="w-full sm:w-[380px] shrink-0">
          <IllustrationFrame
            src={menino?.url}
            alt={menino?.caption || 'Adolescente menino'}
            className="w-full h-[380px]"
          />
          {menino?.caption && <p className="text-xs text-brand-darker mt-1">{menino.caption}</p>}
        </div>
      </div>

      <HighlightCard variant="blue" className="space-y-4">
        <Paragraph>
          Nos meninos, a puberdade é marcada por diversas transformações físicas. Uma das mais evidentes é o estirão
          de crescimento, período em que ocorre um aumento acelerado da altura, com crescimento médio de 8-9 cm/ano.
          Esse crescimento costuma atingir sua velocidade máxima entre os 13 e 14 anos e desacelera progressivamente
          até o final da adolescência. O maior ganho de peso também ocorre, em geral, por volta dos 14 anos.
        </Paragraph>
        <Paragraph>
          O primeiro sinal da puberdade masculina é o aumento do volume dos testículos, que geralmente ocorre entre
          os 10 e 11 anos. Em seguida, acontece o crescimento do pênis e o surgimento dos pelos pubianos. Entre os 12
          e 14 anos, começam a aparecer os pelos nas axilas, no rosto e em outras regiões do corpo. Nessa fase,
          também aumenta a atividade das glândulas sudoríparas, o que favorece o suor e o odor corporal
          característicos da adolescência. É ainda durante esse período que as ereções espontâneas se tornam mais
          frequentes e ocorre a espermarca (primeira ejaculação).
          <Cite n={[2, 15, 17]} />
        </Paragraph>
      </HighlightCard>

    </div>
  );
}
