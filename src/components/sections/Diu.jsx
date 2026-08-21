import IllustrationFrame from '../IllustrationFrame.jsx';
import PageHero from '../PageHero.jsx';
import TextCard from './shared/TextCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

export default function Diu({ images }) {
  const [diuImg, implanonImg] = images;

  return (
    <div className="relative">
      <PageHero
        pageLabel="15"
        weight="semibold"
        title="Métodos de contracepção reversíveis de longa duração (LARC)"
      />

      <TextCard className="space-y-5">
        <Paragraph className="font-semibold">
          Os métodos contraceptivos de longa duração oferecem proteção eficaz contra a gravidez por vários anos, sem
          a necessidade de uso diário. São opções práticas, seguras e reversíveis, ou seja, a fertilidade pode
          retornar após sua retirada.
        </Paragraph>
        <Paragraph className="font-semibold">Dentre eles estão o Dispositivo Intrauterino (DIU) e o Implante subdérmico.</Paragraph>
        <Paragraph>
          O DIU é um pequeno objeto em formato de "T" colocado dentro do útero por um{' '}
          <span className="font-semibold">médico ou enfermeiro treinado</span>. É um método de longa duração,
          extremamente seguro e muito recomendado para adolescentes por ser prático e não depender de
          esquecimentos. Existem dois tipos principais:
        </Paragraph>

        <div>
          <IllustrationFrame src={diuImg?.url} alt={diuImg?.caption || 'DIU'} fit="contain" className="w-full max-w-md mx-auto" rounded={false} />
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
              para impedir a entrada dos espermatozoides. Tem validade de <span className="font-semibold">5 anos</span> e
              está disponível no SUS apenas para casos médicos específicos.
            </p>
          </div>
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Importante!</p>
          <Paragraph>
            Nenhum tipo de DIU protege contra Infecções Sexualmente Transmissíveis (ISTs). Por isso, a camisinha
            continua sendo recomendada em todas as relações.
          </Paragraph>
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">E ainda!</p>
          <Paragraph>
            Quando se orienta adolescentes quanto a métodos contraceptivos, deve-se apresentar todos os disponíveis,
            inclusive o DIU, pois os benefícios dos métodos intrauterinos extrapolam os riscos.
          </Paragraph>
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
            rounded={false}
          />
          {implanonImg?.caption && <p className="text-xs text-brand-darker text-center mt-1 mb-4">{implanonImg.caption}</p>}
          <Paragraph>
            Ele é um bastão bem pequeno e flexível implantado por profissional treinado debaixo da pele do braço. O
            procedimento é muito rápido e usa anestesia local.
          </Paragraph>
          <Paragraph>
            Ele impede que o corpo libere o óvulo, deixa o muco do útero grosso (o que bloqueia a entrada dos
            espermatozoides) e afina a parede interna do útero para evitar a gravidez.
          </Paragraph>
          <Paragraph>
            <span className="font-semibold">Este implante</span> protege o corpo por{' '}
            <span className="font-semibold">até 3 anos seguidos</span>. Se você quiser retirar antes desse tempo
            para engravidar ou mudar de método, pode pedir para tirar a qualquer momento. Para retirar, o
            profissional faz um corte minúsculo na pele, também com anestesia.
            <Cite n={[19, 23]} />
          </Paragraph>
        </div>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-1">Importante:</p>
          <Paragraph>
            Assim como o DIU, ele fica dentro do corpo <span className="font-semibold">não tem como você esquecer
            de usar</span>. Por isso, a chance de falha é quase zero.
          </Paragraph>
        </div>

      </TextCard>

    </div>
  );
}
