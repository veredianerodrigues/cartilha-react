import Referencias from './sections/Referencias.jsx';
import { BLOCOS } from './sections/blocos/index.js';

// Junta os blocos conforme o campo "Na paginação" do Studio: um bloco marcado "Manter
// junto com o bloco seguinte" forma um grupo com o próximo (encadeando, se o próximo
// também estiver marcado). O grupo começa numa folha nova se o primeiro bloco pedir.
function agrupar(blocks) {
  const grupos = [];
  let atual = null;
  blocks.forEach((bloco, i) => {
    if (!atual) {
      atual = { blocos: [], novaFolha: bloco.quebra === 'novaFolha' };
      grupos.push(atual);
    }
    atual.blocos.push({ bloco, indice: i });
    if (bloco.quebra !== 'comProximo') atual = null;
  });
  return grupos;
}

// Conteúdo de uma seção, na ordem de leitura do Design System: título → subtítulo →
// blocos na ordem do Sanity. Quem divide em folhas é o LivroPaginas; aqui o conteúdo
// é um fluxo contínuo (fragmento, para cada parte ser filha direta das colunas). A
// seção de slug "referencias" mostra a lista de referências no lugar dos blocos.
export default function SectionView({ section }) {
  const { slug, title, subtitle, blocks } = section;

  const renderBloco = ({ bloco, indice }) => {
    const Bloco = BLOCOS[bloco._type];
    // O primeiro bloco, se for texto corrido, abre a página com o estilo abre-texto.
    return <Bloco key={bloco._key} bloco={bloco} abre={indice === 0} />;
  };

  return (
    <>
      <h1 className="font-titulo text-titulo-pagina text-tinta max-w-[80%] mb-6 break-inside-avoid break-after-avoid">{title}</h1>
      {subtitle && <p className="font-titulo text-subtitulo text-azul-texto -mt-2 break-after-avoid">{subtitle}</p>}

      {slug === 'referencias' ? (
        <Referencias />
      ) : (
        agrupar(blocks).map((grupo) => {
          // Bloco sem nenhum pedido de paginação: entra direto no fluxo, como sempre.
          if (grupo.blocos.length === 1 && !grupo.novaFolha) return renderBloco(grupo.blocos[0]);
          const classes = [
            grupo.blocos.length > 1 ? 'break-inside-avoid flow-root [&>*+*]:mt-6' : '',
            grupo.novaFolha ? 'break-before-column' : '',
          ].join(' ');
          return (
            <div key={grupo.blocos[0].bloco._key} className={classes}>
              {grupo.blocos.map(renderBloco)}
            </div>
          );
        })
      )}
    </>
  );
}
