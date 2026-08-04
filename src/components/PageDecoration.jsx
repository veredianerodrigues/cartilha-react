export default function PageDecoration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 300 300"
      aria-hidden="true"
      className={`pointer-events-none absolute -top-[6%] -right-[8%] w-[45%] max-w-[300px] opacity-100 ${className}`}
    >
      <circle cx="150" cy="150" r="150" fill="rgba(40,157,210,0.10)" />
      <circle cx="90" cy="210" r="70" fill="rgba(29,67,85,0.06)" />
    </svg>
  );
}
