import deco from '../assets/page22/deco.svg';

export default function Page22() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">22</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[26px] left-[54px] top-[25px] w-[500px]" style={{ lineHeight: '1.3' }}>
        Anticoncepcionais hormonais
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '105px', width: '493px', height: '715px' }} />
      <div className="absolute font-worksans text-black text-[13.5px] text-justify tracking-[0.14px] leading-[20px] left-[80px] top-[124px] w-[441px]">
        <p className="mb-[12px]">
          Os anticoncepcionais trouxeram liberdade para as mulheres, porque permitem que elas planejem com segurança
          se e quando querem engravidar.
        </p>
        <p className="mb-[12px]">
          A maioria desses métodos são chamados de Anticoncepcionais Hormonais Combinados (AHC) porque juntam dois
          hormônios: o estrogênio e a progesterona.
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">Como eles funcionam?</p>
        <p className="mb-[12px]">
          A progesterona age fazendo com que o corpo não libere nenhum óvulo (um processo chamado de anovulação).
          Sem um óvulo disponível, o espermatozoide não tem quem fecundar e a gravidez simplesmente não acontece.
        </p>
        <p className="mb-[12px]">
          Esses hormônios podem ser colocados no corpo de várias formas (como adesivos na pele, comprimidos ou
          injeções), mas o formato mais conhecido e utilizado no Brasil e no mundo é a chamada pílula
          anticoncepcional. Ela é um método reversível: se a mulher parar de tomar, o corpo volta a ovular
          normalmente e ela pode engravidar.
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">Como você sabe...</p>
        <p className="mb-[12px]">
          A pílula não protege contra Infecções Sexualmente Transmissíveis (ISTs). Para se proteger delas, o único
          método indicado é o uso da camisinha (masculina ou feminina) em todas as relações.
        </p>
        <p className="mb-[6px]">Para o sucesso da pílula, duas regras são fundamentais:</p>
        <ul className="list-disc pl-[18px] space-y-[6px] mb-[12px]">
          <li><span className="font-semibold">Zero esquecimentos:</span> Ela precisa ser tomada todos os dias, de preferência rigorosamente no mesmo horário.</li>
          <li>
            <span className="font-semibold">Cuidado com outros remédios:</span> Alguns medicamentos podem cortar ou
            diminuir o efeito da pílula no organismo. Por isso, sempre avise ao médico ou dentista que você toma
            pílula antes de começar qualquer tratamento{' '}
            <span className="text-[11px]">(FEBRASGO, 2025, SBP, 2023).</span>
          </li>
        </ul>
        <p className="font-poppins font-bold text-[#289dd2] text-[15px] mb-[8px]">Como usar?</p>
        <ul className="list-disc pl-[18px] space-y-[8px] mb-0">
          <li>
            <span className="font-semibold">Primeira vez de uso:</span> se a pílula for iniciada até o 5º dia da
            menstruação, a proteção contra a gravidez é imediata. Se for iniciada após esse período, ela também pode
            ser usada, desde que não haja gravidez, mas será necessário utilizar camisinha ou evitar relações
            sexuais durante os primeiros 7 dias.
          </li>
          <li>
            <span className="font-semibold">Troca de outro método hormonal:</span> se o método anterior estava sendo
            utilizado corretamente e não há suspeita de gravidez, a pílula pode ser iniciada imediatamente, sem
            precisar esperar a próxima menstruação. Nesse caso, não é necessário utilizar um método de apoio.
          </li>
          <li>
            <span className="font-semibold">Troca do anticoncepcional injetável:</span> a pílula pode ser iniciada
            na data em que seria aplicada a próxima injeção, sem necessidade de utilizar um método de apoio.
          </li>
          <li>
            <span className="font-semibold">Após usar a pílula do dia seguinte:</span> a pílula anticoncepcional
            pode ser iniciada imediatamente, sem esperar a próxima menstruação. Quem já utilizava a pílula deve
            continuar a cartela normalmente. É necessário usar camisinha ou evitar relações sexuais durante os
            primeiros 7 dias <span className="text-[11px]">(WHO, 2022).</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
