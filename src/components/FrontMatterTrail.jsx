import { Link } from 'react-router-dom';

const ITEMS = [
  { to: '/', label: 'Capa' },
  { to: '/contracapa', label: 'Contracapa' },
  { to: '/ficha-catalografica', label: 'Ficha catalográfica' },
  { to: '/sumario', label: 'Sumário' },
];

// Trilha de navegação entre as páginas de abertura (capa/contracapa/ficha/sumário) —
// mostra links para as outras páginas do grupo, nunca para a página atual.
export default function FrontMatterTrail({ current }) {
  return (
    <nav className="w-full max-w-md mx-auto pt-4 border-t border-slate-200">
      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {ITEMS.filter((item) => item.to !== current).map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className="font-poppins font-medium text-sm text-brand-dark hover:text-brand-blue underline underline-offset-2"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
