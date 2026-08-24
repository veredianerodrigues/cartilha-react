import Heading from './blocks/Heading.jsx';
import Paragraph from './blocks/Paragraph.jsx';
import Callout from './blocks/Callout.jsx';
import QuoteGrid from './blocks/QuoteGrid.jsx';
import ListBlock from './blocks/ListBlock.jsx';
import ImageBlock from './blocks/ImageBlock.jsx';
import PageDecoration from './PageDecoration.jsx';
import { SECTION_LAYOUTS } from './sections/index.js';

const BLOCK_COMPONENTS = {
  heading: Heading,
  paragraph: Paragraph,
  callout: Callout,
  quote_grid: QuoteGrid,
  list: ListBlock,
  image: ImageBlock,
};

function extractImages(blocks) {
  return (blocks || [])
    .filter((b) => b.type === 'image')
    .map((b) => ({ url: b.image_url, caption: b.image_caption }));
}

// Parágrafos editáveis pelo /admin (rich text) para as seções bespoke que já
// migraram o texto pro banco — na ordem em que aparecem na página (order_index).
// Seções que ainda não migraram simplesmente recebem um array vazio e continuam
// com o texto hardcoded no próprio componente.
function extractParagraphs(blocks) {
  return (blocks || []).filter((b) => b.type === 'paragraph').map((b) => b.body || '');
}

// Igual extractParagraphs, mas indexado pela chave de slot (block.heading) em
// vez da ordem — usado pelas seções com cards/caixas de destaque, onde cada
// trecho de texto precisa ir dentro de um container específico do layout
// (ver fieldSchemas.js). Blocks sem heading (ex. os da Apresentação, que usa
// a lista posicional) simplesmente não entram aqui.
function extractFields(blocks) {
  const fields = {};
  for (const b of blocks || []) {
    if (b.type === 'paragraph' && b.heading) {
      fields[b.heading] = b.body || '';
    }
  }
  return fields;
}

// Igual extractParagraphs, mas mantendo a chave de estabilidade (block.heading)
// ao lado do texto, em ordem — usado pela Referências, onde a lista inteira é
// livre (add/mover/remover pelo admin), então não dá pra indexar por chave
// fixa como em extractFields. A chave aqui é o id ESTÁVEL da referência (ver
// migrateReferenciasText.js), não a posição de exibição.
function extractOrderedFields(blocks) {
  return (blocks || [])
    .filter((b) => b.type === 'paragraph')
    .map((b) => ({ key: b.heading, html: b.body || '' }));
}

function PageNumber({ pageLabel }) {
  if (!pageLabel) return null;
  return (
    <p className="absolute top-4 right-4 sm:top-6 sm:right-8 font-worksans text-brand-darker text-sm tracking-[0.14px]">
      {pageLabel}
    </p>
  );
}

export default function SectionView({ title, blocks, slug, pageLabel, page = 1 }) {
  const Layout = SECTION_LAYOUTS[slug];

  if (Layout) {
    // Todas as seções com layout bespoke já trazem seu próprio PageHero (blob
    // colorido por paridade + número embutido) — não duplicar com o PageNumber
    // genérico, que só serve pro fallback abaixo (seção criada no admin sem
    // design próprio ainda). `page` seleciona qual página física mostrar nas
    // seções com mais de uma (ver pageCounts.js).
    return (
      <article className="relative flex-1 w-full max-w-3xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-20 sm:pb-24 overflow-hidden">
        <Layout
          images={extractImages(blocks)}
          texts={extractParagraphs(blocks)}
          fields={extractFields(blocks)}
          orderedFields={extractOrderedFields(blocks)}
          page={page}
        />
      </article>
    );
  }

  // Seção sem layout fiel dedicado ainda (ex.: criada pelo admin sem design próprio) —
  // cai no renderizador genérico de blocos.
  return (
    <article className="relative flex-1 w-full max-w-3xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-20 sm:pb-24 overflow-hidden">
      <PageDecoration />
      <PageNumber pageLabel={pageLabel} />
      <h1 className="relative font-poppins font-light text-brand-dark text-2xl sm:text-3xl md:text-[32px] leading-[1.44] mb-6">
        {title}
      </h1>
      {blocks.map((block) => {
        const Component = BLOCK_COMPONENTS[block.type];
        return Component ? <Component key={block.id} block={block} /> : null;
      })}
    </article>
  );
}
