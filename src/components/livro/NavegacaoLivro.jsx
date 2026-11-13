import { Link } from 'react-router-dom';
import { ALTURA_NAVEGACAO } from './medidas.js';

const BOTAO =
  'inline-flex items-center gap-1.5 h-10 px-4 sm:px-5 rounded-full bg-tinta-forte text-papel font-titulo font-semibold text-sm ' +
  'hover:bg-azul-texto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-marca ' +
  'disabled:opacity-35 disabled:hover:bg-tinta-forte transition';

// Barra de folhear (Design System, componente Navegacao): progresso na cartilha,
// anterior, contador, sumário e próximo.
export default function NavegacaoLivro({ onAnterior, onProxima, rotulo, progresso }) {
  return (
    <nav
      aria-label="Folhear a cartilha"
      className="shrink-0 flex flex-col justify-center gap-2.5 px-4 bg-mesa"
      style={{ height: ALTURA_NAVEGACAO }}
    >
      <div className="mx-auto w-full max-w-md h-[3px] rounded-full bg-fio overflow-hidden" aria-hidden="true">
        <span className="block h-full bg-azul-marca transition-[width] duration-300" style={{ width: `${progresso * 100}%` }} />
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <button type="button" className={BOTAO} onClick={onAnterior} disabled={!onAnterior} aria-label="Página anterior">
          ← <span className="hidden sm:inline">Anterior</span>
        </button>
        <span className="min-w-[88px] text-center font-texto text-folio text-tinta-suave tabular-nums">{rotulo}</span>
        <Link
          to="/sumario"
          aria-label="Sumário"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-fio text-tinta-forte hover:bg-azul-claro transition"
        >
          ☰
        </Link>
        <button type="button" className={BOTAO} onClick={onProxima} disabled={!onProxima} aria-label="Próxima página">
          <span className="hidden sm:inline">Próximo</span> →
        </button>
      </div>
    </nav>
  );
}
