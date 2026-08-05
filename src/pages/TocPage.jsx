import { Link } from 'react-router-dom';
import { useSections } from '../context/SectionsContext.jsx';
import FrontMatterTrail from '../components/FrontMatterTrail.jsx';
import deco1 from '../assets/page03/deco1.svg';
import deco2 from '../assets/page03/deco2.svg';

function Row({ to, label, page, bold }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <Link
        to={to}
        className={`hover:text-brand-blue transition uppercase ${
          bold ? 'font-worksans font-medium text-[#1d4355]' : 'font-worksans font-light text-[#1d4355]'
        }`}
      >
        {label}
      </Link>
      <span className="flex-1 min-w-[24px] border-b border-dotted border-[#1d4355] opacity-40 translate-y-[-3px]" />
      <span className="font-worksans font-medium text-[#1d4355] shrink-0">{page || ''}</span>
    </div>
  );
}

export default function TocPage() {
  const { tree, loading } = useSections();

  return (
    <article className="relative w-full max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 overflow-hidden">
      <img alt="" className="absolute pointer-events-none -top-[4%] -right-[6%] w-[55%] max-w-[360px]" src={deco2} />

      <h1
        className="relative text-center font-poppins font-light text-[#349a95] text-2xl sm:text-3xl mb-10"
        style={{ textShadow: '0px 4px 4px rgba(0,0,0,0.25)' }}
      >
        SUMÁRIO
      </h1>

      {loading ? (
        <p className="relative text-sm text-slate-500 text-center">Carregando sumário...</p>
      ) : (
        <div className="relative space-y-6 text-sm">
          {tree.map((chapter) => (
            <div key={chapter.slug} className="space-y-1">
              <Row to={`/secao/${chapter.slug}`} label={chapter.title} page={chapter.page_label} bold />
              {chapter.children?.map((child) => (
                <Row key={child.slug} to={`/secao/${child.slug}`} label={child.title} page={child.page_label} />
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="relative h-64 -mx-4 sm:-mx-8 mt-10">
        <img alt="" className="absolute pointer-events-none bottom-0 -left-[10%] w-[45%] max-w-[280px]" src={deco1} />
      </div>

      <div className="relative pt-4">
        <FrontMatterTrail current="/sumario" />
      </div>
    </article>
  );
}
