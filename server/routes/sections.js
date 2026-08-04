import { Router } from 'express';
import db from '../db/init.js';

const router = Router();

function buildTree(rows) {
  const bySlugId = new Map(rows.map((r) => [r.id, { ...r, children: [] }]));
  const roots = [];

  for (const row of bySlugId.values()) {
    if (row.parent_id && bySlugId.has(row.parent_id)) {
      bySlugId.get(row.parent_id).children.push(row);
    } else {
      roots.push(row);
    }
  }

  return roots;
}

router.get('/', (req, res) => {
  const rows = db
    .prepare(
      `SELECT s.id, s.parent_id, s.slug, s.order_index, s.page_label, s.title, s.updated_at,
              EXISTS(SELECT 1 FROM blocks b WHERE b.section_id = s.id) AS hasContent
       FROM sections s
       ORDER BY s.parent_id IS NOT NULL, s.order_index`
    )
    .all()
    .map((r) => ({ ...r, hasContent: Boolean(r.hasContent) }));

  res.json(buildTree(rows));
});

router.get('/:slug', (req, res) => {
  const section = db.prepare('SELECT * FROM sections WHERE slug = ?').get(req.params.slug);
  if (!section) {
    return res.status(404).json({ error: 'Seção não encontrada.' });
  }

  const blocks = db
    .prepare('SELECT * FROM blocks WHERE section_id = ? ORDER BY order_index')
    .all(section.id)
    .map((b) => ({ ...b, items: b.items_json ? JSON.parse(b.items_json) : null }));

  res.json({ ...section, blocks });
});

export default router;
