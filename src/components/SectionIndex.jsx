import { Link } from 'react-router-dom';
import PageDecoration from './PageDecoration.jsx';

export default function SectionIndex({ title, children }) {
  return (
    <article className="relative w-full max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12 overflow-hidden">
      <PageDecoration />
      <h1 className="relative font-poppins font-light text-brand-dark text-2xl sm:text-3xl md:text-[32px] leading-[1.44] mb-6">
        {title}
      </h1>
      <ul className="relative space-y-3">
        {children.map((child) => (
          <li key={child.slug}>
            <Link
              to={`/secao/${child.slug}`}
              className="block rounded-[20px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] px-5 py-4 font-poppins text-brand-dark hover:bg-[rgba(29,67,85,0.09)] transition"
            >
              {child.title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
