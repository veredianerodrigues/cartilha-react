import IllustrationFrame from '../IllustrationFrame.jsx';
import deco from '../../assets/page31/deco.svg';

export default function OrientacaoQuemPodeAjudar({ images }) {
  const [foto] = images;

  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.4] mb-6">
        Se eu precisar de orientação, <span className="font-semibold">quem poderá me ajudar?</span>
      </h1>

      <div className="mb-6">
        <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Orientação de saúde'} className="w-full h-[240px]" />
        {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
      </div>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 mb-6">
        <p className="font-poppins font-bold text-brand-blue text-base mb-2">É fundamental…</p>
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Você não precisa passar por isso sozinho. Conversar em casa sobre as transformações do corpo, os
          sentimentos, os medos e as inseguranças é fundamental para atravessar essa fase com mais leveza e
          segurança.
        </p>
      </div>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Procure o posto de saúde: as unidades de saúde (os postos de saúde) são o principal ponto de apoio para
          esse momento. O enfermeiro e a equipe de saúde estão ali para acolher você. Eles oferecem consultas,
          distribuem e orientam sobre métodos contraceptivos e conversam abertamente sobre direitos sexuais e
          reprodutivos, garantindo que você tome decisões informadas e seguras sobre o seu futuro.
        </p>
      </div>
    </div>
  );
}
