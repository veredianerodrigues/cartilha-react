import IllustrationFrame from '../IllustrationFrame.jsx';
import deco from '../../assets/page21/deco.svg';

export default function Diu({ images }) {
  const [diuImg, implanonImg] = images;

  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <h1 className="font-poppins font-semibold text-brand-dark text-2xl sm:text-3xl leading-[1.3] mb-6">
        Métodos de contracepção reversíveis de longa duração (LARC)
      </h1>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 space-y-5">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Os métodos contraceptivos de longa duração oferecem proteção eficaz contra a gravidez por vários anos, sem
          a necessidade de uso diário. São opções práticas, seguras e reversíveis, ou seja, a fertilidade pode
          retornar após sua retirada.
        </p>
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Dentre eles estão o Dispositivo Intrauterino (DIU) e o Implante subdérmico. O DIU é um pequeno objeto em
          formato de "T" colocado dentro do útero por um médico ou enfermeiro treinado. É um método de longa
          duração, extremamente seguro e muito recomendado para adolescentes por ser prático e não depender de
          esquecimentos. Existem dois tipos principais:
        </p>

        <div>
          <IllustrationFrame src={diuImg?.url} alt={diuImg?.caption || 'DIU'} fit="contain" className="w-full max-w-md mx-auto" />
          {diuImg?.caption && <p className="text-xs text-brand-darker text-center mt-1">{diuImg.caption}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-[20px] bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
            <p className="font-worksans text-sm text-black leading-[22px]">
              <span className="font-semibold">DIU de Cobre:</span> É totalmente gratuito e disponível para qualquer
              pessoa no SUS. Ele não possui hormônios, não impede a ovulação, mas cria um ambiente que inviabiliza o
              caminho dos espermatozoides. Tem validade de <span className="font-semibold">10 anos</span>.
            </p>
          </div>
          <div className="rounded-[20px] bg-white shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4">
            <p className="font-worksans text-sm text-black leading-[22px]">
              <span className="font-semibold">DIU Hormonal:</span> Libera uma quantidade baixa de hormônio
              diretamente no útero, afinando a parede interna (endométrio) e engrossando o muco do colo do útero
              para impedir a entrada dos espermatozoides. Tem validade de 5 anos e está disponível no SUS apenas
              para casos médicos específicos.
            </p>
          </div>
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Importante!</p>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Nenhum tipo de DIU protege contra Infecções Sexualmente Transmissíveis (ISTs). Por isso, o uso da
            camisinha continua sendo obrigatório em todas as relações.
          </p>
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">E ainda!</p>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Quando se orienta adolescentes quanto a métodos contraceptivos, deve-se apresentar todos os disponíveis,
            inclusive o DIU, pois os benefícios dos métodos intrauterinos extrapolam os riscos.
          </p>
        </div>

        <div className="pt-2 border-t border-slate-200">
          <h2 className="font-poppins font-semibold text-brand-dark text-lg mb-2">
            O implante de etonorgestrel (ISE), conhecido comercialmente no Brasil como Implanon®
          </h2>
          <IllustrationFrame
            src={implanonImg?.url}
            alt={implanonImg?.caption || 'Implanon'}
            fit="contain"
            className="w-full max-w-md mx-auto"
          />
          {implanonImg?.caption && <p className="text-xs text-brand-darker text-center mt-1 mb-4">{implanonImg.caption}</p>}
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Ele é um bastão bem pequeno e flexível implantado por profissional treinado debaixo da pele do braço. O
            procedimento é muito rápido e usa anestesia local. Ele impede que o corpo libere o óvulo, deixa o muco
            do útero grosso (o que bloqueia a entrada dos espermatozoides) e afina a parede interna do útero para
            evitar a gravidez. Este implante protege o corpo por até 3 anos seguidos. Se você quiser retirar antes
            desse tempo para engravidar ou mudar de método, pode pedir para tirar a qualquer momento. Para retirar,
            o profissional faz um corte minúsculo na pele, também com anestesia.
          </p>
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Importante:</p>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Assim como o DIU, ele fica dentro do corpo, não tem como você esquecer de usar. Por isso, a chance de
            falha é quase zero.
          </p>
        </div>

        <p className="text-xs text-brand-darker">
          SBP, 2023b; WHO, 2022. Fonte: Elaborado pela autora com auxílio do ChatGPT (OpenAI), 2026.
        </p>
      </div>
    </div>
  );
}
