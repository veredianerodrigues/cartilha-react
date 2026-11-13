import { Link } from 'react-router-dom';

// Abertura de capítulo que só tem subseções: título e a lista das subseções.
export default function SectionIndex({ title, children }) {
  return (
    <>
      <h1 className="font-titulo text-titulo-pagina text-tinta max-w-[80%] mb-6">{title}</h1>
      <ul className="m-0 p-0 list-none space-y-3">
        {children.map((child) => (
          <li key={child.slug} className="break-inside-avoid">
            <Link
              to={`/secao/${child.slug}`}
              className="flex items-baseline gap-3 rounded-cartao bg-azul-claro px-5 py-4 font-titulo font-semibold text-tinta hover:bg-teal-claro transition"
            >
              <span className="min-w-0 flex-1">{child.title}</span>
              {child.page_label && <span className="shrink-0 font-texto text-folio text-tinta-suave">{child.page_label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
