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

export function urlFor(source) {
  return builder.image(source).auto('format');
}
