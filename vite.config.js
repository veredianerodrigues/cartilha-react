import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// O Studio (/studio) é carregado sob demanda e tem dezenas de MB de JS. Só os
// chunks alcançáveis por import estático a partir da entrada vão pro precache
// do PWA; o resto (Studio) é baixado só quando alguém abre /studio.
const appChunks = new Set();
const trackAppChunks = {
  name: 'track-app-chunks',
  generateBundle(_, bundle) {
    const visit = (name) => {
      if (appChunks.has(name) || !bundle[name]) return;
      appChunks.add(name);
      bundle[name].imports?.forEach(visit);
    };
    Object.values(bundle).forEach((c) => c.type === 'chunk' && c.isEntry && visit(c.fileName));
  },
};

export default defineConfig({
  plugins: [
    react(),
    trackAppChunks,
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      manifest: {
        name: 'Vamos conversar sobre gravidez na adolescência?',
        short_name: 'Cartilha',
        description: 'Cartilha educativa sobre gravidez na adolescência.',
        lang: 'pt-BR',
        start_url: '/',
        display: 'standalone',
        background_color: '#f5f5ef',
        theme_color: '#1D4355',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // App shell (JS/CSS/fontes/imagens das páginas "legado" importadas em
        // build-time) vai todo pro precache — funciona offline sem depender
        // de o usuário já ter visitado a página.
        globPatterns: ['**/*.{js,css,html,png,svg,jpg,jpeg,webp,woff2}'],
        // Sem limite de tamanho aqui: o filtro do Studio é o manifestTransforms abaixo.
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        manifestTransforms: [
          async (entries) => ({
            manifest: entries.filter((e) => !e.url.endsWith('.js') || e.url === 'sw.js' || appChunks.has(e.url)),
            warnings: [],
          }),
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//, /^\/studio/],
        runtimeCaching: [
          {
            // Conteúdo das seções vindo da API (texto dos blocos) — busca na
            // rede quando online (mantém atualizado), cai pro cache salvo
            // quando offline.
            urlPattern: ({ url }) => url.pathname.startsWith('/api/sections'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-sections',
              expiration: { maxEntries: 200 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            // Imagens enviadas pelo admin: ficam no bucket público do
            // Supabase Storage (outra origem), não em /uploads local.
            urlPattern: ({ url }) => url.pathname.includes('/storage/v1/object/public/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'section-images',
              expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 180 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
