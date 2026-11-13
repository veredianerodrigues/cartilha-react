import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { calcularMedidas, ALTURA_NAVEGACAO } from './medidas.js';
import NavegacaoLivro from './NavegacaoLivro.jsx';
import useSwipeNavigation from '../../hooks/useSwipeNavigation.js';

// Forma orgânica do canto da página (src/assets/page05/deco1.svg), em azul-marca a 14%.
function FormaCanto({ lado }) {
  return (
    <svg
      viewBox="0 0 345 301"
      aria-hidden="true"
      className={`pointer-events-none absolute -top-[70px] w-[240px] opacity-[0.14] ${
        lado === 'esquerda' ? '-left-[60px] -scale-x-100' : '-right-[60px]'
      }`}
    >
      <path
        className="fill-azul-marca"
        d="M1.71742 55.7421C-13.806 -18.3868 79.1237 5.52727 150.631 1.63665C171.147 0.456958 257.862 -6.50789 276.905 21.1991C299.589 54.0038 287.811 73.9374 332.909 160.488C357.397 207.66 341.667 271.25 308.788 292.832C265.971 320.91 153.717 263.941 121.897 194.953C81.1901 106.289 18.9596 138.301 1.71742 55.7421Z"
      />
    </svg>
  );
}

// Posição horizontal de um elemento dentro do conteúdo paginado, em coordenadas de
// layout (offsetLeft). Não usa getBoundingClientRect porque a animação de troca de
// seção gira a folha em 3D e distorce as medidas na tela enquanto roda.
function posicaoNoConteudo(el, conteudo) {
  const raiz = conteudo.offsetParent;
  let x = 0;
  for (let atual = el; atual && atual !== raiz; atual = atual.offsetParent) x += atual.offsetLeft;
  return x - conteudo.offsetLeft;
}

// Uma folha de papel: forma de canto, cabeça corrente (rubrica) e fólio, do lado externo.
function Folha({ medidas, lado, esquerda, vazia, rubrica, folio, sombra }) {
  const { margens } = medidas;
  const externo = lado === 'esquerda' ? { left: margens.externa } : { right: margens.externa };
  const alinhamento = lado === 'esquerda' ? 'text-left' : 'text-right';
  return (
    <div
      className={`absolute top-0 overflow-hidden bg-papel ${sombra}`}
      style={{ left: esquerda, width: medidas.largura, height: medidas.altura }}
    >
      {!vazia && <FormaCanto lado={lado} />}
      {!vazia && rubrica && (
        <p
          className={`absolute m-0 pb-1.5 border-b border-fio font-texto text-rubrica uppercase text-tinta-suave truncate ${alinhamento}`}
          style={{ top: margens.topo / 2 - 8, left: margens.externa, right: margens.externa }}
        >
          {rubrica}
        </p>
      )}
      {!vazia && folio && (
        <p className="absolute m-0 font-texto text-folio text-tinta-suave" style={{ bottom: 24, ...externo }}>
          {folio}
        </p>
      )}
    </div>
  );
}

// Leitor paginado de uma seção: o conteúdo é dividido em colunas do tamanho da área
// de texto da folha (CSS multi-column) e virar a página desloca uma coluna — ou duas,
// no espelho. O texto fica sempre no tamanho real; o que muda com a tela é quanto
// cabe por folha.
export default function LivroPaginas({
  children,
  rubrica,
  esconderRubricaNaAbertura,
  folio,
  abrirNoFim,
  ancora,
  direcao,
  onSecaoAnterior,
  onProximaSecao,
  posicao, // { indice, total } da seção na cartilha
}) {
  const areaRef = useRef(null);
  const conteudoRef = useRef(null);
  const fimRef = useRef(null);
  const [medidas, setMedidas] = useState(null);
  const [alturaArea, setAlturaArea] = useState(0);
  const [totalColunas, setTotalColunas] = useState(1);
  const [folha, setFolha] = useState(0);
  const [posicionado, setPosicionado] = useState(false);

  const medir = useCallback(() => {
    const area = areaRef.current;
    const altura = window.innerHeight - area.getBoundingClientRect().top - ALTURA_NAVEGACAO;
    setAlturaArea(altura);
    setMedidas(calcularMedidas(area.clientWidth, altura));
  }, []);

  useLayoutEffect(() => {
    medir();
    window.addEventListener('resize', medir);
    return () => window.removeEventListener('resize', medir);
  }, [medir]);

  // Conta as colunas pela posição de um marcador no fim do conteúdo.
  const contar = useCallback(() => {
    if (!medidas) return;
    const fim = posicaoNoConteudo(fimRef.current, conteudoRef.current);
    setTotalColunas(Math.floor(fim / medidas.passoColuna) + 1);
  }, [medidas]);

  useLayoutEffect(() => {
    if (!medidas) return;
    contar();
  }, [medidas, contar]);

  useEffect(() => {
    document.fonts.ready.then(contar);
  }, [contar]);

  const colunasVisiveis = medidas?.colunasVisiveis ?? 1;
  const totalFolhas = Math.ceil(totalColunas / colunasVisiveis);
  const folhaAtual = Math.min(folha, totalFolhas - 1);

  // Primeira abertura: no fim da seção (voltando da seguinte) ou na folha da âncora
  // (#ref-N das citações).
  useLayoutEffect(() => {
    if (!medidas || posicionado) return;
    if (abrirNoFim) {
      // A contagem de folhas ainda pode crescer (imagens carregando); um valor acima do
      // total faz folhaAtual ficar sempre na última até o leitor virar a página.
      setFolha(Number.MAX_SAFE_INTEGER);
    } else if (ancora) {
      const alvo = conteudoRef.current.querySelector(ancora);
      const coluna = Math.floor(posicaoNoConteudo(alvo, conteudoRef.current) / medidas.passoColuna);
      setFolha(Math.floor(coluna / medidas.colunasVisiveis));
    }
    setPosicionado(true);
  }, [medidas, posicionado, abrirNoFim, ancora]);

  const temAnterior = folhaAtual > 0 || Boolean(onSecaoAnterior);
  const temProxima = folhaAtual < totalFolhas - 1 || Boolean(onProximaSecao);

  const anterior = useCallback(() => {
    if (folhaAtual > 0) setFolha(folhaAtual - 1);
    else onSecaoAnterior?.();
  }, [folhaAtual, onSecaoAnterior]);

  const proxima = useCallback(() => {
    if (folhaAtual < totalFolhas - 1) setFolha(folhaAtual + 1);
    else onProximaSecao?.();
  }, [folhaAtual, totalFolhas, onProximaSecao]);

  useEffect(() => {
    function teclado(event) {
      if (document.querySelector('[role="dialog"]')) return;
      if (event.key === 'ArrowRight') proxima();
      if (event.key === 'ArrowLeft') anterior();
    }
    window.addEventListener('keydown', teclado);
    return () => window.removeEventListener('keydown', teclado);
  }, [anterior, proxima]);

  const swipe = useSwipeNavigation(temAnterior ? anterior : null, temProxima ? proxima : null);

  const progresso = (posicao.indice + (folhaAtual + 1) / totalFolhas) / posicao.total;
  const rotulo = totalFolhas > 1 ? `${folhaAtual + 1} de ${totalFolhas}` : folio ? `p. ${folio}` : '';

  return (
    <div className="flex flex-col">
      <div
        ref={areaRef}
        className="relative flex items-center justify-center bg-mesa"
        style={{ height: alturaArea }}
        onPointerDown={swipe.onPointerDown}
        onPointerUp={swipe.onPointerUp}
        onPointerCancel={swipe.onPointerCancel}
      >
        {medidas && (
          <Livro
            medidas={medidas}
            folhaAtual={folhaAtual}
            totalColunas={totalColunas}
            rubrica={rubrica}
            esconderRubricaNaAbertura={esconderRubricaNaAbertura}
            folio={folio}
            direcao={direcao}
            visivel={posicionado}
            conteudoRef={conteudoRef}
            fimRef={fimRef}
            onCarregou={contar}
          >
            {children}
          </Livro>
        )}
      </div>
      <NavegacaoLivro
        onAnterior={temAnterior ? anterior : null}
        onProxima={temProxima ? proxima : null}
        rotulo={rotulo}
        progresso={progresso}
      />
    </div>
  );
}

function Livro({
  medidas,
  folhaAtual,
  totalColunas,
  rubrica,
  esconderRubricaNaAbertura,
  folio,
  direcao,
  visivel,
  conteudoRef,
  fimRef,
  onCarregou,
  children,
}) {
  const { espelho, largura, altura, margens, larguraTexto, alturaTexto, vao, colunasVisiveis, passoColuna } = medidas;
  const larguraVisivel = colunasVisiveis * larguraTexto + (colunasVisiveis - 1) * vao;

  const folhas = Array.from({ length: colunasVisiveis }, (_, i) => {
    const pagina = folhaAtual * colunasVisiveis + i;
    const lado = espelho ? (i === 0 ? 'esquerda' : 'direita') : 'direita';
    return {
      lado,
      esquerda: i * largura,
      vazia: pagina >= totalColunas,
      rubrica: pagina === 0 && esconderRubricaNaAbertura ? null : rubrica,
      folio: pagina === 0 ? folio : null,
      sombra: espelho ? (i === 0 ? 'shadow-pagina rounded-l-pagina' : 'shadow-pagina rounded-r-pagina') : 'shadow-pagina rounded-pagina',
    };
  });

  return (
    <div
      className={`relative ${direcao === 'anterior' ? 'folhear-anterior' : 'folhear-proximo'}`}
      style={{ width: largura * colunasVisiveis, height: altura, visibility: visivel ? 'visible' : 'hidden' }}
    >
      {folhas.map((f) => (
        <Folha key={f.lado} medidas={medidas} {...f} />
      ))}
      {espelho && (
        <>
          <div className="absolute top-0 bottom-0 pointer-events-none shadow-dobra-esq" style={{ left: 0, width: largura }} />
          <div
            className="absolute top-0 bottom-0 pointer-events-none shadow-dobra-dir"
            style={{ left: largura, width: largura }}
          />
        </>
      )}

      <div
        className="absolute overflow-hidden"
        style={{ top: margens.topo, left: margens.externa, width: larguraVisivel, height: alturaTexto }}
      >
        <div
          ref={conteudoRef}
          onLoadCapture={onCarregou}
          className="font-texto text-corpo text-tinta transition-transform duration-300 ease-out motion-reduce:transition-none [&>*+*]:mt-6"
          style={{
            width: larguraVisivel,
            height: alturaTexto,
            columnWidth: larguraTexto,
            columnGap: vao,
            columnFill: 'auto',
            transform: `translateX(-${folhaAtual * colunasVisiveis * passoColuna}px)`,
            '--altura-pagina': `${alturaTexto}px`,
          }}
        >
          {children}
          <span ref={fimRef} aria-hidden="true" className="block h-px" />
        </div>
      </div>
    </div>
  );
}
