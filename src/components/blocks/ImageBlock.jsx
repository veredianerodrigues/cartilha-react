import IllustrationFrame from '../IllustrationFrame.jsx';

export default function ImageBlock({ block }) {
  return (
    <figure className="my-6 max-w-xl mx-auto">
      <IllustrationFrame src={block.image_url} alt={block.image_caption || ''} />
      {block.image_caption && (
        <figcaption className="font-worksans text-xs text-brand-darker text-center mt-2">
          {block.image_caption}
        </figcaption>
      )}
    </figure>
  );
}
