import IllustrationFrame from '../IllustrationFrame.jsx';
import { PageHeroBlob } from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import SectionTitle from './shared/SectionTitle.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function MetodosContraceptivos({ images }) {
  const [foto] = images;

  return (
    <div className="relative">
      <PageHeroBlob pageLabel="12" />

      <TextCard className="mb-6">
        <Paragraph>
          Se o óvulo não encontrar um espermatozoide, os níveis dos hormônios progesterona e estrogênio diminuem.
          Essa queda dos hormônios faz com que o endométrio (camada interna do útero), que havia se preparado para
          receber uma possível gravidez, se desprenda e seja eliminado através do sangramento menstrual. Assim que a
          menstruação termina, o corpo recomeça um novo ciclo. Contudo, se a gravidez acontecer, o ciclo menstrual
          não se completa e segue o desenvolvimento da gestação{' '}
          <span className="text-xs text-brand-darker">(Montenegro; Rezende Filho, 2022).</span>
        </Paragraph>
      </TextCard>

      <SectionTitle weight="semibold">Métodos contraceptivos</SectionTitle>

      <div className="flex flex-col sm:flex-row gap-5 items-stretch">
        <div className="flex-1 space-y-2">
          <p className="font-poppins font-bold text-brand-blue text-base">Atenção...</p>
          <Paragraph>
            Para quem deseja ter relações sexuais, mas não quer engravidar, existem diversos métodos contraceptivos
            (ou anticoncepcionais), porém não existe um único método que sirva para todo mundo. Cada organismo é
            diferente, e alguns métodos podem ter contraindicações dependendo de cada pessoa. Por isso, o
            recomendado é escolher o que melhor se adapte às necessidades e à rotina de cada um. Além disso,
            independentemente do método, o que garante a menor chance de falha é o seu uso correto e consistente{' '}
            <span className="text-xs text-brand-darker">(WHO, 2022).</span>
          </Paragraph>
        </div>
        <div className="w-full sm:w-[300px] shrink-0">
          <IllustrationFrame
            src={foto?.url}
            alt={foto?.caption || 'Métodos contraceptivos'}
            className="w-full h-[450px]"
            rounded={false}
          />
          {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
        </div>
      </div>

    </div>
  );
}
