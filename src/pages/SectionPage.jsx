import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useSections } from '../context/SectionsContext.jsx';
import { getLegacyPage } from '../legacyPagesMap.js';
import SectionView from '../components/SectionView.jsx';
import { SECTION_LAYOUTS } from '../components/sections/index.js';
import { getPageCount } from '../components/sections/pageCounts.js';
import SectionIndex from '../components/SectionIndex.jsx';
import PrevNextNav from '../components/PrevNextNav.jsx';
import ScaledCanvas from '../components/ScaledCanvas.jsx';
import useSwipeNavigation from '../hooks/useSwipeNavigation.js';

export default function SectionPage() {
  const { slug, page } = useParams();
  const { flatSections } = useSections();
  const [section, setSection] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    api
      .getSection(slug)
      .then((data) => {
        setSection(data);
        setStatus('ready');
      })
      .catch(() => setStatus('not-found'));
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, page]);

  const index = flatSections.findIndex((s) => s.slug === slug);
  const prevSection = index > 0 ? flatSections[index - 1] : null;
  const nextSection = index >= 0 && index < flatSections.length - 1 ? flatSections[index + 1] : null;
  const treeNode = index >= 0 ? flatSections[index] : null;

  // Seções com mais de uma página física (ex.: menstruação = 13-15) viram uma
  // tela por página — o próximo/anterior anda dentro da seção até acabar as
  // páginas, só então passa pra seção vizinha.
  const pageCount = getPageCount(slug);
  const pageIndex = Math.min(Math.max(parseInt(page, 10) || 1, 1), pageCount);

  const prev =
    pageIndex > 1
      ? { slug, title: treeNode?.title, page: pageIndex - 1 }
      : prevSection
        ? { slug: prevSection.slug, title: prevSection.title, page: getPageCount(prevSection.slug) }
        : null;

  const next =
    pageIndex < pageCount
      ? { slug, title: treeNode?.title, page: pageIndex + 1 }
      : nextSection
        ? { slug: nextSection.slug, title: nextSection.title, page: 1 }
        : null;

  const sectionPath = (target) => (target ? `/secao/${target.slug}${target.page > 1 ? `/${target.page}` : ''}` : null);
  const swipeHandlers = useSwipeNavigation(sectionPath(prev), sectionPath(next));

  if (status === 'loading') {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-brand-dark">Carregando...</div>;
  }

  if (status === 'not-found' || !section) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-brand-dark space-y-3">
        <p>Seção não encontrada.</p>
        <Link to="/" className="text-brand-blue underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  const hasBespokeLayout = Boolean(SECTION_LAYOUTS[slug]);
  const hasContent = hasBespokeLayout || (section.blocks && section.blocks.length > 0);
  const hasChildren = treeNode?.children?.length > 0;
  const LegacyComponent = hasContent || hasChildren ? null : getLegacyPage(section.page_label);

  return (
    <div className="flex flex-col min-h-full" onTouchStart={swipeHandlers.onTouchStart} onTouchEnd={swipeHandlers.onTouchEnd}>
      <div className="flex-1">
        {hasContent ? (
          <div className="overflow-x-auto py-8 flex justify-center">
            <div className="flex flex-col w-full max-w-3xl min-h-[750px] sm:min-h-[950px] bg-[#f5f5ef] shadow-xl rounded-2xl overflow-hidden">
              <SectionView
                title={section.title}
                blocks={section.blocks}
                slug={slug}
                pageLabel={section.page_label}
                page={pageIndex}
              />
            </div>
          </div>
        ) : hasChildren ? (
          <div className="overflow-x-auto py-8 flex justify-center">
            <div className="flex flex-col w-full max-w-3xl min-h-[750px] sm:min-h-[950px] bg-[#f5f5ef] shadow-xl rounded-2xl overflow-hidden">
              <SectionIndex title={section.title} children={treeNode.children} />
            </div>
          </div>
        ) : LegacyComponent ? (
          <div className="py-8 flex justify-center px-4">
            <ScaledCanvas className="shadow-xl">
              <LegacyComponent />
            </ScaledCanvas>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center text-brand-dark">Conteúdo em preparação.</div>
        )}
      </div>
      <PrevNextNav prev={prev} next={next} />
    </div>
  );
}
