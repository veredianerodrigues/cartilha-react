import deco from '../assets/page25/deco.svg';

export default function Page25() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">25</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[28px] left-[54px] top-[30px] w-[500px]" style={{ lineHeight: '1.3' }}>
        Anticoncepcionais hormonais
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '110px', width: '493px', height: '710px' }} />
      <div className="absolute font-worksans text-black text-[13.5px] text-justify tracking-[0.14px] leading-[20px] left-[80px] top-[130px] w-[441px]">
        <p className="mb-[12px]">Também... Existem outros dispositivos hormonais, são eles:</p>

        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">Anel Vaginal</p>
        <p className="mb-[10px]">
          É um anel de plástico bem flexível e macio que libera hormônios no corpo, impedindo a ovulação.
        </p>
        <p className="mb-[12px]">
          <span className="font-semibold">Como usar:</span> Você mesma coloca e retira o anel de dentro da vagina.
          Ele deve ficar lá dentro por 3 semanas seguidas. Na 4ª semana, você tira o anel para fazer uma pausa (que é
          quando a menstruação desce) e depois coloca um anel novo. É discreto, regula o ciclo e não altera em nada
          a saúde da sua região íntima. <span className="text-[11px]">(FEBRASGO, 2025; SBP, 2023b).</span>
        </p>

        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">Adesivo Anticoncepcional</p>
        <p className="mb-[10px]">
          É um adesivo que vai soltando hormônios direto na corrente sanguínea para bloquear a ovulação, bem fino e
          colante que você gruda na pele (pode ser no braço, nas costas ou na barriga) e troca por um novo uma vez
          por semana, durante 3 semanas. A 4ª semana é livre de adesivo (a semana de pausa para menstruar).
        </p>
        <p className="mb-[12px]">
          É um método moderno e seguro, bom para quem esquece de tomar remédio todo dia. Porém, como ele fica colado
          na pele, fica visível, o que algumas adolescentes podem não curtir. Pode causar uma leve coceira ou
          irritação na pele onde foi colado.{' '}
          <span className="text-[11px]">(FEBRASGO, 2025; SBP, 2023b).</span>
        </p>

        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">Contracepção de emergência (pílula do dia seguinte)</p>
        <p className="mb-[10px]">
          A pílula do dia seguinte é um método para ser usado apenas em emergências — como quando a camisinha
          estoura, sai do lugar ou você esquece de tomar o anticoncepcional comum.
        </p>
        <p className="mb-[10px]">Para que ela funcione e evite uma gravidez, o tempo é o fator mais importante.</p>
        <ul className="list-disc pl-[18px] space-y-[8px] mb-[12px]">
          <li>
            <span className="font-semibold">Eficácia máxima (12 a 24 horas):</span> o ideal é tomar a pílula o mais
            rápido possível. Se você tomar nas primeiras 12 a 24 horas após a relação desprotegida, a eficácia dela é
            máxima.
          </li>
          <li>
            <span className="font-semibold">Prazo da bula (até 3 dias):</span> a bula do medicamento garante o
            funcionamento seguro se tomado em até 72 horas (3 dias) após a relação.
          </li>
          <li>
            <span className="font-semibold">Limite máximo (até 5 dias):</span> a Organização Mundial da Saúde (OMS)
            afirma que a pílula ainda pode funcionar se tomada em até 120 horas (5 dias).
          </li>
        </ul>
        <p className="mb-[10px]">
          Mas atenção: a chance de o remédio falhar aumenta drasticamente a cada dia que passa. Se você deixar para
          tomar depois do terceiro dia, o risco de engravidar é bem maior.
        </p>
        <p>
          Lembre-se: ela se chama pílula &quot;do dia seguinte&quot;: quanto mais você demorar para tomar, menor
          será o efeito dela no organismo! <span className="text-[11px]">SBP (2023b)</span>
        </p>
      </div>
    </div>
  );
}
