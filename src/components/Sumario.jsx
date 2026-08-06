import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSections } from '../context/SectionsContext.jsx';

function linkClasses(active, isChapter) {
  const base = 'block rounded-lg px-3 py-1.5 text-sm font-worksans transition';
  const chapterFont = isChapter ? 'font-poppins font-medium' : '';
  if (active) return `${base} ${chapterFont} bg-brand-blue text-white`;
  return `${base} ${chapterFont} text-brand-dark hover:bg-[#e5f2f8]`;
}

function TreeList({ nodes, activeSlug, onNavigate }) {
  return (
    <ul className="space-y-1">
      {nodes.map((node) => (
        <li key={node.slug}>
          <Link to={`/secao/${node.slug}`} onClick={onNavigate} className={linkClasses(node.slug === activeSlug, true)}>
            {node.title}
          </Link>
          {node.children?.length > 0 && (
            <ul className="ml-3 border-l border-slate-200 pl-2 mt-1 space-y-1">
              {node.children.map((child) => (
                <li key={child.slug}>
                  <Link
                    to={`/secao/${child.slug}`}
                    onClick={onNavigate}
                    className={linkClasses(child.slug === activeSlug, false)}
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Sumario() {
  const { tree, loading } = useSections();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const desktopNavRef = useRef(null);
  const activeSlug = location.pathname.startsWith('/secao/') ? location.pathname.replace('/secao/', '') : null;

  // Fecha o sumário desktop ao clicar fora dele (o botão que reabre fica de
  // fora da <nav>, então precisa ser ignorado aqui pra não fechar e reabrir).
  useEffect(() => {
    if (!desktopOpen) return;

    function handlePointerDown(event) {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target)) {
        setDesktopOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [desktopOpen]);

  const content = loading ? (
    <p className="text-sm text-slate-500 px-3">Carregando sumário...</p>
  ) : (
    <TreeList nodes={tree} activeSlug={activeSlug} onNavigate={() => setOpen(false)} />
  );

  return (
    <>
      <div className="md:hidden flex items-center justify-between gap-2 bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
        <Link to="/" className="min-w-0 flex-1 truncate font-poppins font-semibold text-brand-dark text-sm">
          Vamos conversar sobre gravidez na adolescência?
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="shrink-0 p-2 rounded-lg border border-slate-300 text-brand-dark leading-none"
          aria-label="Abrir sumário"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <nav className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <p className="font-poppins font-semibold text-brand-dark text-sm">Sumário</p>
              <button onClick={() => setOpen(false)} className="text-slate-500" aria-label="Fechar sumário">
                ✕
              </button>
            </div>
            {content}
          </nav>
        </div>
      )}

      {!desktopOpen && (
        <button
          onClick={() => setDesktopOpen(true)}
          className="hidden md:flex fixed top-4 left-4 z-50 p-2 rounded-lg border border-slate-300 bg-white text-brand-dark leading-none shadow-sm hover:bg-[#e5f2f8] transition"
          aria-label="Mostrar sumário"
          aria-pressed={false}
        >
          ☰
        </button>
      )}

      <nav
        ref={desktopNavRef}
        className={`hidden md:block min-w-0 shrink-0 h-screen sticky top-0 overflow-y-auto overflow-x-hidden border-r border-slate-200 bg-white transition-[width] duration-200 ${
          desktopOpen ? 'w-72 p-4' : 'w-0 p-0 border-r-0'
        }`}
      >
        <div className={`overflow-hidden transition-opacity duration-150 ${desktopOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-start justify-between gap-2 mb-4">
            <Link to="/" className="min-w-0 flex-1 font-poppins font-semibold text-brand-dark text-sm">
              Vamos conversar sobre gravidez na adolescência?
            </Link>
            <button
              onClick={() => setDesktopOpen(false)}
              className="shrink-0 p-2 rounded-lg border border-slate-300 text-brand-dark leading-none hover:bg-[#e5f2f8] transition"
              aria-label="Ocultar sumário"
              aria-pressed={true}
            >
              ☰
            </button>
          </div>
          <div>{content}</div>
        </div>
      </nav>
    </>
  );
}
