import Heading from './blocks/Heading.jsx';
import Paragraph from './blocks/Paragraph.jsx';
import Callout from './blocks/Callout.jsx';
import QuoteGrid from './blocks/QuoteGrid.jsx';
import ListBlock from './blocks/ListBlock.jsx';
import ImageBlock from './blocks/ImageBlock.jsx';
import PageDecoration from './PageDecoration.jsx';
import PubertyIntroRow from './PubertyIntroRow.jsx';

const BLOCK_COMPONENTS = {
  heading: Heading,
  paragraph: Paragraph,
  callout: Callout,
  quote_grid: QuoteGrid,
  list: ListBlock,
  image: ImageBlock,
};

// A página 5 do folheto original combina dois tópicos (puberdade / corpo humano) numa
// única página, cada um com ilustração + cartão lado a lado — algo que os blocos genéricos
// não reproduzem quando só empilhados. Tratado à parte, só para essa seção.
const PUBERTY_ROW_SLUG = 'adolescencia-chegou';

function extractPubertyRows(blocks) {
  const rows = [];
  let i = 0;
  while (i < blocks.length && blocks[i]?.type === 'image') {
    const image = blocks[i];
    const text = blocks[i + 1]?.type === 'paragraph' ? blocks[i + 1] : null;
    const citation = blocks[i + 2]?.type === 'paragraph' ? blocks[i + 2] : null;
    rows.push({ image, text, citation });
    i += citation ? 3 : text ? 2 : 1;
  }
  return { rows, rest: blocks.slice(i) };
}

export default function SectionView({ title, blocks, slug }) {
  const isPubertyPage = slug === PUBERTY_ROW_SLUG && blocks[0]?.type === 'image';
  const { rows, rest } = isPubertyPage ? extractPubertyRows(blocks) : { rows: [], rest: blocks };

  return (
    <article className="relative w-full max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 overflow-hidden">
      <PageDecoration />
      <h1 className="relative font-poppins font-light text-brand-dark text-2xl sm:text-3xl md:text-[32px] leading-[1.44] mb-6">
        {title}
      </h1>
      {rows.map((row, i) => (
        <PubertyIntroRow
          key={row.image.id}
          image={row.image.image_url}
          imageAlt={row.image.image_caption || ''}
          heading={i === 0 ? row.image.heading : null}
          headingAbove={i > 0 ? row.image.heading : null}
          body={row.text?.body}
          citation={row.citation?.body}
          reverse={i > 0}
        />
      ))}
      {rest.map((block) => {
        const Component = BLOCK_COMPONENTS[block.type];
        return Component ? <Component key={block.id} block={block} /> : null;
      })}
    </article>
  );
}
