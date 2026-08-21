import { Link } from 'react-router-dom';
import { useSections } from '../../context/SectionsContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function StatusBadge({ hasContent }) {
  return hasContent ? (
    <span className="text-xs font-poppins font-medium text-white bg-[#349a95] px-2 py-0.5 rounded-full whitespace-nowrap">
      Editável
    </span>
  ) : (
    <span className="text-xs font-poppins font-medium text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full whitespace-nowrap">
      Conteúdo ainda no código
    </span>
  );
}

function Row({ node, indent }) {
  return (
    <div className={`flex items-center justify-between gap-3 py-2 border-b border-slate-100 ${indent ? 'pl-6' : ''}`}>
      <div className="min-w-0">
        <p
          className={`font-worksans text-sm truncate ${
            indent ? 'text-slate-700' : 'font-poppins font-semibold text-brand-dark'
          }`}
        >
          {node.title}
        </p>
        <p className="text-xs text-slate-400">
          Página {node.page_label} · atualizado em {new Date(node.updated_at).toLocaleDateString('pt-BR')}
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <StatusBadge hasContent={node.hasContent} />
        {node.hasContent ? (
          <Link to={`/admin/secoes/${node.id}`} className="text-xs font-poppins font-medium text-brand-blue underline">
            Editar
          </Link>
        ) : (
          <span className="text-xs text-slate-300">Em breve</span>
        )}
      </div>
    </div>
  );
}

// "referencias" ainda não foi migrada pro editor (o número de cada
// referência é citado por posição em todas as outras páginas — reordenar
// pelo admin quebraria as citações do site inteiro em silêncio, ver decisão
// registrada na conversa). Ela ainda tem um block "list" sobrando do seed
// antigo, então apareceria como "Editável" mesmo sem o Referencias.jsx ler
// nada do banco — edição lá não teria efeito nenhum na página pública.
// Escondida da listagem do admin até isso ser resolvido, pra não confundir.
const HIDDEN_SLUGS = ['referencias'];

export default function AdminSectionsList() {
  const { tree, loading } = useSections();
  const { session, logout } = useAuth();
  const visibleTree = tree.filter((chapter) => !HIDDEN_SLUGS.includes(chapter.slug));

  return (
    <div className="min-h-screen bg-[#f5f5ef] px-4 py-8 font-worksans">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-poppins font-semibold text-brand-dark text-2xl">Conteúdo da cartilha</h1>
            <p className="text-sm text-slate-500">Logado como {session?.email}</p>
          </div>
          <button onClick={logout} className="text-sm font-poppins text-brand-blue underline">
            Sair
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Carregando...</p>
        ) : (
          <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
            {visibleTree.map((chapter) => (
              <div key={chapter.slug}>
                <Row node={chapter} />
                {chapter.children?.map((child) => (
                  <Row key={child.slug} node={child} indent />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
