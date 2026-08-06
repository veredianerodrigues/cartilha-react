import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';
import sharp from 'sharp';
import requireAuth from '../middleware/requireAuth.js';

const MAX_WIDTH = 1000;

// Reamostra/comprime a imagem recém-enviada no lugar — evita repetir o problema
// de fotos de celular/banco de imagens chegando com vários MB e deixando a
// navegação lenta no site (decodificação de imagem é trabalho de CPU no
// aparelho do visitante, não depende da conexão dele).
async function optimizeUpload(filePath, mimetype) {
  const image = sharp(filePath);
  const meta = await image.metadata();
  let pipeline = sharp(filePath);
  if (meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH });
  }
  if (mimetype === 'image/png') {
    pipeline = pipeline.png({ compressionLevel: 9, effort: 10, palette: true });
  } else if (mimetype === 'image/jpeg') {
    pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
  } else if (mimetype === 'image/webp') {
    pipeline = pipeline.webp({ quality: 80 });
  }
  const buffer = await pipeline.toBuffer();
  await fs.writeFile(filePath, buffer);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Apenas arquivos de imagem são permitidos.'));
    }
    cb(null, true);
  },
});

const router = Router();

router.post('/', requireAuth, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
  }
  try {
    await optimizeUpload(req.file.path, req.file.mimetype);
  } catch {
    // Se a otimização falhar (ex.: formato exótico), mantém o arquivo original
    // já salvo pelo multer em vez de derrubar o upload.
  }
  res.status(201).json({ url: `/uploads/${req.file.filename}` });
});

export default router;
