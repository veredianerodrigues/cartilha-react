import PortableTextView from '../shared/PortableTextView.jsx';
import IllustrationFrame from '../../IllustrationFrame.jsx';
import { urlFor, dimensoes } from '../../../lib/sanity.js';

// Passo a passo / lista ilustrada em HTML, no lugar de infográficos com texto dentro
// da imagem. Três estilos (campo "Estilo" no Studio):
// - numerado: cartões com número em círculo (sequência de passos);
// - lista: os mesmos cartões, sem número (itens que não têm ordem);
// - grade: itens pequenos com foto redonda e legenda (ex.: sintomas).
// Nenhum item (nem a grade inteira) se divide entre duas folhas do livro, e o bloco
// começa abaixo de uma foto flutuante (clear), para a grade não ficar espremida. Na
// grade, o título vai junto com ela para a mesma folha.
//
// Tom informal, para o público jovem: cada cartão, a caixa da grade e as faixas são
// desenhados com formas orgânicas na mesma linguagem de curvas da capa, em pastel, sem
// contorno (a cor de fundo já separa da página). As bolhas da própria capa
// (src/assets/page00/group*.svg) ficam só atrás das fotos da grade: são quase ovais e,
// esticadas num cartão largo, cortariam os cantos onde fica o texto.

// Formas de cartão (viewBox 400 x 200): quase retangulares, com bordas onduladas e
// cantos arredondados de tamanhos diferentes, para cobrir toda a área do conteúdo.
const FORMAS_CARTAO = [
  'M38 4C110 -4 250 10 352 3C390 0 400 32 397 80C394 126 403 166 385 186C366 205 300 196 210 199C128 202 70 192 34 197C5 200 -2 166 2 120C6 72 -4 30 12 14C20 6 28 5 38 4Z',
  'M52 7C140 -1 262 11 360 5C393 3 401 40 398 96C395 148 402 180 371 194C330 207 230 193 140 197C80 200 30 203 14 182C-2 161 4 120 2 80C0 38 8 9 52 7Z',
  'M28 10C92 1 220 -3 340 6C385 9 399 26 399 70C400 120 395 160 392 178C386 201 340 197 260 196C170 194 90 203 40 196C8 192 -1 172 1 130C3 88 -4 40 6 22C12 12 18 11 28 10Z',
];

// As três bolhas cheias da capa (group0, group1 e group3), para as fotos da grade.
const BOLHAS_CAPA = [
  {
    viewBox: '0 0 267.463 226.925',
    d: 'M153.79 226.922C79.9738 227.184 0.290223 208.278 0.00116126 134.375C-0.303527 60.344 59.3879 0.261977 133.204 0.000257805C168.739 -0.0778672 171.001 17.6096 195.048 40.2307C220.9 64.5784 267.263 95.0823 267.462 133.407C267.618 207.328 227.603 226.66 153.79 226.922Z',
  },
  {
    viewBox: '0 0 427.564 362.01',
    d: 'M276.126 348.763C161.192 374.338 30.6181 372.119 5.12196 257.341C-20.4444 142.369 52.2079 28.6267 167.138 3.05243C222.485 -9.18194 232.005 17.5407 277.141 44.5056C325.681 73.5329 408.263 105.146 421.559 164.646C446.856 279.494 391.056 323.189 276.126 348.763Z',
  },
  {
    viewBox: '0 0 366.514 416.664',
    d: 'M264.483 78.3835C345.944 163.399 411.752 276.2 326.83 357.516C241.776 438.993 106.85 435.848 25.3888 350.837C-13.7752 309.852 4.13883 287.86 3.79118 235.282C3.44743 178.727 -12.3455 91.7233 31.6388 49.5007C116.725 -31.6868 183.022 -6.62823 264.483 78.3835Z',
  },
];

// Fundos pastel em rodízio.
const PASTEIS = ['fill-lilas-claro', 'fill-teal-claro', 'fill-rosa-claro', 'fill-amarelo-claro', 'fill-azul-claro'];

// Desenha o fundo esticado para ocupar o elemento. Forma e espelhamento mudam com o
// índice, para elementos vizinhos não ficarem iguais. O <svg> fica dentro de um <div>
// posicionado porque um svg absoluto só com os insets não estica (elemento substituído).
function Fundo({ forma, espelhada = false, cor }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
      <svg
        viewBox={forma.viewBox}
        preserveAspectRatio="none"
        className={`block w-full h-full overflow-visible ${espelhada ? '-scale-x-100' : ''}`}
      >
        <path d={forma.d} className={cor} />
      </svg>
    </div>
  );
}

const formaCartao = (indice) => ({
  forma: { viewBox: '0 0 400 200', d: FORMAS_CARTAO[indice % FORMAS_CARTAO.length] },
  espelhada: Math.floor(indice / FORMAS_CARTAO.length) % 2 === 1,
});

const bolhaCapa = (indice) => ({
  forma: BOLHAS_CAPA[indice % BOLHAS_CAPA.length],
  espelhada: Math.floor(indice / BOLHAS_CAPA.length) % 2 === 1,
});

function Desenho({ imagem, className }) {
  const { largura, altura } = dimensoes(imagem.imagem);
  return (
    <IllustrationFrame
      src={urlFor(imagem.imagem).width(400).url()}
      alt={imagem.alt}
      largura={largura}
      altura={altura}
      imgClassName={className}
    />
  );
}

// Cartão de passo ou de lista: bolha pastel, título grande e encorpado, desenho solto
// à direita do texto. O padding é maior que numa caixa reta, porque a bolha recolhe nos
// cantos. Em coluna estreita (celular), o flex-wrap leva o desenho para baixo do texto.
function Cartao({ item, numero, indice }) {
  return (
    <li className="relative break-inside-avoid flex gap-3 px-7 py-6">
      <Fundo {...formaCartao(indice)} cor={PASTEIS[indice % PASTEIS.length]} />
      {numero && (
        <span
          aria-hidden="true"
          className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-tinta-forte text-papel font-titulo font-bold text-lg"
        >
          {numero}
        </span>
      )}
      <div className="relative min-w-0 flex-1 flex flex-wrap items-center gap-x-4 gap-y-3">
        <div className="flex-[1_1_170px] min-w-0">
          <p className={`font-titulo text-subtitulo font-bold text-tinta-forte mb-1.5 ${numero ? 'mt-1' : ''}`}>
            {item.titulo}
          </p>
          {item.texto && <PortableTextView value={item.texto} />}
        </div>
        {item.imagem && (
          <div className="shrink-0">
            <Desenho imagem={item.imagem} className="block w-auto h-auto max-w-[130px] max-h-[110px] rounded-2xl" />
          </div>
        )}
      </div>
    </li>
  );
}

// Item da grade: foto redonda com borda branca sobre uma bolha pastel da capa.
function ItemGrade({ item, indice }) {
  return (
    <li className="break-inside-avoid flex flex-col items-center text-center gap-2">
      {item.imagem && (
        <div className="relative w-[96px] h-[90px] flex items-center justify-center">
          <Fundo {...bolhaCapa(indice + 1)} cor={PASTEIS[(indice + 2) % PASTEIS.length]} />
          <div className="relative w-[76px] h-[76px] overflow-hidden rounded-full bg-papel ring-4 ring-papel">
            <Desenho imagem={item.imagem} className="block w-full h-full object-cover" />
          </div>
        </div>
      )}
      <p className="m-0 font-texto text-legenda font-semibold text-tinta-forte">{item.titulo}</p>
      {item.texto && <PortableTextView value={item.texto} className="!text-legenda" />}
    </li>
  );
}

export default function BlocoPassos({ bloco }) {
  const grade = bloco.estilo === 'grade';

  return (
    <section className={`clear-both text-tinta ${grade ? 'break-inside-avoid' : ''}`}>
      {bloco.titulo && (
        <h2
          className={`font-titulo text-azul-texto break-after-avoid ${
            grade ? 'text-titulo-caixa mt-6 mb-3' : 'text-subtitulo mt-8 mb-3'
          }`}
        >
          {bloco.titulo}
        </h2>
      )}

      {grade ? (
        <div className="relative break-inside-avoid px-7 py-6">
          <Fundo {...formaCartao(1)} cor="fill-amarelo-claro" />
          {/* "Imagem ao lado": a imagem na primeira coluna (25%) e a grade no resto. O
              multiply faz um fundo branco da foto assumir a cor da forma. */}
          <div className="relative flex items-center gap-4">
            {bloco.imagemLateral && (
              <div className="w-1/4 shrink-0">
                <Desenho
                  imagem={bloco.imagemLateral}
                  className="block w-full h-auto object-contain mix-blend-multiply max-h-[calc(var(--altura-pagina)*0.5)]"
                />
              </div>
            )}
            <ul className="flex-1 min-w-0 m-0 p-0 list-none grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-x-3 gap-y-4">
              {bloco.passos.map((item, i) => (
                <ItemGrade key={item._key} item={item} indice={i} />
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <ol className="m-0 p-0 list-none space-y-4">
          {bloco.passos.map((item, i) => (
            <Cartao key={item._key} item={item} indice={i} numero={bloco.estilo === 'numerado' ? i + 1 : null} />
          ))}
        </ol>
      )}

      {bloco.lembretes?.length > 0 && (
        <div className="relative break-inside-avoid mt-4 px-7 py-6 text-sobre-destaque">
          <Fundo {...formaCartao(2)} cor="fill-destaque" />
          <p className="relative font-titulo text-titulo-caixa mb-2">Importante</p>
          <ul className="relative m-0 pl-5 list-disc space-y-1.5 font-texto text-corpo">
            {bloco.lembretes.map((lembrete) => (
              <li key={lembrete}>{lembrete}</li>
            ))}
          </ul>
        </div>
      )}

      {bloco.nota && (
        <div className="relative break-inside-avoid mt-4 px-7 py-6">
          <Fundo {...formaCartao(4)} cor="fill-azul-claro" />
          <PortableTextView value={bloco.nota} className="relative" />
        </div>
      )}

      {bloco.fonte && <p className="mt-2 font-texto text-fonte-imagem italic text-tinta-suave">{bloco.fonte}</p>}
    </section>
  );
}
