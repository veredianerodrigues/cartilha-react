import RichHtml from './RichHtml.jsx';

export default function Paragraph({ children, className = '', html }) {
  const classes = `font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify ${className}`;
  if (html) {
    // O RichTextEditor sempre serializa o texto salvo dentro de <p>...</p> —
    // usar <div> (via RichHtml) em vez de <p> evita <p> aninhado (HTML
    // inválido; o navegador fecharia este wrapper cedo e o texto perderia a
    // tipografia e o alinhamento). [&_p]:m-0 zera a margem padrão do <p>
    // interno. RichHtml também deixa as citações (<sup data-citation>)
    // clicáveis, levando pra Referências.
    return <RichHtml className={`${classes} [&_p]:m-0`} html={html} />;
  }
  return <p className={classes}>{children}</p>;
}
