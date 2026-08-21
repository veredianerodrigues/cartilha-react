import PageHero from '../PageHero.jsx';
import Paragraph from './shared/Paragraph.jsx';

export default function Apresentacao({ texts = [] }) {
  return (
    <div className="relative">
      <PageHero title="Apresentação" pageLabel="04" />
      <div className="space-y-4">
        {texts.map((html, i) => (
          <Paragraph key={i} html={html} />
        ))}
      </div>
    </div>
  );
}
