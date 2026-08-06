// Os 4 tipos de card de destaque encontrados nas 19 seções: azul translúcido
// (mais comum, ex. "Você sabia..."), creme sólido, azul-marca sólido (destaque
// forte) e o TextCard neutro (esse fica em ./TextCard.jsx, é o "card padrão").
const VARIANTS = {
  blue: 'bg-[rgba(40,157,210,0.19)] text-black',
  cream: 'bg-[#f5f5ef] text-black',
  solid: 'bg-brand-blue text-white',
};

export default function HighlightCard({ children, variant = 'blue', shadow = true, className = '' }) {
  const shadowClass = shadow ? 'shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)]' : '';
  return (
    <div
      className={`rounded-[24px] sm:rounded-[40px] ${shadowClass} p-6 sm:p-8 ${VARIANTS[variant] ?? VARIANTS.blue} ${className}`}
    >
      {children}
    </div>
  );
}
