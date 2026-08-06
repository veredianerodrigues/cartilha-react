// Card de texto padrão — o wrapper mais repetido entre as 19 seções
// (rounded-[24/40px] + sombra + fundo neutro com 5% de tinta escura).
export default function TextCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-[24px] sm:rounded-[40px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  );
}
