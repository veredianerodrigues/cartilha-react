import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
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
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
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
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/uploads': 'http://localhost:3001',
    },
  },
})
