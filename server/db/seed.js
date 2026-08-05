import 'dotenv/config';
import bcrypt from 'bcryptjs';
import db from './init.js';
import { TREE, SECTION_BLOCKS } from './fullContent.js';

function seedTree() {
  const insertSection = db.prepare(
    `INSERT INTO sections (parent_id, slug, order_index, page_label, title)
     VALUES (?, ?, ?, ?, ?)
     ON CONFLICT(slug) DO UPDATE SET
       parent_id = excluded.parent_id,
       order_index = excluded.order_index,
       page_label = excluded.page_label,
       title = excluded.title`
  );
  const getIdBySlug = db.prepare('SELECT id FROM sections WHERE slug = ?');

  function insertNode(node, parentId, orderIndex) {
    insertSection.run(parentId, node.slug, orderIndex, node.pageLabel, node.title);
    const id = getIdBySlug.get(node.slug).id;
    (node.children || []).forEach((child, i) => insertNode(child, id, i));
    return id;
  }

  TREE.forEach((node, i) => insertNode(node, null, i));
}

function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.warn('ADMIN_EMAIL/ADMIN_PASSWORD não definidos no .env — pulando criação do usuário admin.');
    return;
  }

  const hash = bcrypt.hashSync(password, 10);
  db.prepare(
    `INSERT INTO admin_users (email, password_hash) VALUES (?, ?)
     ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash`
  ).run(email, hash);
}

function clearBlocks(slug) {
  const section = db.prepare('SELECT id FROM sections WHERE slug = ?').get(slug);
  if (!section) return null;
  db.prepare('DELETE FROM blocks WHERE section_id = ?').run(section.id);
  return section.id;
}

function insertBlocks(slug, blocks) {
  const sectionId = clearBlocks(slug);
  if (!sectionId) {
    console.warn(`[seed] seção "${slug}" não encontrada — pulando blocos.`);
    return;
  }
  const insert = db.prepare(
    `INSERT INTO blocks (section_id, order_index, type, heading, body, items_json, image_url, image_caption)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  blocks.forEach((b, i) => {
    insert.run(
      sectionId,
      i,
      b.type,
      b.heading ?? null,
      b.body ?? null,
      b.items ? JSON.stringify(b.items) : null,
      b.imageUrl ?? null,
      b.imageCaption ?? null
    );
  });
}

function seedAllContent() {
  for (const [slug, blocks] of Object.entries(SECTION_BLOCKS)) {
    insertBlocks(slug, blocks);
  }
}

seedTree();
seedAdmin();
seedAllContent();

console.log(
  `Seed concluído: árvore de seções + conteúdo completo de ${Object.keys(SECTION_BLOCKS).length} seções.`
);
