import './loadEnv.js';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './routes/auth.js';
import sectionsRoutes from './routes/sections.js';
import adminRoutes from './routes/admin.js';
import uploadRoutes from './routes/upload.js';
import runContentFixes from './db/contentFixes.js';
import { ensureSchema } from './db/pool.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sections', sectionsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/upload', uploadRoutes);

// Em produção, o próprio Express serve o build do Vite (npm run build -> dist/).
const distDir = path.join(__dirname, '..', 'dist');
app.use(express.static(distDir));
app.get(/^(?!\/api).*/, (req, res, next) => {
  res.sendFile(path.join(distDir, 'index.html'), (err) => {
    if (err) next();
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Erro interno do servidor.' });
});

const port = process.env.PORT || 3001;

async function main() {
  await ensureSchema();

  // Migração idempotente de conteúdo (seção de créditos + imagens que
  // ficaram com legenda mas sem arquivo). Roda a cada boot; não faz nada se
  // já tiver rodado antes. Ver server/db/contentFixes.js. Precisa terminar
  // antes do listen: senão o servidor aceita requisições numa janela em que
  // o backfill de conteúdo/imagens ainda não rodou.
  try {
    await runContentFixes();
  } catch (err) {
    console.error('[migração] falhou (servidor segue normalmente):', err);
  }

  app.listen(port, () => {
    console.log(`API da cartilha rodando em http://localhost:${port}`);
  });
}

main();
