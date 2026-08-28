// Forma decorativa real do Figma (o "blob" que aparece no canto superior direito
// de cada página do design original — ver src/assets/page05/deco1.svg), recolorida
// para a paleta de marca em vez do teal original, pra ficar consistente com o
// resto dos blocos (Callout, QuoteGrid etc. já usam #1D4355/#289DD2).
// Antes este componente era 2 círculos genéricos com opacidade de 6-10%, quase
// imperceptíveis — por isso pareciam "não carregar".
export default function PageDecoration({ className = '', style }) {
  return (
    <svg
      viewBox="0 0 345 301"
      aria-hidden="true"
      className={`pointer-events-none absolute -top-[4%] -right-[6%] w-[55%] max-w-[360px] ${className}`}
      style={style}
    >
      <path
        d="M1.71742 55.7421C-13.806 -18.3868 79.1237 5.52727 150.631 1.63665C171.147 0.456958 257.862 -6.50789 276.905 21.1991C299.589 54.0038 287.811 73.9374 332.909 160.488C357.397 207.66 341.667 271.25 308.788 292.832C265.971 320.91 153.717 263.941 121.897 194.953C81.1901 106.289 18.9596 138.301 1.71742 55.7421Z"
        fill="#289DD2"
        fillOpacity="0.14"
      />
      <path
        d="M1.71742 55.7421C-13.806 -18.3868 79.1237 5.52727 150.631 1.63665C171.147 0.456958 257.862 -6.50789 276.905 21.1991C299.589 54.0038 287.811 73.9374 332.909 160.488C357.397 207.66 341.667 271.25 308.788 292.832C265.971 320.91 153.717 263.941 121.897 194.953C81.1901 106.289 18.9596 138.301 1.71742 55.7421Z"
        fill="#1D4355"
        fillOpacity="0.05"
      />
    </svg>
  );
}
