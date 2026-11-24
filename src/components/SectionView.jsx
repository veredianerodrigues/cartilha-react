import Referencias from './sections/Referencias.jsx';
import { BLOCOS } from './sections/blocos/index.js';

// Conteúdo de uma seção, na ordem de leitura do Design System: título → subtítulo →
// blocos na ordem do Sanity. O leitor (LivroContinuo) mostra tudo numa folha que se
// rola; aqui o conteúdo é um fluxo contínuo (fragmento, para cada parte ser filha
// direta da folha). A seção de slug "referencias" mostra a lista de referências no
// lugar dos blocos.
export default function SectionView({ section }) {
  const { slug, title, subtitle, blocks } = section;

  return (
    <>
      <h1 className="font-titulo text-titulo-pagina text-tinta max-w-[80%] mb-6">{title}</h1>
      {subtitle && <p className="font-titulo text-subtitulo text-azul-texto -mt-2">{subtitle}</p>}

      {slug === 'referencias' ? (
        <Referencias />
      ) : (
        blocks.map((bloco, indice) => {
          const Bloco = BLOCOS[bloco._type];
          // O primeiro bloco, se for texto corrido, abre a página com o estilo abre-texto.
          return <Bloco key={bloco._key} bloco={bloco} abre={indice === 0} />;
        })
      )}
    </>
  );
}
