import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function TransformacoesMenina({ images }) {
  const [mamas, foto, pelos] = images;

  return (
    <div className="relative space-y-6">
      <PageHero
        pageLabel="09"
        title={
          <>
            <span className="block font-light text-base mb-1">Que transformações ocorrem no</span>
            <span className="font-light">corpo da </span>
            <span className="font-bold uppercase">menina</span>
            <span className="font-light">?</span>
          </>
        }
      />

      <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Adolescentes'} className="w-full h-[300px]" />

      <HighlightCard variant="cream">
        <Paragraph>
          Nas meninas, o primeiro sinal visível da puberdade é o surgimento do broto mamário, que corresponde ao
          início do desenvolvimento das mamas. Esse processo ocorre geralmente entre os 9 e 10 anos, podendo iniciar
          normalmente entre os 8 e os 13 anos. Em seguida, ou quase ao mesmo tempo, começam a surgir os pelos
          pubianos e inicia-se o estirão puberal, período em que ocorre o crescimento mais acelerado da altura, cujo
          pico costuma acontecer entre os 11 e 12 anos. O maior ganho de peso também ocorre, em geral, entre os 12 e
          13 anos. Após a menarca (primeira menstruação), o crescimento desacelera progressivamente.{' '}
          <span className="text-xs text-brand-darker">Bacil et al., 2020; Krishna; Witchel, 2024; Graber, 2025.</span>
        </Paragraph>
      </HighlightCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <IllustrationFrame src={mamas?.url} alt={mamas?.caption || 'Estágios de Tanner - mamas'} fit="contain" className="w-full" rounded={false} />
        <IllustrationFrame src={pelos?.url} alt={pelos?.caption || 'Estágios de Tanner - pelos pubianos'} fit="contain" className="w-full" rounded={false} />
      </div>

      <HighlightCard variant="cream">
        <Paragraph>
          Nas meninas, são observados o crescimento das mamas (M) e dos pelos pubianos (P), classificados em cinco
          estágios, de 1 a 5. Assim como no caso dos meninos, o estágio 1 corresponde ao período antes do início da
          puberdade, enquanto o estágio 5 indica que o desenvolvimento físico foi concluído. Os estágios
          intermediários representam as diferentes mudanças que acontecem durante a puberdade.{' '}
          <span className="text-xs text-brand-darker">(Marshall; Tanner, 1970; Krishna; Witchel, 2024).</span>
        </Paragraph>
        {mamas?.caption && <p className="text-xs text-brand-darker mt-3">{mamas.caption}</p>}
      </HighlightCard>

    </div>
  );
}
