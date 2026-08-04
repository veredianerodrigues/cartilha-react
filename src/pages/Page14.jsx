import designSemNome3 from '../assets/page14/design-sem-nome3-2.png';
import deco from '../assets/page14/deco.svg';

export default function Page14() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">14</p>

      <div className="absolute bg-[#f5f5ef] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '46px', top: '0px', width: '500px', height: '470px', borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px' }} />

      <div className="absolute rounded-[50px] overflow-hidden" style={{ left: '85px', top: '71px', width: '419px', height: '365px' }}>
        <img alt="Ilustração ciclo menstrual" className="w-full h-full object-cover" src={designSemNome3} />
      </div>
      <p className="absolute font-worksans text-[10px] text-black left-[85px] top-[440px] w-[419px] text-center italic">
        Fonte: Ilustração criada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), baseada em Guyton;
        Hall (2021) e Krishna; Witchel (2024).
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '497px', width: '493px', height: '406px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[87px] top-[520px] w-[420px]">
        <p className="mb-[14px]">
          O ciclo menstrual corresponde ao período entre o primeiro dia de uma menstruação e o primeiro dia da
          seguinte. Durante esse ciclo, os hormônios estimulam o amadurecimento do óvulo e sua liberação pelo ovário
          (ovulação). Após a ovulação, a progesterona prepara o útero para uma possível gravidez.
        </p>
        <p className="mb-[14px]">
          Caso a fecundação não ocorra — seja por não ter praticado relação sexual ou por ter usado um método
          contraceptivo, como a camisinha —, os níveis desses hormônios baixam, provocando a descamação do
          endométrio (camada interna do útero), que é eliminada pela vagina na forma de sangue, caracterizando a
          menstruação.
        </p>
        <p className="mb-[14px]">
          O fluxo menstrual costuma durar de 3 a 7 dias. Nos primeiros anos após a menarca, é comum que o ciclo
          menstrual varie entre 21 e 45 dias. Com o amadurecimento do organismo, tende a se tornar mais regular,
          variando geralmente entre 21 e 35 dias.
        </p>
        <p className="font-bold text-[#289dd2] mb-1">Fique atenta...</p>
        <p className="mb-[10px]">
          Nos primeiros anos após a menarca, é comum que o ciclo menstrual seja irregular, pois o organismo ainda
          está amadurecendo.
        </p>
        <p className="text-[12px]">Montenegro; Rezende Filho (2022); SBP (2023a)</p>
      </div>
    </div>
  );
}
