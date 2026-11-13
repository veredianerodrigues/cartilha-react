import { useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useSections } from '../context/SectionsContext.jsx';
import SectionView from '../components/SectionView.jsx';
import SectionIndex from '../components/SectionIndex.jsx';
import LivroPaginas from '../components/livro/LivroPaginas.jsx';

export default function SectionPage() {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { flatSections, getSection, loading, error } = useSections();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-tinta">Carregando...</div>;
  }

  if (error) {
    return <div className="max-w-3xl mx-auto px-4 py-16 text-center text-tinta">{error}</div>;
  }

  const section = getSection(slug);

  if (!section) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center text-tinta space-y-3">
        <p>Seção não encontrada.</p>
        <Link to="/" className="text-azul-texto underline">
          Voltar ao início
        </Link>
      </div>
    );
  }

  const index = flatSections.findIndex((s) => s.slug === slug);
  const prevSection = index > 0 ? flatSections[index - 1] : null;
  const nextSection = index < flatSections.length - 1 ? flatSections[index + 1] : null;

  // Antes da primeira seção vem o sumário. Voltar abre a seção anterior na última folha.
  const onSecaoAnterior = prevSection
    ? () => navigate(`/secao/${prevSection.slug}`, { state: { direcao: 'anterior', abrirNoFim: true } })
    : () => navigate('/sumario');
  const onProximaSecao = nextSection
    ? () => navigate(`/secao/${nextSection.slug}`, { state: { direcao: 'proximo' } })
    : null;

  // Cabeça corrente: o capítulo (seção raiz) a que a seção pertence. Na abertura de
  // um capítulo ela some, como nos livros.
  let capitulo = section;
  while (capitulo.parentId) capitulo = flatSections.find((s) => s.id === capitulo.parentId);

  // Seção só com subseções (sem blocos próprios) mostra o índice das subseções.
  const showIndex = section.children.length > 0 && section.blocks.length === 0;

  return (
    <LivroPaginas
      key={slug}
      rubrica={capitulo.title}
      esconderRubricaNaAbertura={capitulo === section}
      folio={section.page_label}
      abrirNoFim={Boolean(location.state?.abrirNoFim)}
      ancora={location.hash || null}
      direcao={location.state?.direcao ?? 'proximo'}
      onSecaoAnterior={onSecaoAnterior}
      onProximaSecao={onProximaSecao}
      posicao={{ indice: index, total: flatSections.length }}
    >
      {showIndex ? <SectionIndex title={section.title} children={section.children} /> : <SectionView section={section} />}
    </LivroPaginas>
  );
}
