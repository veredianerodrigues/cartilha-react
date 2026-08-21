export default function Paragraph({ children, className = '', html }) {
  const classes = `font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify ${className}`;
  if (html) {
    // O RichTextEditor sempre serializa o texto salvo dentro de <p>...</p> —
    // usar <div> aqui em vez de <p> evita <p> aninhado (HTML inválido; o
    // navegador fecharia este wrapper cedo e o texto perderia a tipografia e
    // o alinhamento). [&_p]:m-0 zera a margem padrão do <p> interno.
    return <div className={`${classes} [&_p]:m-0`} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <p className={classes}>{children}</p>;
}
