import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSections } from '../../context/SectionsContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../lib/api.js';
import RichTextEditor from '../../components/admin/RichTextEditor.jsx';
import { SECTION_FIELD_SLOTS, fieldLabel } from '../../components/sections/fieldSchemas.js';

const BLOCK_TYPE_LABELS = {
  heading: 'Subtítulo',
  paragraph: 'Parágrafo',
  callout: 'Destaque',
  quote_grid: 'Grade de cards',
  list: 'Lista',
  image: 'Imagem',
};

function itemsToText(items) {
  return (items || []).join('\n');
}
function textToItems(text) {
  return text
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
}

function BlockEditor({ block, sectionId, token, onSaved, onDeleted, onMove, isFirst, isLast, slotLabel }) {
  const [form, setForm] = useState({
    heading: block.heading || '',
    body: block.body || '',
    itemsText: itemsToText(block.items),
    image_url: block.image_url || '',
    image_caption: block.image_caption || '',
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const patch = {
        heading: form.heading || null,
        body: form.body || null,
        items: ['quote_grid', 'list'].includes(block.type) ? textToItems(form.itemsText) : null,
        image_url: form.image_url || null,
        image_caption: form.image_caption || null,
      };
      const updated = await api.updateBlock(token, sectionId, block.id, patch);
      onSaved(updated);
    } finally {
      setSaving(false);
    }
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.uploadImage(token, file);
      set('image_url', url);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border border-slate-200 rounded-xl p-4 space-y-3 bg-white">
      <div className="flex items-center justify-between">
        <span className="text-xs font-poppins font-semibold text-brand-blue uppercase tracking-wide">
          {slotLabel || BLOCK_TYPE_LABELS[block.type] || block.type}
        </span>
        {/* Blocos de slot fixo (ver fieldSchemas.js) fazem parte do design da
            página — não dá pra mover/remover, só editar a redação. */}
        {!slotLabel && (
          <div className="flex items-center gap-2">
            <button
              disabled={isFirst}
              onClick={() => onMove(-1)}
              className="text-xs px-2 py-1 rounded border border-slate-300 disabled:opacity-30"
            >
              ↑
            </button>
            <button
              disabled={isLast}
              onClick={() => onMove(1)}
              className="text-xs px-2 py-1 rounded border border-slate-300 disabled:opacity-30"
            >
              ↓
            </button>
            <button onClick={() => onDeleted(block.id)} className="text-xs px-2 py-1 rounded border border-red-300 text-red-600">
              Remover
            </button>
          </div>
        )}
      </div>

      {!slotLabel && (block.type === 'heading' || block.type === 'callout') && (
        <input
          value={form.heading}
          onChange={(e) => set('heading', e.target.value)}
          placeholder="Chamada / subtítulo"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      )}

      {(block.type === 'paragraph' || block.type === 'callout') && (
        <RichTextEditor value={form.body} onChange={(html) => set('body', html)} />
      )}

      {(block.type === 'quote_grid' || block.type === 'list') && (
        <textarea
          value={form.itemsText}
          onChange={(e) => set('itemsText', e.target.value)}
          rows={5}
          placeholder="Um item por linha"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      )}

      {block.type === 'image' && (
        <div className="space-y-2">
          {form.image_url && <img src={form.image_url} alt="" className="max-h-40 rounded-lg border border-slate-200" />}
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="text-xs" />
          <input
            value={form.image_caption}
            onChange={(e) => set('image_caption', e.target.value)}
            placeholder="Legenda / fonte"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving || uploading}
          className="px-4 py-1.5 rounded-full bg-brand-dark text-white text-xs font-poppins hover:bg-brand-darker transition disabled:opacity-50"
        >
          {saving ? 'Salvando...' : 'Salvar bloco'}
        </button>
      </div>
    </div>
  );
}

export default function AdminSectionEditor() {
  const { id } = useParams();
  const { flatSections } = useSections();
  const { session } = useAuth();
  const [section, setSection] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [newType, setNewType] = useState('paragraph');
  const [status, setStatus] = useState('loading');

  const node = flatSections.find((s) => String(s.id) === id);
  const slots = node ? SECTION_FIELD_SLOTS[node.slug] : null;

  useEffect(() => {
    if (!node) return;
    setStatus('loading');
    api
      .getSection(node.slug)
      .then((data) => {
        setSection(data);
        setBlocks(data.blocks);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [node?.slug]);

  async function handleAddBlock() {
    const created = await api.createBlock(session.token, section.id, { type: newType });
    setBlocks((b) => [...b, created]);
  }

  function handleSaved(updated) {
    setBlocks((b) => b.map((blk) => (blk.id === updated.id ? updated : blk)));
  }

  async function handleDeleted(blockId) {
    await api.deleteBlock(session.token, section.id, blockId);
    setBlocks((b) => b.filter((blk) => blk.id !== blockId));
  }

  async function handleMove(index, direction) {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const newBlocks = [...blocks];
    [newBlocks[index], newBlocks[target]] = [newBlocks[target], newBlocks[index]];
    setBlocks(newBlocks);
    await api.reorderBlocks(session.token, section.id, newBlocks.map((b) => b.id));
  }

  if (!node) {
    return <div className="p-8 text-center text-brand-dark">Seção não encontrada.</div>;
  }

  return (
    <div className="min-h-screen bg-[#f5f5ef] px-4 py-8 font-worksans">
      <div className="max-w-2xl mx-auto space-y-4">
        <Link to="/admin" className="text-sm font-poppins text-brand-blue underline">
          ← Voltar para a lista
        </Link>
        <h1 className="font-poppins font-semibold text-brand-dark text-2xl">{node.title}</h1>

        {status === 'loading' && <p className="text-sm text-slate-500">Carregando...</p>}
        {status === 'error' && <p className="text-sm text-red-600">Erro ao carregar a seção.</p>}

        {status === 'ready' && (
          <>
            {slots && (
              <p className="text-xs text-slate-500 -mt-2">
                Esta página tem um design próprio — os campos abaixo são fixos (definidos no código), só a redação é
                editável aqui.
              </p>
            )}

            <div className="space-y-3">
              {blocks.map((block, i) => (
                <BlockEditor
                  key={block.id}
                  block={block}
                  sectionId={section.id}
                  token={session.token}
                  onSaved={handleSaved}
                  onDeleted={handleDeleted}
                  onMove={(dir) => handleMove(i, dir)}
                  isFirst={i === 0}
                  isLast={i === blocks.length - 1}
                  slotLabel={slots ? fieldLabel(node.slug, block.heading) : null}
                />
              ))}
            </div>

            {!slots && (
              <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {Object.entries(BLOCK_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddBlock}
                  className="px-4 py-2 rounded-full bg-brand-blue text-white text-sm font-poppins hover:opacity-90 transition"
                >
                  Adicionar bloco
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
