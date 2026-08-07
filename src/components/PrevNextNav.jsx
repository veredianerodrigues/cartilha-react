import { Link } from 'react-router-dom';

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 9.5V20h13V9.5" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

// Aceita tanto seções (`{ slug, page }`, monta /secao/...) quanto páginas de
// abertura (`{ to }`, link direto — ex.: /ficha-catalografica, /sumario).
function targetPath(target) {
  if (target.to) return target.to;
  return `/secao/${target.slug}${target.page > 1 ? `/${target.page}` : ''}`;
}

export default function PrevNextNav({ prev, next }) {
  return (
    <div className="sticky bottom-0 z-30 flex items-center justify-center gap-4 w-full h-[6rem] sm:h-[10rem] px-4 border-t border-slate-200 bg-[#f5f5ef]/95 backdrop-blur-sm">
      {prev ? (
        <Link
          to={targetPath(prev)}
          className="px-5 py-2 rounded-full bg-brand-dark text-white font-poppins text-sm hover:bg-brand-darker transition"
        >
          ← Anterior
        </Link>
      ) : (
        <span />
      )}

      <Link
        to="/"
        aria-label="Voltar ao início"
        className="shrink-0 p-2.5 rounded-full border border-slate-300 text-brand-dark hover:bg-[#e5f2f8] hover:border-brand-blue transition"
      >
        <HomeIcon />
      </Link>

      {next ? (
        <Link
          to={targetPath(next)}
          className="px-5 py-2 rounded-full bg-brand-dark text-white font-poppins text-sm hover:bg-brand-darker transition"
        >
          Próximo →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
