export default function Paragraph({ children, className = '' }) {
  return (
    <p className={`font-worksans text-black text-sm leading-[22px] tracking-[0.14px] text-justify ${className}`}>
      {children}
    </p>
  );
}
