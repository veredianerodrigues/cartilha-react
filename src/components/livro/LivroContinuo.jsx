import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import NavegacaoLivro from './NavegacaoLivro.jsx';

// Forma orgânica do canto da folha (src/assets/page05/deco1.svg), em azul-marca a 14%.
function FormaCanto() {
  return (
    <svg
      viewBox="0 0 345 301"
      aria-hidden="true"
      className="pointer-events-none absolute -top-[70px] -right-[60px] w-[240px] opacity-[0.14]"
    >
      <path
        className="fill-azul-marca"
        d="M1.71742 55.7421C-13.806 -18.3868 79.1237 5.52727 150.631 1.63665C171.147 0.456958 257.862 -6.50789 276.905 21.1991C299.589 54.0038 287.811 73.9374 332.909 160.488C357.397 207.66 341.667 271.25 308.788 292.832C265.971 320.91 153.717 263.941 121.897 194.953C81.1901 106.289 18.9596 138.301 1.71742 55.7421Z"
      />
    </svg>
  );
}

// Leitor de uma seção: o conteúdo inteiro numa folha de papel longa, que se rola. Sem
// folhas de altura fixa, nenhum bloco empurra o seguinte para outra página e não sobra
// espaço em branco. A barra embaixo leva à seção anterior ou à próxima; as setas do
// teclado fazem o mesmo.
//
// --altura-referencia é a altura de tela usada pelos blocos como limite das imagens
// (metade, 65%…), para uma figura nunca ficar mais alta que a tela.
export default function LivroContinuo({
  children,
  rubrica,
  esconderRubrica,
  folio,
  ancora,
  direcao,
  onSecaoAnterior,
  onProximaSecao,
  posicao, // { indice, total } da seção na cartilha
}) {
  const folhaRef = useRef(null);
  const [lido, setLido] = useState(0);

  // Citação (#ref-N): rola até a entrada assim que o conteúdo está montado.
  useLayoutEffect(() => {
    if (!ancora) return;
    folhaRef.current.querySelector(ancora)?.scrollIntoView({ block: 'center' });
  }, [ancora]);

  // Quanto da seção já passou pela tela, para a barra de progresso da cartilha.
  useEffect(() => {
    function medir() {
      const folha = folhaRef.current.getBoundingClientRect();
      const percorrido = window.innerHeight - folha.top;
      setLido(Math.min(1, Math.max(0, percorrido / folha.height)));
    }
    medir();
    window.addEventListener('scroll', medir, { passive: true });
    window.addEventListener('resize', medir);
    return () => {
      window.removeEventListener('scroll', medir);
      window.removeEventListener('resize', medir);
    };
  }, []);

  useEffect(() => {
    function teclado(event) {
      if (document.querySelector('[role="dialog"]')) return;
      if (event.key === 'ArrowRight') onProximaSecao?.();
      if (event.key === 'ArrowLeft') onSecaoAnterior();
    }
    window.addEventListener('keydown', teclado);
    return () => window.removeEventListener('keydown', teclado);
  }, [onSecaoAnterior, onProximaSecao]);

  const progresso = (posicao.indice + lido) / posicao.total;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 px-2 sm:px-6 py-4 sm:py-8">
        <article
          ref={folhaRef}
          className={`relative mx-auto w-full max-w-[720px] overflow-hidden bg-papel shadow-pagina rounded-pagina ${
            direcao === 'anterior' ? 'folhear-anterior' : 'folhear-proximo'
          }`}
          style={{ '--altura-referencia': 'min(80vh, 760px)' }}
        >
          <FormaCanto />
          {!esconderRubrica && (
            <p className="relative m-0 mx-5 sm:mx-14 mt-6 pb-1.5 border-b border-fio font-texto text-rubrica uppercase text-tinta-suave truncate text-right">
              {rubrica}
            </p>
          )}
          <div className="relative flow-root px-5 sm:px-14 pt-10 pb-12 font-texto text-corpo text-tinta [&>*+*]:mt-6">
            {children}
          </div>
          {folio && (
            <p className="relative m-0 px-5 sm:px-14 pb-6 font-texto text-folio text-tinta-suave text-right">{folio}</p>
          )}
        </article>
      </div>
      <div className="sticky bottom-0 z-10">
        <NavegacaoLivro
          onAnterior={onSecaoAnterior}
          onProxima={onProximaSecao}
          rotulo={folio ? `p. ${folio}` : ''}
          progresso={progresso}
        />
      </div>
    </div>
  );
}
