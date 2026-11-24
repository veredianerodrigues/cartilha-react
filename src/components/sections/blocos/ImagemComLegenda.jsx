import IllustrationFrame from '../../IllustrationFrame.jsx';
import { urlFor, dimensoes } from '../../../lib/sanity.js';
import forma from '../../../assets/page05/deco1.svg';

// As 3 molduras do Design System (componente Figura). A moldura vem do campo "Tipo de
// imagem" no Studio, não de ajustes caso a caso. Nenhuma imagem passa da metade da
// altura da página (--altura-pagina, definida pelo livro em LivroPaginas.jsx), para a
// figura caber junto com algum texto e não sobrar meia página em branco. Na "Página
// inteira" ela usa a folha toda, menos o espaço da legenda.
const ALTURA_MAX = { maxHeight: 'calc(var(--altura-pagina) * 0.5)' };
// Desconta o cartão (padding e borda), a legenda e até duas linhas de fonte, para a
// figura inteira caber na folha e a fonte não escorregar sozinha para a seguinte.
const ALTURA_PAGINA = { maxHeight: 'calc(var(--altura-pagina) - 180px)' };
// Retratos são decorativos: mais baixos, para caber junto com o conteúdo seguinte.
const ALTURA_RETRATO = { maxHeight: 'calc(var(--altura-pagina) * 0.4)' };
// Tamanho "Grande": a imagem em destaque, com espaço para algumas linhas de texto
// embaixo na mesma folha (vale para qualquer moldura, inclusive retrato).
const ALTURA_GRANDE = { maxHeight: 'calc(var(--altura-pagina) * 0.65)' };

function alturaMaxima(item, paginaInteira, grande) {
  if (paginaInteira) return ALTURA_PAGINA;
  if (grande) return ALTURA_GRANDE;
  return item.tipo === 'retrato' ? ALTURA_RETRATO : ALTURA_MAX;
}

function Retrato({ item, src, largura, altura, alturaMax }) {
  // Pessoa sobre a forma orgânica em teal-claro. O multiply faz um fundo branco da foto
  // assumir a cor da forma; uma imagem sem fundo fica igual.
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[14%] bg-teal-claro"
        style={{
          WebkitMask: `url("${forma}") center / 100% 100% no-repeat`,
          mask: `url("${forma}") center / 100% 100% no-repeat`,
        }}
      />
      <IllustrationFrame
        src={src}
        alt={item.alt}
        largura={largura}
        altura={altura}
        imgClassName="relative block w-[86%] h-auto mx-auto object-contain mix-blend-multiply"
        style={alturaMax}
      />
    </div>
  );
}

// Foto sem borda nem espaçamento, com cantos em folha, na proporção original. Se passar
// da altura máxima, a foto inteira diminui (nunca é cortada: algumas têm balões de texto
// nas bordas); a moldura acompanha a largura da foto (w-fit) para os cantos aparecerem.
function Cena({ item, src, largura, altura, alturaMax }) {
  return (
    <div className="w-fit max-w-full mx-auto overflow-hidden rounded-tl-caixa rounded-br-caixa">
      <IllustrationFrame
        src={src}
        alt={item.alt}
        largura={largura}
        altura={altura}
        imgClassName="block w-auto max-w-full h-auto saturate-[.9]"
        style={alturaMax}
      />
    </div>
  );
}

// Na "Página inteira" o cartão perde o padding e a borda: a imagem usa a largura toda
// da coluna (as imagens deitadas são limitadas pela largura, não pela altura).
function Ilustracao({ item, src, largura, altura, alturaMax, paginaInteira }) {
  return (
    <div className={paginaInteira ? 'bg-papel' : 'rounded-cartao border border-fio bg-papel p-4 sm:p-6'}>
      <IllustrationFrame
        src={src}
        alt={item.alt}
        largura={largura}
        altura={altura}
        imgClassName="block w-auto max-w-full h-auto mx-auto object-contain"
        style={alturaMax}
      />
    </div>
  );
}

const MOLDURAS = { retrato: Retrato, cena: Cena, ilustracao: Ilustracao };

// Uma imagem com legenda ("Figura: …") e fonte, sempre abaixo da imagem.
// Na "Página inteira" a figura tem quase a altura da folha e fica centralizada nela (sem
// a margem de cima entre blocos, que a faria passar da folha). A folga de 8px deixa o
// marcador de fim do livro caber na mesma folha quando a figura fecha a seção.
export default function ImagemComLegenda({ item, paginaInteira = false, grande = false, className = '' }) {
  const Moldura = MOLDURAS[item.tipo];
  const { largura, altura } = dimensoes(item.imagem);
  const src = urlFor(item.imagem).width(paginaInteira || grande ? 1600 : 1200).url();

  return (
    <figure
      className={`m-0 break-inside-avoid ${paginaInteira ? '!mt-0 flex flex-col justify-center' : ''} ${className}`}
      style={paginaInteira ? { minHeight: 'calc(var(--altura-pagina) - 8px)' } : undefined}
    >
      <Moldura
        item={item}
        src={src}
        largura={largura}
        altura={altura}
        alturaMax={alturaMaxima(item, paginaInteira, grande)}
        paginaInteira={paginaInteira}
      />
      {(item.legenda || item.fonte) && (
        <figcaption className="mt-2 space-y-1 font-texto text-tinta-suave">
          {item.legenda && <p className="m-0 text-legenda">{item.legenda}</p>}
          {item.fonte && <p className="m-0 text-fonte-imagem italic">{item.fonte}</p>}
        </figcaption>
      )}
    </figure>
  );
}
