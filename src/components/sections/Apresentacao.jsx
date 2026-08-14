import PageHero from '../PageHero.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

export default function Apresentacao() {
  return (
    <div className="relative">
      <PageHero title="Apresentação" pageLabel="04" />
      <div className="space-y-4">
        <Paragraph>
          Ao longo da vida o ser humano passa por etapas, marcadas por transformações que constroem seu jeito de
          ser. Uma dessas etapas é a adolescência, na qual ocorre a passagem da infância para a vida adulta, momento
          em que mudanças físicas, emocionais e psicológicas são naturais. Nesse período algumas atitudes, decisões
          e ações podem marcar a vida toda.
        </Paragraph>
        <Paragraph>
          Você sabe em qual período da vida acontece a adolescência? Será que você está vivendo esse período? Será
          que já passou?
        </Paragraph>
        <Paragraph>
          A Organização Mundial da Saúde (OMS) define a adolescência como o período compreendido entre 10 e 19 anos
          de idade, classificação adotada também pelo Ministério da Saúde brasileiro nas políticas e ações voltadas
          à saúde do adolescente.<Cite n={[8, 24]} /> Entretanto, o Estatuto da Criança e do Adolescente (ECA)
          considera adolescente a pessoa com idade entre 12 e 18 anos incompletos, podendo, excepcionalmente,
          aplicar-se às pessoas entre 18 e 21 anos nos casos expressamente previstos em lei,<Cite n={7} /> além da
          idade, os aspectos sociais e psicológicos tem influência sobre esse momento, pois cada pessoa apresenta mudanças
          corporais, afetivas e de desenvolvimento de acordo com sua história particular, ou seja, cada um no seu
          tempo, poderá passar por algumas transformações.
        </Paragraph>
        <Paragraph>
          Na adolescência, juntamente com as várias transformações surge o despertar da sexualidade, que faz parte
          do desenvolvimento humano e manifesta-se por sensações e sentimentos. É natural que nesse período
          aconteça o namoro e a iniciação sexual, no entanto, quando os adolescentes têm dúvidas sobre as
          transformações do seu corpo, sobre as possíveis consequências da atividade sexual sem proteção, ou de
          forma precoce e imatura, pode acarretar conflitos e prejuízos com implicações em seus projetos futuros.
        </Paragraph>
        <Paragraph>
          Conversar sobre a adolescência, sobre interesses, emoções, namoro e, também informar-se sobre as
          transformações corporais que acontecem nessa fase é importante para que quando ocorrer o início da vida
          sexual, seja de forma consciente, responsável e saudável.
        </Paragraph>
        <Paragraph>Esperamos que as informações a seguir ajudem você...</Paragraph>
      </div>
    </div>
  );
}
