import { Router } from 'express';
import pool from '../db/pool.js';
import requireAuth from '../middleware/requireAuth.js';

const router = Router();
router.use(requireAuth);

const BLOCK_TYPES = ['heading', 'paragraph', 'callout', 'quote_grid', 'list', 'image'];

async function touchSection(id) {
  await pool.query("UPDATE sections SET updated_at = now() WHERE id = $1", [id]);
}

router.put('/sections/:id', async (req, res) => {
  const { title, page_label, parent_id } = req.body || {};
  const { rows } = await pool.query('SELECT * FROM sections WHERE id = $1', [req.params.id]);
  const section = rows[0];
  if (!section) return res.status(404).json({ error: 'Seção não encontrada.' });

  await pool.query(
    'UPDATE sections SET title = $1, page_label = $2, parent_id = $3, updated_at = now() WHERE id = $4',
    [
      title ?? section.title,
      page_label ?? section.page_label,
      parent_id === undefined ? section.parent_id : parent_id,
      section.id,
    ]
  );

  const { rows: updated } = await pool.query('SELECT * FROM sections WHERE id = $1', [section.id]);
  res.json(updated[0]);
});

router.post('/sections/:id/blocks', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM sections WHERE id = $1', [req.params.id]);
  const section = rows[0];
  if (!section) return res.status(404).json({ error: 'Seção não encontrada.' });

  const { type, heading: requestedHeading = null, body = null, items = null, image_url = null, image_caption = null } =
    req.body || {};
  if (!BLOCK_TYPES.includes(type)) {
    return res.status(400).json({ error: `Tipo de bloco inválido. Use um de: ${BLOCK_TYPES.join(', ')}` });
  }

  // Em "referencias", heading é o id ESTÁVEL que as citações apontam (ver
  // migrateReferenciasText.js) — não deixamos o cliente escolher, pra nunca
  // colidir com um id já citado em algum lugar da cartilha. Gera o próximo
  // número livre automaticamente.
  let heading = requestedHeading;
  if (section.slug === 'referencias' && type === 'paragraph') {
    const { rows: idRows } = await pool.query(
      "SELECT heading FROM blocks WHERE section_id = $1 AND heading ~ '^[0-9]+$'",
      [section.id]
    );
    const maxId = idRows.reduce((max, r) => Math.max(max, parseInt(r.heading, 10)), 0);
    heading = String(maxId + 1);
  }

  const { rows: orderRows } = await pool.query(
    'SELECT COALESCE(MAX(order_index), -1) + 1 AS next FROM blocks WHERE section_id = $1',
    [section.id]
  );

  const { rows: inserted } = await pool.query(
    `INSERT INTO blocks (section_id, order_index, type, heading, body, items_json, image_url, image_caption)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [section.id, orderRows[0].next, type, heading, body, items ? JSON.stringify(items) : null, image_url, image_caption]
  );

  await touchSection(section.id);
  res.status(201).json(inserted[0]);
});

router.put('/sections/:id/blocks/reorder', async (req, res) => {
  const { order } = req.body || {};
  if (!Array.isArray(order)) {
    return res.status(400).json({ error: 'Envie { order: [blockId, ...] } na nova ordem desejada.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const [index, blockId] of order.entries()) {
      await client.query('UPDATE blocks SET order_index = $1 WHERE id = $2 AND section_id = $3', [
        index,
        blockId,
        req.params.id,
      ]);
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }

  await touchSection(req.params.id);
  const { rows } = await pool.query('SELECT * FROM blocks WHERE section_id = $1 ORDER BY order_index', [
    req.params.id,
  ]);
  res.json(rows);
});

router.put('/sections/:id/blocks/:blockId', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM blocks WHERE id = $1 AND section_id = $2', [
    req.params.blockId,
    req.params.id,
  ]);
  const block = rows[0];
  if (!block) return res.status(404).json({ error: 'Bloco não encontrado.' });

  const { type, heading, body, items, image_url, image_caption } = req.body || {};
  if (type && !BLOCK_TYPES.includes(type)) {
    return res.status(400).json({ error: `Tipo de bloco inválido. Use um de: ${BLOCK_TYPES.join(', ')}` });
  }

  const { rows: updated } = await pool.query(
    `UPDATE blocks SET type = $1, heading = $2, body = $3, items_json = $4, image_url = $5, image_caption = $6
     WHERE id = $7
     RETURNING *`,
    [
      type ?? block.type,
      heading === undefined ? block.heading : heading,
      body === undefined ? block.body : body,
      items === undefined ? block.items_json : items ? JSON.stringify(items) : null,
      image_url === undefined ? block.image_url : image_url,
      image_caption === undefined ? block.image_caption : image_caption,
      block.id,
    ]
  );

  await touchSection(block.section_id);
  res.json(updated[0]);
});

router.delete('/sections/:id/blocks/:blockId', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM blocks WHERE id = $1 AND section_id = $2', [
    req.params.blockId,
    req.params.id,
  ]);
  const block = rows[0];
  if (!block) return res.status(404).json({ error: 'Bloco não encontrado.' });

  await pool.query('DELETE FROM blocks WHERE id = $1', [block.id]);
  await touchSection(block.section_id);
  res.status(204).end();
});

export default router;
