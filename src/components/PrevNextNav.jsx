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

export default function PrevNextNav({ prev, next }) {
  return (
    <div className="flex items-center justify-between gap-4 max-w-3xl mx-auto w-full px-4 py-6 border-t border-slate-200 mt-4">
      {prev ? (
        <Link
          to={`/secao/${prev.slug}`}
          className="max-w-[35%] truncate px-4 py-2 rounded-full bg-brand-dark text-white font-poppins text-sm hover:bg-brand-darker transition"
        >
          ← {prev.title}
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
          to={`/secao/${next.slug}`}
          className="max-w-[35%] truncate px-4 py-2 rounded-full bg-brand-dark text-white font-poppins text-sm hover:bg-brand-darker transition text-right"
        >
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
