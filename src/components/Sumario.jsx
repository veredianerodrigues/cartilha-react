import { useState } from 'react';
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
  const activeSlug = location.pathname.startsWith('/secao/') ? location.pathname.replace('/secao/', '') : null;

  const content = loading ? (
    <p className="text-sm text-slate-500 px-3">Carregando sumário...</p>
  ) : (
    <TreeList nodes={tree} activeSlug={activeSlug} onNavigate={() => setOpen(false)} />
  );

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
        <Link to="/" className="font-poppins font-semibold text-brand-dark text-sm">
          Vamos conversar sobre gravidez na adolescência?
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg border border-slate-300 text-brand-dark leading-none"
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

      <nav className="hidden md:block w-72 shrink-0 h-screen sticky top-0 overflow-y-auto border-r border-slate-200 bg-white p-4">
        <Link to="/" className="block font-poppins font-semibold text-brand-dark text-sm mb-4">
          Vamos conversar sobre gravidez na adolescência?
        </Link>
        {content}
      </nav>
    </>
  );
}
