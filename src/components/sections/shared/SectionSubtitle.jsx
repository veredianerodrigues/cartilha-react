export default function SectionSubtitle({ children, className = '' }) {
  return (
    <h2 className={`font-poppins font-light text-brand-dark text-xl sm:text-2xl mb-3 ${className}`}>{children}</h2>
  );
}
