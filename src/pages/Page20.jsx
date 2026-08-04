import deco from '../assets/page20/deco.svg';

export default function Page20() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">20</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[32px] left-[54px] top-[50px] w-[460px]" style={{ lineHeight: '1.44' }}>
        Preservativo feminino
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '160px', width: '493px', height: '500px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[188px] w-[437px]">
        <p className="mb-[18px]">
          A camisinha feminina também é um método contraceptivo de barreira, distribuído gratuitamente nas Unidades
          Básicas de Saúde e que não necessita de prescrição médica. É constituído por uma bolsa fina, flexível e
          resistente, com um anel em cada extremidade.
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Como usar:</p>
        <p className="mb-[18px]">
          O anel interno é introduzido na vagina para manter o preservativo posicionado, enquanto o anel externo
          permanece fora da vagina, cobrindo parcialmente a vulva. Durante a relação sexual, o preservativo impede o
          contato do pênis e do esperma com a mucosa vaginal, reduzindo o risco de gravidez e contribuindo para a
          prevenção das infecções sexualmente transmissíveis (ISTs). Após a relação sexual, o preservativo deve ser
          retirado cuidadosamente, evitando o extravasamento do sêmen, e descartado no lixo, não devendo ser
          reutilizado <span className="text-[12px]">(BRASIL, 2022; WHO, 2022).</span>
        </p>
        <p className="text-[12px]">
          Fonte: Ilustração elaborada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), baseada nas
          recomendações da World Health Organization (2022) e do Ministério da Saúde do Brasil (2022).
        </p>
      </div>
    </div>
  );
}
