import Referencias from './sections/Referencias.jsx';
import { BLOCOS } from './sections/blocos/index.js';

// Conteúdo de uma seção, na ordem de leitura do Design System: título → subtítulo →
// blocos na ordem do Sanity. Quem divide em folhas é o LivroPaginas; aqui o conteúdo
// é um fluxo contínuo (fragmento, para cada parte ser filha direta das colunas). A
// seção de slug "referencias" mostra a lista de referências no lugar dos blocos.
export default function SectionView({ section }) {
  const { slug, title, subtitle, blocks } = section;

  return (
    <>
      <h1 className="font-titulo text-titulo-pagina text-tinta max-w-[80%] mb-6 break-after-avoid">{title}</h1>
      {subtitle && <p className="font-titulo text-subtitulo text-azul-texto -mt-2 break-after-avoid">{subtitle}</p>}

      {slug === 'referencias' ? (
        <Referencias />
      ) : (
        blocks.map((bloco, i) => {
          const Bloco = BLOCOS[bloco._type];
          // O primeiro bloco, se for texto corrido, abre a página com o estilo abre-texto.
          return <Bloco key={bloco._key} bloco={bloco} abre={i === 0} />;
        })
      )}
    </>
  );
}
