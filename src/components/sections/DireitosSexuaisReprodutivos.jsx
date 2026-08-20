import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';
import Cite from './shared/Cite.jsx';

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

      <HighlightCard variant="blue" className="space-y-4">
        <Paragraph>
          As pessoas têm o direito de decidir se desejam ou não uma gestação, em que momento ela deve acontecer e
          quantos filhos querem ter, para que esse direito seja exercido de forma consciente e responsável é
          necessário o conhecimento sobre formas e dispositivos existentes com o objetivo de evitar esse evento.
        </Paragraph>
        <Paragraph>
          Como resultado de reivindicações coletivas emergiu à noção de direitos à saúde sexual e reprodutiva,
          sendo definido como direitos sexuais a "[...] possibilidade de viver e expressar livremente a
          sexualidade sem violência, discriminações e imposições [...], o direito do sexo seguro para prevenção
          da gravidez e de doenças sexualmente transmissíveis (DST) e Aids".
        </Paragraph>
        <Paragraph>
          Direitos reprodutivos referem-se à possibilidade "[...] de acesso a informações, meios, métodos e
          técnicas para ter ou não filhos.
        </Paragraph>
        <Paragraph>
          Nesse sentido, deve ser garantido a todos os sujeitos sociais (adultos, jovens e adolescentes), de forma
          equitativa os direitos sexuais e reprodutivos, como expressão do acesso integral à saúde.<Cite n={3} />
        </Paragraph>
      </HighlightCard>

    </div>
  );
}
