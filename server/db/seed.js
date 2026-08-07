import 'dotenv/config';
import bcrypt from 'bcryptjs';
import pool, { ensureSchema } from './pool.js';
import { TREE, SECTION_BLOCKS } from './fullContent.js';

async function seedTree() {
  async function insertNode(node, parentId, orderIndex) {
    const { rows } = await pool.query(
      `INSERT INTO sections (parent_id, slug, order_index, page_label, title)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (slug) DO UPDATE SET
         parent_id = excluded.parent_id,
         order_index = excluded.order_index,
         page_label = excluded.page_label,
         title = excluded.title
       RETURNING id`,
      [parentId, node.slug, orderIndex, node.pageLabel, node.title]
    );
    const id = rows[0].id;
    const children = node.children || [];
    for (const [i, child] of children.entries()) {
      await insertNode(child, id, i);
    }
    return id;
  }

  for (const [i, node] of TREE.entries()) {
    await insertNode(node, null, i);
  }
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('ADMIN_EMAIL/ADMIN_PASSWORD não definidos no .env — pulando criação do usuário admin.');
    return;
  }

  const hash = bcrypt.hashSync(password, 10);
  await pool.query(
    `INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = excluded.password_hash`,
    [email, hash]
  );
}

async function clearBlocks(slug) {
  const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', [slug]);
  if (!rows[0]) return null;
  await pool.query('DELETE FROM blocks WHERE section_id = $1', [rows[0].id]);
  return rows[0].id;
}

async function insertBlocks(slug, blocks) {
  const sectionId = await clearBlocks(slug);
  if (!sectionId) {
    console.warn(`[seed] seção "${slug}" não encontrada — pulando blocos.`);
    return;
  }
  for (const [i, b] of blocks.entries()) {
    await pool.query(
      `INSERT INTO blocks (section_id, order_index, type, heading, body, items_json, image_url, image_caption)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        sectionId,
        i,
        b.type,
        b.heading ?? null,
        b.body ?? null,
        b.items ? JSON.stringify(b.items) : null,
        b.imageUrl ?? null,
        b.imageCaption ?? null,
      ]
    );
  }
}

async function seedAllContent() {
  for (const [slug, blocks] of Object.entries(SECTION_BLOCKS)) {
    await insertBlocks(slug, blocks);
  }
}

await ensureSchema();
await seedTree();
await seedAdmin();
await seedAllContent();

console.log(
  `Seed concluído: árvore de seções + conteúdo completo de ${Object.keys(SECTION_BLOCKS).length} seções.`
);

await pool.end();
