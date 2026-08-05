import PubertyIntroRow from '../PubertyIntroRow.jsx';
import deco2 from '../../assets/page05/deco2.svg';
import deco1 from '../../assets/page05/deco1.svg';
import deco6a from '../../assets/page06/deco1.svg';
import deco6b from '../../assets/page06/deco2.svg';

export default function AdolescenciaChegou({ images }) {
  const [girl, boy] = images;

  return (
    <div className="relative">
      <div className="relative px-1">
        <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco2} />

        <h1 className="relative font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.44] mb-6">
          A adolescência chegou.... e agora?
        </h1>

        <PubertyIntroRow
          image={girl?.url}
          imageAlt="Adolescente pensativa"
          imageCaption={girl?.caption}
          heading="O Que é Puberdade?"
          body="A puberdade, início da adolescência, período de transformações físicas e biológicas, começa normalmente aos oito anos nas meninas e aos nove anos nos meninos e sua duração é de três a quatro anos em ambos os sexos."
          citation="(Castilho, Mattos; Pedrosa, 2024; Sartor; Fiorin; Sulbacher, 2025)."
        />

        <PubertyIntroRow
          reverse
          image={boy?.url}
          imageAlt="Adolescente pensativo"
          imageCaption={boy?.caption}
          headingAbove="O que acontece no corpo humano nesse período?"
          body="O comando para as transformações presentes na adolescência começa no cérebro. Uma glândula chamada hipófise libera dois hormônios: o LH (luteinizante) e o FSH (folículo-estimulante). Eles viajam pelo sangue e estimulam os órgãos sexuais. Nos meninos, os testículos passam a produzir testosterona (responsável pela voz mais grossa, pelos e desenvolvimento físico) e a produzir os espermatozoides. Nas meninas, os ovários passam a produzir estrogênio (estradiol) e progesterona, hormônios que atuam no amadurecimento dos óvulos e controlam o ciclo menstrual."
          citation="(Brasil, 2017; Krishna; Witchel, 2024)."
        />

        <img alt="" className="absolute pointer-events-none -bottom-[2%] -left-[8%] w-[35%] max-w-[220px] -z-10 opacity-70" src={deco1} />
      </div>

      <div className="relative mt-10 px-1 pb-4">
        <img alt="" className="absolute pointer-events-none -top-[10%] -right-[6%] w-[35%] max-w-[220px] -z-10" src={deco6a} />

        <div className="relative rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 mb-6">
          <h2 className="font-poppins font-light text-brand-dark text-xl sm:text-2xl mb-3">E tem mais...</h2>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Os caracteres sexuais primários correspondem aos órgãos do sistema reprodutor presentes desde o
            nascimento. Nas meninas, incluem os ovários, as tubas uterinas, o útero, a vagina e a vulva. Nos meninos,
            compreendem os testículos, o pênis, o escroto, as vesículas seminais e a próstata. Durante a puberdade,
            esses órgãos amadurecem e ocorre o desenvolvimento dos caracteres sexuais secundários. Nas meninas,
            destacam-se o desenvolvimento das mamas, o aparecimento dos pelos pubianos e axilares e o alargamento do
            quadril. Nos meninos, ocorre o aumento do volume dos testículos e do pênis, o aparecimento de pelos
            faciais, corporais, axilares e pubianos, o aumento da massa muscular e a mudança da voz.
          </p>
        </div>

        <div className="relative rounded-[24px] sm:rounded-[40px] bg-[rgba(40,157,210,0.19)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8">
          <h2 className="font-poppins font-light text-brand-dark text-xl sm:text-2xl mb-3">Portanto ...</h2>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            é importante entender a puberdade como um período relevante de transição e transformações físicas,
            fisiológicas e emocionais da vida de meninas e meninos, destacando que nesse momento o corpo do
            adolescente ganha algumas novas funcionalidades, principalmente no campo da sexualidade.{' '}
            <span className="text-xs text-brand-darker">SBP (2023a); Krishna; Witchel (2024).</span>
          </p>
        </div>

        <img alt="" className="absolute pointer-events-none -bottom-[4%] -left-[8%] w-[30%] max-w-[190px] -z-10" src={deco6b} />
      </div>
    </div>
  );
}
