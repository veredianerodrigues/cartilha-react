import IllustrationFrame from '../IllustrationFrame.jsx';
import deco9 from '../../assets/page09/deco.svg';
import deco10 from '../../assets/page10/deco.svg';

export default function TannerMenino({ images }) {
  const [genitalia, pelos, grupo] = images;

  return (
    <div className="relative space-y-6">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco9} />

      <div className="relative rounded-[24px] sm:rounded-[40px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8">
        <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl mb-4">Você sabia...</h1>
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          A puberdade ocorre em diferentes fases, que refletem o grau de maturidade sexual do adolescente. Para
          avaliar esse desenvolvimento os médicos britânicos Marshall e Tanner desenvolveram uma classificação
          conhecida como estágios de Tanner, utilizada até os dias atuais pelos profissionais da saúde. Essa
          classificação permite acompanhar o desenvolvimento físico durante a puberdade, pois adolescentes da mesma
          idade podem apresentar diferentes graus de maturação sexual{' '}
          <span className="text-xs text-brand-darker">(Marshall; Tanner, 1970).</span>
        </p>
      </div>

      <IllustrationFrame src={grupo?.url} alt={grupo?.caption || 'Adolescentes'} className="w-full h-[260px]" />

      <div className="relative">
        <img alt="" className="absolute pointer-events-none -top-[10%] -right-[6%] w-[35%] max-w-[240px] -z-10" src={deco10} />
        <div className="relative rounded-[24px] sm:rounded-[40px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8">
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Nos meninos, são avaliados o crescimento da genitália (G) e dos pelos pubianos (P). Cada um deles é
            dividido em cinco estágios, de 1 a 5. O estágio 1 indica que a puberdade ainda não começou, enquanto o
            estágio 5 representa o desenvolvimento físico completo. Os estágios 2, 3 e 4 mostram as mudanças que
            acontecem ao longo da puberdade{' '}
            <span className="text-xs text-brand-darker">(Marshall; Tanner, 1970).</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <IllustrationFrame src={pelos?.url} alt={pelos?.caption || 'Estágios de Tanner - pelos pubianos'} fit="contain" className="w-full" />
        <IllustrationFrame src={genitalia?.url} alt={genitalia?.caption || 'Estágios de Tanner - genitália'} fit="contain" className="w-full" />
      </div>
      {(genitalia?.caption || pelos?.caption) && (
        <p className="text-xs text-brand-darker">{genitalia?.caption || pelos?.caption}</p>
      )}
    </div>
  );
}
