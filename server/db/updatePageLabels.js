import 'dotenv/config';
import pool from './pool.js';
import { TREE } from './fullContent.js';

// Atualiza só sections.page_label a partir do TREE em fullContent.js —
// ao contrário de seed.js, nunca toca em `blocks` (onde ficam as imagens
// cadastradas pelo /admin), então é seguro rodar mesmo com uploads recentes.
async function updateLabels(nodes) {
  for (const node of nodes) {
    const { rowCount } = await pool.query(
      `UPDATE sections SET page_label = $1 WHERE slug = $2`,
      [node.pageLabel, node.slug]
    );
    if (rowCount === 0) {
      console.warn(`[updatePageLabels] seção "${node.slug}" não encontrada no banco — pulando.`);
    } else {
      console.log(`[updatePageLabels] ${node.slug} -> ${node.pageLabel}`);
    }
    if (node.children?.length) {
      await updateLabels(node.children);
    }
  }
}

await updateLabels(TREE);
console.log('Numeração de páginas atualizada.');

await pool.end();
