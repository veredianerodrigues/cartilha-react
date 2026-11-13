import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// Dataset público: leitura sem token, via CDN. Os ids vêm de VITE_SANITY_* (.env.local).
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2026-11-01',
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

// O _ref do asset traz as dimensões originais ("image-<id>-1000x750-png"); com elas o
// <img> reserva o espaço certo antes de carregar e a paginação do livro não pula.
export function dimensoes(source) {
  const [largura, altura] = source.asset._ref.split('-')[2].split('x').map(Number);
  return { largura, altura };
}

export function urlFor(source) {
  return builder.image(source).auto('format');
}
