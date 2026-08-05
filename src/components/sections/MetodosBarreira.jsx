import IllustrationFrame from '../IllustrationFrame.jsx';
import deco from '../../assets/page19/deco.svg';

const MASCULINA_STEPS = [
  'A camisinha deverá ser colocada assim que o pênis estiver ereto, antes de qualquer contato genital ou penetração.',
  'A ponta do preservativo (o reservatório) deverá ser apertada com os dedos para tirar o ar. Se o ar ficar ali dentro, o preservativo pode estourar durante a relação.',
  'Mantendo a ponta apertada, a camisinha deverá ser desenrolada da cabeça do pênis (glande) até a base.',
  'Para retirada segura, logo após a ejaculação, enquanto o pênis ainda estiver ereto, deverá ser retirado da vagina segurando firmemente a base da camisinha junto ao corpo para evitar que ela escorregue e o sêmen vaze.',
];

const FEMININA_STEPS = [
  'O anel interno é introduzido na vagina para manter o preservativo posicionado, enquanto o anel externo permanece fora da vagina, cobrindo parcialmente a vulva.',
  'Durante a relação sexual, o preservativo impede o contato do pênis e do esperma com a mucosa vaginal, reduzindo o risco de gravidez e contribuindo para a prevenção das infecções sexualmente transmissíveis (ISTs).',
  'Após a relação sexual, o preservativo deve ser retirado cuidadosamente, evitando o extravasamento do sêmen, e descartado no lixo, não devendo ser reutilizado.',
];

export default function MetodosBarreira({ images }) {
  const [masculina, feminina] = images;

  return (
    <div className="relative">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco} />

      <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.4] mb-6">
        Métodos de <span className="font-semibold uppercase">barreira</span>
      </h1>

      <div className="rounded-[24px] sm:rounded-[40px] bg-[#f5f5ef] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 space-y-6">
        <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
          Eles recebem esse nome porque criam uma barreira física que impede o espermatozoide de entrar no útero.
          Esse grupo inclui o diafragma, o capuz cervical, a esponja contraceptiva e os preservativos (camisinha)
          masculina e feminina.
        </p>

        <div>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Fique ligado!!</p>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Os mais utilizados são os preservativos ou camisinha masculina e feminina, e são os únicos métodos que,
            além de evitar a gravidez, protegem contra as Infecções Sexualmente Transmissíveis (ISTs). Ambas são
            distribuídas gratuitamente em qualquer unidade de saúde do SUS, sem necessidade de receita médica.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <h2 className="font-poppins flex-1">
            <span className="block text-xl sm:text-2xl text-brand-dark">Preservativo</span>
            <span className="block text-xl sm:text-2xl font-semibold text-brand-dark">masculino</span>
          </h2>
          <div className="w-full sm:w-[220px] shrink-0">
            <IllustrationFrame src={masculina?.url} alt={masculina?.caption || 'Preservativo masculino'} className="w-full h-[150px]" />
            {masculina?.caption && <p className="text-xs text-brand-darker mt-1">{masculina.caption}</p>}
          </div>
        </div>

        <div>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify mb-4">
            A camisinha masculina é um método contraceptivo de barreira, feito de látex ou outros materiais, que é
            colocado sobre o pênis ereto para evitar a gravidez e ajudar a prevenir as infecções sexualmente
            transmissíveis (ISTs).
          </p>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Como usar</p>
          <ul className="list-disc pl-5 space-y-2">
            {MASCULINA_STEPS.map((text, i) => (
              <li key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
                {text}
              </li>
            ))}
          </ul>
          <p className="text-xs text-brand-darker mt-3">BRASIL (2022); WHO (2022).</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center pt-4 border-t border-slate-200">
          <h2 className="font-poppins flex-1">
            <span className="block text-xl sm:text-2xl text-brand-dark">Preservativo</span>
            <span className="block text-xl sm:text-2xl font-semibold text-brand-dark">feminino</span>
          </h2>
          <div className="w-full sm:w-[220px] shrink-0">
            <IllustrationFrame src={feminina?.url} alt={feminina?.caption || 'Preservativo feminino'} className="w-full h-[150px]" />
            {feminina?.caption && <p className="text-xs text-brand-darker mt-1">{feminina.caption}</p>}
          </div>
        </div>

        <div>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify mb-4">
            A camisinha feminina também é um método contraceptivo de barreira, distribuído gratuitamente nas
            Unidades Básicas de Saúde e que não necessita de prescrição médica. É constituída por uma bolsa fina,
            flexível e resistente, com um anel em cada extremidade.
          </p>
          <p className="font-poppins font-bold text-brand-blue text-base mb-2">Como usar</p>
          <ul className="list-disc pl-5 space-y-2">
            {FEMININA_STEPS.map((text, i) => (
              <li key={i} className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
                {text}
              </li>
            ))}
          </ul>
          <p className="text-xs text-brand-darker mt-3">BRASIL (2022); WHO (2022).</p>
        </div>
      </div>
    </div>
  );
}
