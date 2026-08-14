// Citação em número sobrescrito, no padrão adotado na revisão 10-08 (antes era
// autor-data). O número é a posição da obra na lista de Referencias.jsx, que é
// alfabética — se a lista mudar de ordem ou ganhar/perder uma entrada, os
// números de todas as seções precisam ser reconferidos.
export default function Cite({ n }) {
  const nums = Array.isArray(n) ? n : [n];
  return <sup className="text-[0.7em] leading-none align-super">{nums.join(',')}</sup>;
}
