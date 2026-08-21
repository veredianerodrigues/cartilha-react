import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
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

export default function RichTextEditor({ value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
        strike: false,
        italic: false,
      }),
      Citation,
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

  function handleCitation() {
    const n = window.prompt('Número(s) da citação (ex.: 19 ou 24,8):');
    if (!n) return;
    editor?.chain().focus().insertCitation(n.trim()).run();
  }

  if (!editor) return null;

  return (
    <div className="rounded-lg border border-slate-300 bg-white overflow-hidden">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-2 py-1.5">
        <ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Negrito">
          <strong>N</strong>
        </ToolbarButton>
        <ToolbarButton onClick={handleCitation} title="Inserir citação">
          [n]
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
