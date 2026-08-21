export default function Paragraph({ children, className = '', html }) {
  const classes = `font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify ${className}`;
  if (html) {
    return <p className={classes} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <p className={classes}>{children}</p>;
}
