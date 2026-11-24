import IllustrationFrame from '../../IllustrationFrame.jsx';
import { urlFor, dimensoes } from '../../../lib/sanity.js';
import forma from '../../../assets/page05/deco1.svg';

// As 3 molduras do Design System (componente Figura). A moldura vem do campo "Tipo de
// imagem" no Studio, não de ajustes caso a caso. A altura máxima é uma fração da altura
// de referência da tela (--altura-referencia, definida pelo leitor em LivroContinuo.jsx),
// para a imagem nunca passar da tela e o texto em volta continuar à vista.
// - Destaque (tamanho "pagina"): quase a tela toda, para infográficos densos;
// - Grande: 65%, imagem em destaque com o texto logo abaixo;
// - demais: metade da tela; retratos (decorativos) um pouco menos.
const ALTURAS = {
  pagina: { maxHeight: 'calc(var(--altura-referencia) * 0.9)' },
  grande: { maxHeight: 'calc(var(--altura-referencia) * 0.65)' },
};
const ALTURA_PADRAO = { maxHeight: 'calc(var(--altura-referencia) * 0.5)' };
const ALTURA_RETRATO = { maxHeight: 'calc(var(--altura-referencia) * 0.4)' };

function alturaMaxima(item, tamanho) {
  if (ALTURAS[tamanho]) return ALTURAS[tamanho];
  return item.tipo === 'retrato' ? ALTURA_RETRATO : ALTURA_PADRAO;
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

// No Destaque o cartão perde o padding e a borda: a imagem usa a largura toda da folha
// (as imagens deitadas são limitadas pela largura, não pela altura).
function Ilustracao({ item, src, largura, altura, alturaMax, semCartao }) {
  return (
    <div className={semCartao ? 'bg-papel' : 'rounded-cartao border border-fio bg-papel p-4 sm:p-6'}>
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

// Uma imagem com legenda ("Figura: …") e fonte, sempre abaixo da imagem. `tamanho` vem
// do bloco de imagem; nas grades e no meio do texto fica vazio (altura padrão).
export default function ImagemComLegenda({ item, tamanho, className = '' }) {
  const Moldura = MOLDURAS[item.tipo];
  const { largura, altura } = dimensoes(item.imagem);
  const src = urlFor(item.imagem).width(ALTURAS[tamanho] ? 1600 : 1200).url();

  return (
    <figure className={`m-0 ${className}`}>
      <Moldura
        item={item}
        src={src}
        largura={largura}
        altura={altura}
        alturaMax={alturaMaxima(item, tamanho)}
        semCartao={tamanho === 'pagina'}
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
