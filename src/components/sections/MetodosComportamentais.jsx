import IllustrationFrame from '../IllustrationFrame.jsx';

export default function MetodosComportamentais({ images }) {
  const [foto] = images;

  return (
    <div className="relative">
      <h1 className="font-poppins font-semibold text-brand-dark text-2xl sm:text-3xl mb-6">Métodos comportamentais</h1>

      <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify mb-6">
        Os métodos comportamentais dependem da observação do próprio ciclo para identificar os dias férteis, sem uso
        de medicamentos ou dispositivos. Incluem a tabelinha (Ogino-Knaus), o controle da temperatura basal, o exame
        do muco cervical (Billings), o método sintotérmico e o coito interrompido.
      </p>

      <div className="mb-6">
        <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Métodos comportamentais'} className="w-full h-[280px]" />
        {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
      </div>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8">
        <p className="font-poppins font-bold text-brand-blue text-base mb-2">Olha só...</p>
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          esses métodos são pouco eficazes durante a adolescência, considerando que nessa fase de desenvolvimento
          muitas vezes não há regularidade no ciclo menstrual devido a mudanças hormonais.{' '}
          <span className="text-xs text-brand-darker">SBP (2023b); Brasil (2022).</span>
        </p>
      </div>
    </div>
  );
}
