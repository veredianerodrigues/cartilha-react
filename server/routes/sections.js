import { Router } from 'express';
import pool from '../db/pool.js';

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

router.get('/', async (req, res) => {
  const { rows } = await pool.query(
    `SELECT s.id, s.parent_id, s.slug, s.order_index, s.page_label, s.title, s.updated_at,
            EXISTS(SELECT 1 FROM blocks b WHERE b.section_id = s.id) AS "hasContent"
     FROM sections s
     WHERE s.is_front_matter = false
     ORDER BY s.parent_id IS NOT NULL, s.order_index`
  );

  res.json(buildTree(rows));
});

router.get('/:slug', async (req, res) => {
  const { rows: sectionRows } = await pool.query('SELECT * FROM sections WHERE slug = $1', [req.params.slug]);
  const section = sectionRows[0];
  if (!section) {
    return res.status(404).json({ error: 'Seção não encontrada.' });
  }

  const { rows: blockRows } = await pool.query('SELECT * FROM blocks WHERE section_id = $1 ORDER BY order_index', [
    section.id,
  ]);
  const blocks = blockRows.map((b) => ({ ...b, items: b.items_json ? JSON.parse(b.items_json) : null }));

  res.json({ ...section, blocks });
});

export default router;
