import { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Node, mergeAttributes } from '@tiptap/core';

// Citação vira um "token" inserido no texto (não um estilo aplicado a uma
// seleção), então é um Node atômico, não uma Mark — mesma lógica do <Cite n={...}/>
// usado nas seções bespoke, só que salvo como HTML (<sup data-citation data-n="...">)
// em vez de JSX, pra poder ser editado sem mexer em código.
const Citation = Node.create({
  name: 'citation',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      n: {
        default: '',
        parseHTML: (el) => el.getAttribute('data-n'),
        renderHTML: (attrs) => ({ 'data-n': attrs.n }),
      },
    };
  },
  parseHTML() {
    return [{ tag: 'sup[data-citation]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'sup',
      mergeAttributes(HTMLAttributes, {
        'data-citation': '',
        class: 'text-[0.7em] leading-none align-super',
      }),
      node.attrs.n,
    ];
  },
  addCommands() {
    return {
      insertCitation:
        (n) =>
        ({ chain }) =>
          chain().insertContent({ type: this.name, attrs: { n } }).run(),
    };
  },
});

function ToolbarButton({ active, onClick, title, children }) {
  return (
    <button
      type="button"
      // preventDefault no mousedown evita que o clique no botão tire o foco/seleção
      // do editor antes do comando (toggleBold etc.) rodar sobre o texto selecionado.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1 rounded-md text-xs font-poppins border transition ${
        active
          ? 'bg-brand-dark text-white border-brand-dark'
          : 'bg-white text-brand-dark border-slate-300 hover:bg-slate-50'
      }`}
    >
      {children}
    </button>
  );
}

function CitationModal({ onConfirm, onClose }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleSubmit(e) {
    e.preventDefault();
    const cleaned = value.trim();
    if (!cleaned) return;
    onConfirm(cleaned);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Inserir citação"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-xs rounded-xl bg-white p-4 shadow-xl space-y-3"
      >
        <p className="font-poppins font-semibold text-brand-dark text-sm">Inserir citação</p>
        <div>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex.: 19 ou 24,8"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
          />
          <p className="text-xs text-slate-500 mt-1">Número(s) da referência, separados por vírgula.</p>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-full text-xs font-poppins border border-slate-300 text-brand-dark hover:bg-slate-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={!value.trim()}
            className="px-3 py-1.5 rounded-full text-xs font-poppins bg-brand-dark text-white disabled:opacity-40"
          >
            Inserir
          </button>
        </div>
      </form>
    </div>
  );
}

export default function RichTextEditor({ value, onChange }) {
  const [citationModalOpen, setCitationModalOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        // Classes coladas direto no HTML que o editor gera — assim a lista já
        // sai com o visual padrão da cartilha (marcador, recuo, tipografia)
        // não importa onde a página bespoke jogue esse HTML na tela.
        bulletList: { HTMLAttributes: { class: 'list-disc pl-5 space-y-2' } },
        listItem: {
          HTMLAttributes: {
            class: 'font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify',
          },
        },
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
        italic: false,
      }),
      Citation,
      // Alinhamento por parágrafo — mesmo padrão visual do resto da cartilha
      // (texto justificado) é o default; o admin pode trocar por parágrafo.
      TextAlign.configure({ types: ['paragraph'], defaultAlignment: 'justify' }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          'font-worksans text-sm leading-[22px] tracking-[0.14px] text-black text-justify min-h-[110px] px-3 py-2 focus:outline-none',
      },
    },
  });

  function handleCitationConfirm(n) {
    editor?.chain().focus().insertCitation(n).run();
    setCitationModalOpen(false);
  }

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-slate-300 bg-white overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Negrito">
          <strong>N</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => setCitationModalOpen(true)} title="Inserir citação">
          [n]
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Lista com marcadores"
        >
          •
        </ToolbarButton>

        <span className="w-px h-4 bg-slate-300 mx-0.5" />

        <ToolbarButton
          active={editor.isActive({ textAlign: 'left' })}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          title="Alinhar à esquerda"
        >
          E
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'center' })}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          title="Centralizar"
        >
          C
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'right' })}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          title="Alinhar à direita"
        >
          D
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive({ textAlign: 'justify' })}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          title="Justificar"
        >
          J
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />

      {citationModalOpen && (
        <CitationModal onConfirm={handleCitationConfirm} onClose={() => setCitationModalOpen(false)} />
      )}
    </div>
  );
}
