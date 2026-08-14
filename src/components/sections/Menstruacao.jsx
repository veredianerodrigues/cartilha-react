import IllustrationFrame from '../IllustrationFrame.jsx';
import { PageHeroBlob } from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import SectionSubtitle from './shared/SectionSubtitle.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

export default function Menstruacao({ images }) {
  const [ciclo, foto] = images;

  return (
    <div className="relative space-y-6">
      <PageHeroBlob pageLabel="10" />

      <TextCard className="flex flex-col sm:flex-row gap-5 items-center">
        <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.4] flex-1">
          E a <span className="font-semibold uppercase">menstruação...</span>
          <br />o que é
          <br />e como acontece?
        </h1>
        <div className="w-full sm:w-[300px] shrink-0">
          <IllustrationFrame
            src={foto?.url}
            alt={foto?.caption || 'Adolescente'}
            className="w-full h-[300px]"
            rounded={false}
          />
          {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
        </div>
      </TextCard>

      <HighlightCard variant="solid">
        <p className="font-worksans font-medium text-white text-sm leading-[24px] tracking-[0.14px] text-justify">
          O amadurecimento dos órgãos reprodutores leva ao início da menstruação, chamada menarca. A menarca
          representa uma importante etapa do desenvolvimento reprodutivo feminino e ocorre, em média, por volta dos
          12 anos, podendo acontecer normalmente entre os 9 e os 15 anos. Ela indica que o organismo está
          adquirindo capacidade reprodutiva.
          <Cite n={[11, 20]} />
        </p>
      </HighlightCard>

      <HighlightCard variant="cream" shadow={false} className="!p-4 sm:!p-6">
        <IllustrationFrame src={ciclo?.url} alt={ciclo?.caption || 'Ciclo menstrual'} fit="contain" className="w-full mb-3" rounded={false} />
        {ciclo?.caption && <p className="font-worksans text-xs text-brand-darker text-center italic">{ciclo.caption}</p>}
      </HighlightCard>

      <TextCard className="space-y-4">
        <Paragraph>
          O ciclo menstrual corresponde ao período entre o primeiro dia de uma menstruação e o primeiro dia da
          seguinte. Durante esse ciclo, os hormônios estimulam o amadurecimento do óvulo e sua liberação pelo
          ovário (ovulação). Após a ovulação, a progesterona prepara o útero para uma possível gravidez.
        </Paragraph>
        <Paragraph>
          Caso a fecundação não ocorra, seja por não ter praticado relação sexual ou por ter usado um método
          contraceptivo, como a camisinha, os níveis desses hormônios baixam, provocando a descamação do
          endométrio (camada interna do útero), que é eliminada pela vagina na forma de sangue, caracterizando a
          menstruação.
        </Paragraph>
        <Paragraph>
          O fluxo menstrual costuma durar de 3 a 7 dias. Nos primeiros anos após a menarca, é comum que o ciclo
          menstrual varie entre 21 e 45 dias. Com o amadurecimento do organismo, tende a se tornar mais regular,
          variando geralmente entre 21 e 35 dias.
          <Cite n={[20, 22]} />
        </Paragraph>
        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Fique atenta...</p>
          <Paragraph>
            Nos primeiros anos após a menarca, é comum que o ciclo menstrual seja irregular, pois o organismo
            ainda está amadurecendo.
          </Paragraph>
        </div>
      </TextCard>

      <TextCard className="mb-6">
        <SectionSubtitle>
          <span className="font-semibold">Você sabia</span>...
        </SectionSubtitle>
        <p className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify">
          A precocidade ou atraso na ocorrência da menarca são influenciados por diversos fatores como a
          hereditariedade, fatores nutricionais, físicos, emocionais, exercício, gordura corporal e contexto
          social.<Cite n={14} />
        </p>
      </TextCard>

      <div className="space-y-5">
        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">E tem mais:</p>
          <p className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify">
            na adolescência, é possível engravidar antes mesmo da primeira menstruação. Por outro lado, também é
            comum que os primeiros ciclos menstruais sejam anovulatórios (ou seja, sem a liberação de um óvulo).
            Isso acontece porque o corpo ainda está passando por um amadurecimento hormonal e pode não produzir os
            picos de hormônios necessários para a ovulação. Por conta dessa imaturidade fisiológica natural da
            idade, a jovem pode apresentar ciclos irregulares e sangramentos inesperados, situações que fazem
            parte do ajuste normal do organismo nessa fase.<Cite n={22} />
          </p>
        </div>
        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Portanto recomenda-se...</p>
          <p className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify">
            que a adolescente acompanhe seu ciclo menstrual registrando,
            a cada mês, o dia de início e o dia de término da menstruação. Esse registro pode ser realizado em um calendário impresso,
            agenda ou outro meio de sua preferência, anotando, por exemplo, a data em que o sangramento começou e a
            data em que terminou.<Cite n={5} />
          </p>
        </div>
        
      </div>

    </div>
  );
}
