import fs from 'node:fs';
import dotenv from 'dotenv';
import pg from 'pg';

// Copia SÓ image_url/image_caption dos blocks tipo "image" de produção (.env)
// pro banco local (.env.local) — casando por seção (slug) + posição entre as
// imagens daquela seção. Não mexe em texto, título, ordem ou qualquer outro
// campo; útil quando o banco local foi resemeado do zero e caiu de volta nos
// fallbacks antigos de src/assets (ver contentFixes.js) em vez das imagens
// atuais que já foram re-enviadas pelo /admin em produção.
function readEnvFile(path) {
  if (!fs.existsSync(path)) return {};
  return dotenv.parse(fs.readFileSync(path));
}

const prodEnv = readEnvFile('.env');
const localEnv = readEnvFile('.env.local');

if (!prodEnv.DATABASE_URL) {
  console.error('[syncImagesFromProd] DATABASE_URL não encontrada em .env (produção).');
  process.exit(1);
}
if (!localEnv.DATABASE_URL) {
  console.error('[syncImagesFromProd] DATABASE_URL não encontrada em .env.local (destino).');
  process.exit(1);
}
if (prodEnv.DATABASE_URL === localEnv.DATABASE_URL) {
  console.error('[syncImagesFromProd] .env e .env.local apontam pro mesmo banco — abortando por segurança.');
  process.exit(1);
}

const prodPool = new pg.Pool({ connectionString: prodEnv.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const localPool = new pg.Pool({
  connectionString: localEnv.DATABASE_URL,
  ssl: /localhost|127\.0\.0\.1/.test(localEnv.DATABASE_URL) ? false : { rejectUnauthorized: false },
});

async function getImageBlocksBySlug(pool) {
  const { rows } = await pool.query(`
    SELECT s.slug, b.id, b.order_index, b.image_url, b.image_caption
    FROM blocks b
    JOIN sections s ON s.id = b.section_id
    WHERE b.type = 'image'
    ORDER BY s.slug, b.order_index
  `);
  const bySlug = {};
  for (const row of rows) {
    (bySlug[row.slug] ??= []).push(row);
  }
  return bySlug;
}

const [prodImages, localImages] = await Promise.all([getImageBlocksBySlug(prodPool), getImageBlocksBySlug(localPool)]);

let updated = 0;
let skipped = 0;

for (const [slug, prodBlocks] of Object.entries(prodImages)) {
  const localBlocks = localImages[slug];
  if (!localBlocks) {
    console.warn(`[syncImagesFromProd] seção "${slug}" não existe no banco local — pulando.`);
    continue;
  }
  for (let i = 0; i < prodBlocks.length; i += 1) {
    const prodBlock = prodBlocks[i];
    const localBlock = localBlocks[i];
    if (!localBlock) {
      console.warn(`[syncImagesFromProd] "${slug}": produção tem mais imagens (${prodBlocks.length}) que o local (${localBlocks.length}) — imagem ${i + 1} não copiada.`);
      skipped += 1;
      continue;
    }
    if (!prodBlock.image_url) continue;
    await localPool.query('UPDATE blocks SET image_url = $1, image_caption = $2 WHERE id = $3', [
      prodBlock.image_url,
      prodBlock.image_caption,
      localBlock.id,
    ]);
    console.log(`[syncImagesFromProd] ${slug} (imagem ${i + 1}) -> ${prodBlock.image_url}`);
    updated += 1;
  }
}

console.log(`\n[syncImagesFromProd] concluído: ${updated} imagem(ns) atualizada(s), ${skipped} pulada(s).`);

await prodPool.end();
await localPool.end();
