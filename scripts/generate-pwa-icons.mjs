// Gera os ícones do PWA a partir de src/assets/selo.png (rodar com `node scripts/generate-pwa-icons.mjs`).
// Não faz parte do build — os PNGs de saída ficam versionados em public/icons.
import sharp from 'sharp';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const source = path.join(root, 'src/assets/selo.png');
const outDir = path.join(root, 'public/icons');

const BRAND_DARK = { r: 0x1d, g: 0x43, b: 0x55, alpha: 1 };

async function plainIcon(size, file) {
  await sharp(source).resize(size, size).png().toFile(path.join(outDir, file));
}

// Ícones "maskable"/Apple não podem ter fundo transparente (o SO aplica sua
// própria máscara/recorte) — compõe o selo sobre um fundo sólido da marca,
// com a foto reduzida pra caber na "safe zone" central recomendada (~80%).
async function safeZoneIcon(size, file, { opaque = true } = {}) {
  const inner = Math.round(size * 0.8);
  const badge = await sharp(source).resize(inner, inner).png().toBuffer();
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: opaque ? BRAND_DARK : { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([{ input: badge, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, file));
}

async function main() {
  await plainIcon(192, 'icon-192.png');
  await plainIcon(512, 'icon-512.png');
  await safeZoneIcon(512, 'maskable-512.png');
  await safeZoneIcon(180, 'apple-touch-icon.png');
  await plainIcon(48, 'favicon-48.png');
  console.log('Ícones gerados em public/icons/');
}

main();
