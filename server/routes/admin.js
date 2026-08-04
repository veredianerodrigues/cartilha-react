import { Router } from 'express';
import db from '../db/init.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();
router.use(requireAuth);

const BLOCK_TYPES = ['heading', 'paragraph', 'callout', 'quote_grid', 'list', 'image'];

function touchSection(id) {
  db.prepare("UPDATE sections SET updated_at = datetime('now') WHERE id = ?").run(id);
}

router.put('/sections/:id', (req, res) => {
  const { title, page_label, parent_id } = req.body || {};
  const section = db.prepare('SELECT * FROM sections WHERE id = ?').get(req.params.id);
  if (!section) return res.status(404).json({ error: 'Seção não encontrada.' });

  db.prepare(
    "UPDATE sections SET title = ?, page_label = ?, parent_id = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(
    title ?? section.title,
    page_label ?? section.page_label,
    parent_id === undefined ? section.parent_id : parent_id,
    section.id
  );

  res.json(db.prepare('SELECT * FROM sections WHERE id = ?').get(section.id));
});

router.post('/sections/:id/blocks', (req, res) => {
  const section = db.prepare('SELECT * FROM sections WHERE id = ?').get(req.params.id);
  if (!section) return res.status(404).json({ error: 'Seção não encontrada.' });

  const { type, heading = null, body = null, items = null, image_url = null, image_caption = null } = req.body || {};
  if (!BLOCK_TYPES.includes(type)) {
    return res.status(400).json({ error: `Tipo de bloco inválido. Use um de: ${BLOCK_TYPES.join(', ')}` });
  }

  const nextOrder = db
    .prepare('SELECT COALESCE(MAX(order_index), -1) + 1 AS next FROM blocks WHERE section_id = ?')
    .get(section.id).next;

  const info = db
    .prepare(
      `INSERT INTO blocks (section_id, order_index, type, heading, body, items_json, image_url, image_caption)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(section.id, nextOrder, type, heading, body, items ? JSON.stringify(items) : null, image_url, image_caption);

  touchSection(section.id);
  res.status(201).json(db.prepare('SELECT * FROM blocks WHERE id = ?').get(info.lastInsertRowid));
});

router.put('/sections/:id/blocks/reorder', (req, res) => {
  const { order } = req.body || {};
  if (!Array.isArray(order)) {
    return res.status(400).json({ error: 'Envie { order: [blockId, ...] } na nova ordem desejada.' });
  }

  const update = db.prepare('UPDATE blocks SET order_index = ? WHERE id = ? AND section_id = ?');
  const tx = db.transaction((ids) => {
    ids.forEach((blockId, index) => update.run(index, blockId, req.params.id));
  });
  tx(order);

  touchSection(req.params.id);
  res.json(db.prepare('SELECT * FROM blocks WHERE section_id = ? ORDER BY order_index').all(req.params.id));
});

router.put('/sections/:id/blocks/:blockId', (req, res) => {
  const block = db
    .prepare('SELECT * FROM blocks WHERE id = ? AND section_id = ?')
    .get(req.params.blockId, req.params.id);
  if (!block) return res.status(404).json({ error: 'Bloco não encontrado.' });

  const { type, heading, body, items, image_url, image_caption } = req.body || {};
  if (type && !BLOCK_TYPES.includes(type)) {
    return res.status(400).json({ error: `Tipo de bloco inválido. Use um de: ${BLOCK_TYPES.join(', ')}` });
  }

  db.prepare(
    `UPDATE blocks SET type = ?, heading = ?, body = ?, items_json = ?, image_url = ?, image_caption = ?
     WHERE id = ?`
  ).run(
    type ?? block.type,
    heading === undefined ? block.heading : heading,
    body === undefined ? block.body : body,
    items === undefined ? block.items_json : items ? JSON.stringify(items) : null,
    image_url === undefined ? block.image_url : image_url,
    image_caption === undefined ? block.image_caption : image_caption,
    block.id
  );

  touchSection(block.section_id);
  res.json(db.prepare('SELECT * FROM blocks WHERE id = ?').get(block.id));
});

router.delete('/sections/:id/blocks/:blockId', (req, res) => {
  const block = db
    .prepare('SELECT * FROM blocks WHERE id = ? AND section_id = ?')
    .get(req.params.blockId, req.params.id);
  if (!block) return res.status(404).json({ error: 'Bloco não encontrado.' });

  db.prepare('DELETE FROM blocks WHERE id = ?').run(block.id);
  touchSection(block.section_id);
  res.status(204).end();
});

export default router;
