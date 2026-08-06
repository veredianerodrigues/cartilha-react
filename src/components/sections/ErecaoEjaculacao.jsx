import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function ErecaoEjaculacao({ images }) {
  const [imagem] = images;

  return (
    <div className="relative">
      <PageHero
        pageLabel="07"
        title={
          <>
            O que é <span className="font-semibold">ereção e ejaculação</span> e quando acontece a primeira
            ejaculação?
          </>
        }
      />

      <div className="flex flex-col sm:flex-row gap-5 items-stretch">
        <div className="w-full sm:w-[220px] shrink-0">
          <IllustrationFrame
            src={imagem?.url}
            alt={imagem?.caption || 'Adolescente'}
            className="w-full min-h-[220px]"
            rounded={false}
          />
          {imagem?.caption && <p className="text-xs text-brand-darker mt-1">{imagem.caption}</p>}
        </div>

        <TextCard className="relative flex-1 space-y-4">
          <Paragraph>
            A ereção é o enrijecimento do pênis causado pelo aumento do fluxo de sangue nessa região. Na adolescência,
            ela pode ocorrer em resposta ao desejo sexual, mas também é comum acontecer de forma espontânea e
            involuntária, como parte do desenvolvimento normal do organismo. Já a ejaculação é a saída do sêmen pelo
            pênis. O sêmen é um líquido esbranquiçado que tem a função de nutrir e transportar os espermatozoides.
          </Paragraph>
          <Paragraph>
            Como mencionado, a primeira ejaculação do menino é chamada de espermarca e geralmente ocorre por volta
            dos 13 anos, embora possa acontecer em idades diferentes. Ela pode ocorrer durante o sono, em um
            fenômeno normal conhecido como polução noturna, ou em outras situações. A espermarca representa um
            importante marco da puberdade e indica que o sistema reprodutor masculino está amadurecendo e
            adquirindo capacidade reprodutiva.
          </Paragraph>
          <p className="text-xs text-brand-darker">Krishna; Witchel, 2024; Graber, 2025, WHO, 2022.</p>
        </TextCard>
      </div>

    </div>
  );
}
