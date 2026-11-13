import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSections } from '../context/SectionsContext.jsx';
import SectionView from '../components/SectionView.jsx';
import SectionIndex from '../components/SectionIndex.jsx';
import PrevNextNav from '../components/PrevNextNav.jsx';
import useSwipeNavigation from '../hooks/useSwipeNavigation.js';

const PAGE_CARD =
  'flex flex-col w-full max-w-3xl min-h-[750px] sm:min-h-[950px] bg-[#f5f5ef] shadow-xl rounded-2xl overflow-hidden';

export default function SectionPage() {
  const { slug } = useParams();
  const { flatSections, getSection, loading, error } = useSections();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const index = flatSections.findIndex((s) => s.slug === slug);
  const prevSection = index > 0 ? flatSections[index - 1] : null;
  const nextSection = index >= 0 && index < flatSections.length - 1 ? flatSections[index + 1] : null;

  const swipeHandlers = useSwipeNavigation(
    prevSection ? `/secao/${prevSection.slug}` : null,
    nextSection ? `/secao/${nextSection.slug}` : null,
  );

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-brand-dark">Carregando...</div>;
  }

  if (error) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-brand-dark">{error}</div>;
  }

  const section = getSection(slug);

  if (!section) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-brand-dark space-y-3">
        <p>Seção não encontrada.</p>
        <Link to="/" className="text-brand-blue underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  // Seção só com subseções (sem blocos próprios) mostra o índice das subseções.
  const showIndex = section.children.length > 0 && section.blocks.length === 0;

  return (
    <div
      className="flex flex-col min-h-full"
      onPointerDown={swipeHandlers.onPointerDown}
      onPointerUp={swipeHandlers.onPointerUp}
      onPointerCancel={swipeHandlers.onPointerCancel}
    >
      <div className="flex-1">
        <div className="overflow-x-auto py-8 flex justify-center">
          <div className={PAGE_CARD}>
            {showIndex ? (
              <SectionIndex title={section.title} children={section.children} />
            ) : (
              <SectionView section={section} />
            )}
          </div>
        </div>
      </div>
      <PrevNextNav
        prev={prevSection && { slug: prevSection.slug, title: prevSection.title }}
        next={nextSection && { slug: nextSection.slug, title: nextSection.title }}
      />
    </div>
  );
}
