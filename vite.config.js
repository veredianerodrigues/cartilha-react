import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Em desenvolvimento a API roda à parte (npm run api, porta 3001).
  server: { proxy: { "/api": "http://localhost:3001" } },
  plugins: [
    react(),
    // O site não funciona mais offline. Este plugin só gera um /sw.js que se autodestrói:
    // nos navegadores que ainda têm o service worker antigo (que guardava uma versão velha
    // do site), ele apaga os caches e se desregistra na próxima visita. Mantenha este sw.js
    // publicado: se ele sumir (404), o navegador conserva o service worker antigo.
    VitePWA({
      selfDestroying: true,
      injectRegister: false,
      manifest: false,
    }),
  ],
})
