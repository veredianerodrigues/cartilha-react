import imagem from '../assets/page08/imagem.png';
import deco from '../assets/page08/deco.svg';

export default function Page08() {
  return (
    <div className="relative w-[595px] h-[842px] bg-white overflow-hidden">
      <img alt="" className="absolute pointer-events-none" style={{ left: '62.69%', top: '-17.22%', width: '58.74%', height: '35.65%' }} src={deco} />
      <p className="absolute font-worksans text-[#163341] text-[14px] left-[551px] top-[27px] tracking-[0.14px]">8</p>

      <div className="absolute font-poppins font-light text-black left-[54px] top-[50px] w-[239px]">
        <p className="mb-0 text-[32px]">
          O que é <span className="font-semibold">ereção e</span>
        </p>
        <p className="mb-0 text-[32px]">
          <span className="font-semibold">ejaculação</span> e quando
        </p>
        <p className="mb-0 text-[32px]">acontece a primeira</p>
        <p className="text-[32px]">ejaculação?</p>
      </div>

      <div className="absolute rounded-r-[50px] overflow-hidden" style={{ left: '0px', top: '385px', width: '240px', height: '420px' }}>
        <img alt="Ilustração" className="w-full h-full object-cover" src={imagem} />
      </div>

      <div className="absolute bg-[rgba(29,67,85,0.05)] rounded-[50px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]" style={{ left: '271px', top: '115px', width: '421px', height: '481px' }} />
      <div className="absolute font-worksans text-black text-[14px] text-justify tracking-[0.14px] leading-[22px] left-[305px] top-[155px] w-[350px]">
        <p className="mb-[18px]">
          A ereção é o enrijecimento do pênis causado pelo aumento do fluxo de sangue nessa região. Na adolescência,
          ela pode ocorrer em resposta ao desejo sexual, mas também é comum acontecer de forma espontânea e
          involuntária, como parte do desenvolvimento normal do organismo. Já a ejaculação é a saída do sêmen pelo
          pênis. O sêmen é um líquido esbranquiçado que tem a função de nutrir e transportar os espermatozoides.
        </p>
        <p className="mb-[18px]">
          Como mencionado, a primeira ejaculação do menino é chamada de espermarca e geralmente ocorre por volta dos
          13 anos, embora possa acontecer em idades diferentes. Ela pode ocorrer durante o sono, em um fenômeno
          normal conhecido como polução noturna, ou em outras situações. A espermarca representa um importante marco
          da puberdade e indica que o sistema reprodutor masculino está amadurecendo e adquirindo capacidade
          reprodutiva.
        </p>
        <p className="text-[12px]">Krishna; Witchel, 2024; Graber, 2025, WHO, 2022</p>
      </div>
    </div>
  );
}
