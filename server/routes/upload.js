import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import sharp from 'sharp';
import requireAuth from '../middleware/requireAuth.js';
import { uploadToStorage } from '../lib/supabaseStorage.js';

const MAX_WIDTH = 1000;

// Reamostra/comprime a imagem recém-enviada em memória — evita repetir o
// problema de fotos de celular/banco de imagens chegando com vários MB e
// deixando a navegação lenta no site (decodificação de imagem é trabalho de
// CPU no aparelho do visitante, não depende da conexão dele).
async function optimizeUpload(buffer, mimetype) {
  const meta = await sharp(buffer).metadata();
  let pipeline = sharp(buffer);
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
  return pipeline.toBuffer();
}

const upload = multer({
  storage: multer.memoryStorage(),
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

  const ext = path.extname(req.file.originalname).toLowerCase();
  const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

  let buffer = req.file.buffer;
  try {
    buffer = await optimizeUpload(req.file.buffer, req.file.mimetype);
  } catch {
    // Se a otimização falhar (ex.: formato exótico), sobe o arquivo original
    // em vez de derrubar o upload.
  }

  const url = await uploadToStorage(filename, buffer, req.file.mimetype);
  res.status(201).json({ url });
});

export default router;
