import { Link } from 'react-router-dom';
import { useSections } from '../context/SectionsContext.jsx';
import Page00 from './Page00.jsx';
import ScaledCanvas from '../components/ScaledCanvas.jsx';

export default function CoverPage() {
  const { flatSections } = useSections();
  const first = flatSections[0];

  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4">
      <ScaledCanvas className="shadow-2xl">
        <Page00 />
      </ScaledCanvas>
      {first && (
        <Link
          to={`/secao/${first.slug}`}
          className="px-6 py-3 rounded-full bg-brand-dark text-white font-poppins text-sm hover:bg-brand-darker transition"
        >
          Começar a leitura
        </Link>
      )}
    </div>
  );
}
