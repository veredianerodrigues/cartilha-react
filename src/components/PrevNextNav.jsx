import { Link } from 'react-router-dom';

export default function PrevNextNav({ prev, next }) {
  if (!prev && !next) return null;

  return (
    <div className="flex items-center justify-between gap-4 max-w-3xl mx-auto w-full px-4 py-6 border-t border-slate-200 mt-4">
      {prev ? (
        <Link
          to={`/secao/${prev.slug}`}
          className="max-w-[45%] truncate px-4 py-2 rounded-full bg-brand-dark text-white font-poppins text-sm hover:bg-brand-darker transition"
        >
          ← {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={`/secao/${next.slug}`}
          className="max-w-[45%] truncate px-4 py-2 rounded-full bg-brand-dark text-white font-poppins text-sm hover:bg-brand-darker transition text-right"
        >
          {next.title} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
