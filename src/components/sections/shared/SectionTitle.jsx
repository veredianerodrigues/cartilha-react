const WEIGHTS = { light: 'font-light', semibold: 'font-semibold', normal: '' };

export default function SectionTitle({ children, weight = 'light', className = '' }) {
  return (
    <h1
      className={`relative font-poppins ${WEIGHTS[weight] ?? ''} text-brand-dark text-2xl sm:text-3xl leading-[1.3] mb-6 ${className}`}
    >
      {children}
    </h1>
  );
}
