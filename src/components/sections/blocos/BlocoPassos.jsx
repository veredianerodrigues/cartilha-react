import PortableTextView from '../shared/PortableTextView.jsx';
import IllustrationFrame from '../../IllustrationFrame.jsx';
import { urlFor, dimensoes } from '../../../lib/sanity.js';

// Passo a passo em HTML, no lugar de infográficos com texto dentro da imagem.
// Número em círculo azul-marca, título no estilo titulo-caixa, texto no corpo; o
// desenho opcional fica ao lado (embaixo em colunas estreitas). Cada passo não se
// divide entre duas folhas do livro.
// O desenho fica à direita do texto; quando a coluna é estreita (celular), o flex-wrap
// o leva para baixo do texto.
function Passo({ passo, numero }) {
  return (
    <li className="break-inside-avoid flex gap-3 rounded-caixa bg-neutro-claro p-4">
      <span
        aria-hidden="true"
        className="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-azul-marca text-papel font-titulo font-bold text-base"
      >
        {numero}
      </span>
      <div className="min-w-0 flex-1 flex flex-wrap gap-x-4 gap-y-3">
        <div className="flex-[1_1_200px] min-w-0">
          <p className="font-titulo text-titulo-caixa text-tinta mb-1 mt-1.5">{passo.titulo}</p>
          <PortableTextView value={passo.texto} />
        </div>
        {passo.imagem && (
          <div className="w-[140px] h-[110px] shrink-0 overflow-hidden rounded-cartao bg-papel">
            <IllustrationFrame
              src={urlFor(passo.imagem.imagem).width(400).url()}
              alt={passo.imagem.alt}
              largura={dimensoes(passo.imagem.imagem).largura}
              altura={dimensoes(passo.imagem.imagem).altura}
              imgClassName="block w-full h-full object-contain"
            />
          </div>
        )}
      </div>
    </li>
  );
}

export default function BlocoPassos({ bloco }) {
  return (
    <section className="text-tinta">
      {bloco.titulo && (
        <h2 className="font-titulo text-subtitulo text-azul-texto mt-8 mb-3 break-after-avoid">{bloco.titulo}</h2>
      )}
      <ol className="m-0 p-0 list-none space-y-3">
        {bloco.passos.map((passo, i) => (
          <Passo key={passo._key} passo={passo} numero={i + 1} />
        ))}
      </ol>

      {bloco.lembretes?.length > 0 && (
        <div className="break-inside-avoid mt-3 rounded-caixa bg-destaque text-sobre-destaque p-4 sm:p-5">
          <p className="font-titulo text-titulo-caixa mb-2">Importante</p>
          <ul className="m-0 pl-5 list-disc space-y-1.5 font-texto text-corpo">
            {bloco.lembretes.map((lembrete) => (
              <li key={lembrete}>{lembrete}</li>
            ))}
          </ul>
        </div>
      )}

      {bloco.nota && (
        <div className="break-inside-avoid mt-3 rounded-caixa bg-azul-claro p-4 sm:p-5">
          <PortableTextView value={bloco.nota} />
        </div>
      )}

      {bloco.fonte && <p className="mt-2 font-texto text-fonte-imagem italic text-tinta-suave">{bloco.fonte}</p>}
    </section>
  );
}
