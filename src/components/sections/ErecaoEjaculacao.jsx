import IllustrationFrame from '../IllustrationFrame.jsx';
import deco from '../../assets/page08/deco.svg';

export default function ErecaoEjaculacao({ images }) {
  const [imagem] = images;

  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.3] mb-6">
        O que é <span className="font-semibold">ereção e ejaculação</span> e quando acontece a primeira ejaculação?
      </h1>

      <div className="flex flex-col sm:flex-row gap-5 items-stretch">
        <div className="w-full sm:w-[220px] shrink-0">
          <IllustrationFrame
            src={imagem?.url}
            alt={imagem?.caption || 'Adolescente'}
            className="w-full min-h-[220px]"
          />
          {imagem?.caption && <p className="text-xs text-brand-darker mt-1">{imagem.caption}</p>}
        </div>

        <div className="relative flex-1 rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 space-y-4">
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            A ereção é o enrijecimento do pênis causado pelo aumento do fluxo de sangue nessa região. Na adolescência,
            ela pode ocorrer em resposta ao desejo sexual, mas também é comum acontecer de forma espontânea e
            involuntária, como parte do desenvolvimento normal do organismo. Já a ejaculação é a saída do sêmen pelo
            pênis. O sêmen é um líquido esbranquiçado que tem a função de nutrir e transportar os espermatozoides.
          </p>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Como mencionado, a primeira ejaculação do menino é chamada de espermarca e geralmente ocorre por volta
            dos 13 anos, embora possa acontecer em idades diferentes. Ela pode ocorrer durante o sono, em um
            fenômeno normal conhecido como polução noturna, ou em outras situações. A espermarca representa um
            importante marco da puberdade e indica que o sistema reprodutor masculino está amadurecendo e
            adquirindo capacidade reprodutiva.
          </p>
          <p className="text-xs text-brand-darker">Krishna; Witchel, 2024; Graber, 2025, WHO, 2022.</p>
        </div>
      </div>
    </div>
  );
}
