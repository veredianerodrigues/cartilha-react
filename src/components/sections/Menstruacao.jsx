import IllustrationFrame from '../IllustrationFrame.jsx';
import deco13 from '../../assets/page13/deco.svg';
import deco14 from '../../assets/page14/deco.svg';
import deco15a from '../../assets/page15/deco1.svg';
import deco15b from '../../assets/page15/deco2.svg';

export default function Menstruacao({ images }) {
  const [ciclo, foto] = images;

  return (
    <div className="relative space-y-6">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[45%] max-w-[300px] -z-10" src={deco13} />

      <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-center">
        <h1 className="font-poppins font-light text-brand-dark text-2xl sm:text-3xl leading-[1.4] flex-1">
          E a <span className="font-semibold uppercase">menstruação...</span>
          <br />o que é
          <br />e como acontece?
        </h1>
        <div className="w-full sm:w-[240px] shrink-0">
          <IllustrationFrame src={foto?.url} alt={foto?.caption || 'Adolescente'} className="w-full h-[220px]" />
          {foto?.caption && <p className="text-xs text-brand-darker mt-1">{foto.caption}</p>}
        </div>
      </div>

      <div className="rounded-[24px] sm:rounded-[40px] bg-brand-blue p-6 sm:p-8">
        <p className="font-worksans font-medium text-white text-sm leading-[24px] tracking-[0.14px] text-justify">
          O amadurecimento dos órgãos reprodutores leva ao início da menstruação, chamada menarca. A menarca
          representa uma importante etapa do desenvolvimento reprodutivo feminino e ocorre, em média, por volta dos
          12 anos, podendo acontecer normalmente entre os 9 e os 15 anos. Ela indica que o organismo está
          adquirindo capacidade reprodutiva.{' '}
          <span className="text-xs font-normal">Montenegro; Rezende Filho, 2022; FEBRASGO, 2017.</span>
        </p>
      </div>

      <div className="relative">
        <img alt="" className="absolute pointer-events-none -top-[6%] -right-[6%] w-[35%] max-w-[220px] -z-10" src={deco14} />

        <div className="rounded-[24px] sm:rounded-[40px] bg-[#f5f5ef] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4 sm:p-6 mb-6">
          <IllustrationFrame src={ciclo?.url} alt={ciclo?.caption || 'Ciclo menstrual'} fit="contain" className="w-full mb-3" />
          {ciclo?.caption && <p className="font-worksans text-xs text-brand-darker text-center italic">{ciclo.caption}</p>}
        </div>

        <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 space-y-4">
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            O ciclo menstrual corresponde ao período entre o primeiro dia de uma menstruação e o primeiro dia da
            seguinte. Durante esse ciclo, os hormônios estimulam o amadurecimento do óvulo e sua liberação pelo
            ovário (ovulação). Após a ovulação, a progesterona prepara o útero para uma possível gravidez.
          </p>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            Caso a fecundação não ocorra — seja por não ter praticado relação sexual ou por ter usado um método
            contraceptivo, como a camisinha —, os níveis desses hormônios baixam, provocando a descamação do
            endométrio (camada interna do útero), que é eliminada pela vagina na forma de sangue, caracterizando a
            menstruação.
          </p>
          <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
            O fluxo menstrual costuma durar de 3 a 7 dias. Nos primeiros anos após a menarca, é comum que o ciclo
            menstrual varie entre 21 e 45 dias. Com o amadurecimento do organismo, tende a se tornar mais regular,
            variando geralmente entre 21 e 35 dias.
          </p>
          <div>
            <p className="font-poppins font-bold text-brand-blue text-base mb-1">Fique atenta...</p>
            <p className="font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify">
              Nos primeiros anos após a menarca, é comum que o ciclo menstrual seja irregular, pois o organismo
              ainda está amadurecendo.
            </p>
          </div>
          <p className="text-xs text-brand-darker">Montenegro; Rezende Filho (2022); SBP (2023a).</p>
        </div>
      </div>

      <div className="relative pb-8">
        <img alt="" className="absolute pointer-events-none -bottom-[4%] -left-[8%] w-[35%] max-w-[220px] -z-10" src={deco15a} />
        <img alt="" className="absolute pointer-events-none -top-[6%] -right-[6%] w-[30%] max-w-[200px] -z-10" src={deco15b} />

        <div className="rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] p-6 sm:p-8 mb-6">
          <h2 className="font-poppins text-brand-dark text-xl sm:text-2xl leading-[1.4] mb-3">
            <span className="font-semibold">Você sabia</span>...
          </h2>
          <p className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify">
            A precocidade ou atraso na ocorrência da menarca são influenciados por diversos fatores como a
            hereditariedade, fatores nutricionais, físicos, emocionais, exercício, gordura corporal e contexto
            social <span className="text-xs">(Gemelli; Farias; Spitzer, 2020).</span>
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <p className="font-poppins font-bold text-brand-blue text-base mb-2">E tem mais:</p>
            <p className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify">
              na adolescência, é possível engravidar antes mesmo da primeira menstruação. Por outro lado, também é
              comum que os primeiros ciclos menstruais sejam anovulatórios (ou seja, sem a liberação de um óvulo).
              Isso acontece porque o corpo ainda está passando por um amadurecimento hormonal e pode não produzir os
              picos de hormônios necessários para a ovulação. Por conta dessa imaturidade fisiológica natural da
              idade, a jovem pode apresentar ciclos irregulares e sangramentos inesperados, situações que fazem
              parte do ajuste normal do organismo nessa fase <span className="text-xs">(SBP, 2023a).</span>
            </p>
          </div>
          <div>
            <p className="font-poppins font-bold text-brand-blue text-base mb-2">Portanto recomenda-se...</p>
            <p className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify">
              que a adolescente registre em um calendário as datas dos ciclos, ou seja: "[...] a cada mês, o dia que
              inicia e o dia que termina o sangramento. Por exemplo: começou no dia 13 de janeiro e terminou no dia
              17 [...]" <span className="text-xs">(Brasil, 2012b, p. 36).</span>
            </p>
          </div>
          <p className="font-worksans text-brand-darker text-sm leading-[22px] tracking-[0.14px] text-justify">
            E ainda... existem aplicativos gratuitos que auxiliam no registro da menstruação, previsão da próxima
            menstruação, período fértil e sintomas relacionados ao ciclo.
          </p>
        </div>
      </div>
    </div>
  );
}
