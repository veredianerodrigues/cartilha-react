import deco from '../assets/page21/deco.svg';

export default function Page21() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">21</p>

      <p className="absolute font-poppins font-semibold text-[#1d4355] text-[26px] left-[54px] top-[30px] w-[500px]" style={{ lineHeight: '1.3' }}>
        Métodos de contracepção reversíveis de longa duração (LARC)
      </p>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '54px', top: '135px', width: '493px', height: '680px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[82px] top-[158px] w-[437px]">
        <p className="mb-[14px]">
          Os métodos contraceptivos de longa duração oferecem proteção eficaz contra a gravidez por vários anos, sem
          a necessidade de uso diário. São opções práticas, seguras e reversíveis, ou seja, a fertilidade pode
          retornar após sua retirada.
        </p>
        <p className="mb-[14px]">Dentre eles estão o Dispositivo Intrauterino (DIU) e o Implante subdérmico.</p>
        <p className="mb-[14px]">
          O DIU é um pequeno objeto em formato de &quot;T&quot; colocado dentro do útero por um médico ou enfermeiro
          treinado. É um método de longa duração, extremamente seguro e muito recomendado para adolescentes por ser
          prático e não depender de esquecimentos. Existem dois tipos principais:
        </p>
        <p className="mb-[14px]">
          <span className="font-semibold">DIU de Cobre:</span> É totalmente gratuito e disponível para qualquer
          pessoa no SUS. Ele não possui hormônios, não impede a ovulação, mas cria um ambiente que inviabiliza o
          caminho dos espermatozoides. Tem validade de <span className="font-semibold">10 anos</span>.
        </p>
        <p className="mb-[14px]">
          <span className="font-semibold">DIU Hormonal:</span> Libera uma quantidade baixa de hormônio diretamente
          no útero, afinando a parede interna (endométrio) e engrossando o muco do colo do útero para impedir a
          entrada dos espermatozoides. Tem validade de 5 anos e está disponível no SUS apenas para casos médicos
          específicos.
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Importante!</p>
        <p className="mb-[14px]">
          Nenhum tipo de DIU protege contra Infecções Sexualmente Transmissíveis (ISTs). Por isso, o uso da camisinha
          continua sendo obrigatório em todas as relações.
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">E ainda!</p>
        <p className="mb-[14px]">
          Quando se orienta adolescentes quanto a métodos contraceptivos, deve-se apresentar todos os disponíveis,
          inclusive o DIU, pois os benefícios dos métodos intrauterinos, extrapolam os riscos.
        </p>
        <p className="mb-[14px]">
          O implante de etonorgestrel (ISE) (conhecido comercialmente no Brasil como Implanon®) é um bastão bem
          pequeno e flexível implantado por profissional treinado debaixo da pele do braço. O procedimento é muito
          rápido e usa anestesia local.
        </p>
        <p className="mb-[14px]">
          Ele impede que o corpo libere o óvulo, deixa o muco do útero grosso (o que bloqueia a entrada dos
          espermatozoides) e afina a parede interna do útero para evitar a gravidez.
        </p>
        <p className="mb-[14px]">
          Este implante protege o corpo por até 3 anos seguidos. Se você quiser retirar antes desse tempo para
          engravidar ou mudar de método, pode pedir para tirar a qualquer momento. Para retirar, o profissional faz
          um corte minúsculo na pele, também com anestesia.
        </p>
        <p className="font-poppins font-bold text-[#289dd2] text-[16px] mb-[10px]">Importante:</p>
        <p className="mb-[10px]">
          Assim como o DIU, ele fica dentro do corpo, não tem como você esquecer de usar. Por isso, a chance de falha
          é quase zero.
        </p>
        <p className="text-[12px]">SBP, 2023b; WHO, 2022. Fonte: Elaborado pela autora com auxílio do ChatGPT (OpenAI), 2026.</p>
      </div>
    </div>
  );
}
