import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function DireitosSexuaisReprodutivos() {
  return (
    <div className="relative">
      <PageHero
        pageLabel="23"
        title={
          <>
            <span className="font-semibold">Vamos falar sobre</span> direitos sexuais, reprodutivos ...
          </>
        }
      />

      <HighlightCard variant="blue">
        <Paragraph>
          As pessoas têm o direito de decidir se desejam ou não uma gestação, em que momento ela deve acontecer e
          quantos filhos querem ter. Para que esse direito seja exercido de forma consciente e responsável, é
          necessário o conhecimento sobre as formas e os dispositivos existentes com o objetivo de evitar esse
          evento. Como resultado de reivindicações coletivas, emergiu a noção de direitos à saúde sexual e
          reprodutiva, sendo definidos os direitos sexuais como a "[...] possibilidade de viver e expressar
          livremente a sexualidade sem violência, discriminações e imposições [...]. O direito do sexo seguro para
          prevenção da gravidez e de doenças sexualmente transmissíveis (DST) e Aids" (Brasil, 2010, p. 16). Os
          direitos reprodutivos referem-se à possibilidade "[...] de acesso a informações, meios, métodos e técnicas
          para ter ou não filhos" (Brasil, 2010, p. 15). Nesse sentido, deve ser garantido a todos os sujeitos
          sociais (adultos, jovens e adolescentes), de forma equitativa, os direitos sexuais e reprodutivos, como
          expressão do acesso integral à saúde.
        </Paragraph>
      </HighlightCard>

    </div>
  );
}
