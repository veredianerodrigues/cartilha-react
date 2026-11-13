import IllustrationFrame from '../../IllustrationFrame.jsx';
import { urlFor, dimensoes } from '../../../lib/sanity.js';
import forma from '../../../assets/page05/deco1.svg';

// As 3 molduras do Design System (componente Figura). A moldura vem do campo "Tipo de
// imagem" no Studio, não de ajustes caso a caso. Nenhuma imagem passa da metade da
// altura da página (--altura-pagina, definida pelo livro em LivroPaginas.jsx), para a
// figura caber junto com algum texto e não sobrar meia página em branco. Na "Página
// inteira" ela usa a folha toda, menos o espaço da legenda.
const ALTURA_MAX = { maxHeight: 'calc(var(--altura-pagina) * 0.5)' };
const ALTURA_PAGINA = { maxHeight: 'calc(var(--altura-pagina) - 120px)' };

function Retrato({ item, src, largura, altura, alturaMax }) {
  // Pessoa sobre a forma orgânica em teal-claro. O multiply faz um fundo branco da foto
  // assumir a cor da forma; uma imagem sem fundo fica igual.
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-[14%] bg-teal-claro"
        style={{
          WebkitMask: `url(${forma}) center / 100% 100% no-repeat`,
          mask: `url(${forma}) center / 100% 100% no-repeat`,
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

function Cena({ item, src, largura, altura, alturaMax }) {
  return (
    <div className="aspect-[3/2] overflow-hidden rounded-tl-caixa rounded-br-caixa" style={alturaMax}>
      <IllustrationFrame
        src={src}
        alt={item.alt}
        largura={largura}
        altura={altura}
        imgClassName="block w-full h-full object-cover saturate-[.9]"
      />
    </div>
  );
}

function Ilustracao({ item, src, largura, altura, alturaMax }) {
  return (
    <div className="rounded-cartao border border-fio bg-papel p-4 sm:p-6">
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
export default function ImagemComLegenda({ item, paginaInteira = false, className = '' }) {
  const Moldura = MOLDURAS[item.tipo];
  const { largura, altura } = dimensoes(item.imagem);
  const src = urlFor(item.imagem).width(paginaInteira ? 1600 : 1200).url();

  return (
    <figure className={`m-0 break-inside-avoid ${className}`}>
      <Moldura
        item={item}
        src={src}
        largura={largura}
        altura={altura}
        alturaMax={paginaInteira ? ALTURA_PAGINA : ALTURA_MAX}
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
