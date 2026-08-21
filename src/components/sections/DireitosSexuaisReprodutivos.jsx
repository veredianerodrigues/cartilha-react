import PageHero from '../PageHero.jsx';
import HighlightCard from './shared/HighlightCard.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function DireitosSexuaisReprodutivos({ fields = {} }) {
  return (
    <div className="relative">
      <PageHero
        pageLabel="18"
        title={
          <>
            <span className="font-semibold">Vamos falar sobre</span> direitos sexuais, reprodutivos ...
          </>
        }
      />

      <HighlightCard variant="blue" className="space-y-4">
        <Paragraph html={fields.paragrafo_1} />
        <Paragraph html={fields.paragrafo_2} />
        <Paragraph html={fields.paragrafo_3} />
        <Paragraph html={fields.paragrafo_4} />
      </HighlightCard>

    </div>
  );
}
