import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db from './init.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsDir = path.join(__dirname, '..', 'uploads');
const assetsRoot = path.join(__dirname, '..', '..', 'src', 'assets');

/**
 * Migração idempotente rodada a cada boot do servidor. Só cria o que ainda não
 * existe / só preenche image_url onde ainda está nulo — nunca sobrescreve
 * conteúdo já editado pelo admin. Resolve dois problemas encontrados numa
 * auditoria de conteúdo (site publicado x documento-fonte em Word):
 *   1. Contracapa + ficha catalográfica (autoria, catalogação, copyright) não
 *      apareciam em lugar nenhum do site publicado — vira a seção "creditos".
 *   2. 5 blocos de imagem tinham legenda "Fonte: ..." mas image_url nulo
 *      (placeholder "Imagem a cadastrar" no lugar da ilustração real).
 */

function ensureCreditos() {
  const exists = db.prepare('SELECT id FROM sections WHERE slug = ?').get('creditos');
  if (exists) return;

  const info = db
    .prepare(
      `INSERT INTO sections (parent_id, slug, order_index, page_label, title, is_front_matter)
       VALUES (NULL, 'creditos', 9999, NULL, 'Créditos e ficha catalográfica', 1)`
    )
    .run();
  const sectionId = info.lastInsertRowid;

  const blocks = [
    { type: 'heading', heading: 'Autoria' },
    { type: 'paragraph', body: 'Cariane Renata Saldanha Fant Gonzatto' },
    { type: 'paragraph', body: 'Orientadora: Profª. Dra. Solange de Fátima Reis Conterno' },
    { type: 'paragraph', body: 'Cascavel, PR, 2026' },

    { type: 'heading', heading: 'Ficha catalográfica' },
    {
      type: 'paragraph',
      body:
        'Gonzatto, Cariane Renata Saldanha Fant. "Vamos conversar sobre gravidez na adolescência?" / Cariane Renata Saldanha Fant Gonzatto e Solange de Fátima Reis Conterno. Cascavel/ Paraná, 2026. 36 p.',
    },
    { type: 'paragraph', body: '2. ed. Revisada e atualizada.' },
    {
      type: 'paragraph',
      body:
        'Dissertação (Mestrado Acadêmico) - Universidade Estadual do Oeste do Paraná. Programa de Pós-graduação em Biociências e Saúde, 2022. Orientadora: Profª. Dra. Solange de Fátima Reis Conterno. 1. Educação em Saúde. 2. Tecnologia educativa. 3. Saúde do Adolescente. 4. Gravidez na adolescência. I. Conterno, Solange de Fátima Reis, orient. II. Título.',
    },

    { type: 'heading', heading: 'Copyright e produção' },
    { type: 'paragraph', body: 'Copyright: Dos autores. Todos os direitos reservados – 2026.' },
    { type: 'paragraph', body: 'Revisão: Prof.ª Dra. Solange de Fátima Reis Conterno.' },
    { type: 'paragraph', body: 'Produção gráfica: Verediane Rodrigues dos Santos Monteiro.' },
    { type: 'paragraph', body: 'Realização: Programa de Pós-graduação em Biociências e Saúde.' },
    {
      type: 'callout',
      heading: 'Sobre esta edição',
      body:
        'Esta obra corresponde à 2.ª edição revisada e atualizada da cartilha "Vamos conversar sobre gravidez na adolescência?", originalmente publicada em 2022 como produto técnico-educacional vinculado à Dissertação de Mestrado Acadêmico do Programa de Pós-Graduação em Biociências e Saúde da Universidade Estadual do Oeste do Paraná (Unioeste). Esta edição incorpora a revisão e a atualização do conteúdo científico e das informações apresentadas.',
    },
  ];

  const insert = db.prepare(
    `INSERT INTO blocks (section_id, order_index, type, heading, body, items_json, image_url, image_caption)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  blocks.forEach((b, i) =>
    insert.run(sectionId, i, b.type, b.heading ?? null, b.body ?? null, null, null, null)
  );

  console.log('[migração] seção "creditos" criada.');
}

function copyIfMissing(srcRelPath, destFileName) {
  const dest = path.join(uploadsDir, destFileName);
  if (fs.existsSync(dest)) return `/uploads/${destFileName}`;
  const src = path.join(assetsRoot, srcRelPath);
  if (!fs.existsSync(src)) {
    console.warn(`[migração] imagem-fonte não encontrada: ${src}`);
    return null;
  }
  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.copyFileSync(src, dest);
  return `/uploads/${destFileName}`;
}

// slug -> imagens a preencher (na ordem em que devem aparecer na seção)
const IMAGE_FIXES = {
  'tanner-menino': [
    {
      src: 'page10/image2.png',
      dest: 'tanner-menino-genitalia.png',
      caption: 'Fonte: Brasil (2012a, p. 32-33).',
    },
    {
      src: 'page10/image3.png',
      dest: 'tanner-menino-pelos.png',
      caption: 'Fonte: Brasil (2012a, p. 32-33).',
    },
  ],
  'transformacoes-menina': [
    {
      src: 'page12/image5.png',
      dest: 'tanner-menina.png',
      caption: 'Fonte: Brasil (2012b, p. 32-33).',
    },
  ],
  menstruacao: [
    {
      src: 'page14/design-sem-nome3-2.png',
      dest: 'ciclo-menstrual.png',
      caption:
        'Fonte: Ilustração criada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), baseada em Guyton; Hall (2021) e Krishna; Witchel (2024).',
    },
  ],
  'metodos-barreira': [
    {
      // 1º bloco de imagem da seção = camisinha masculina. O 2º (camisinha
      // feminina) fica sem correção aqui de propósito: não existe ilustração
      // real disponível localmente para ela ainda (só o Figma original tem
      // essa arte) — continuará mostrando o placeholder até puxarmos do Figma.
      src: 'page19/preservativo-masculino.png',
      dest: 'camisinha-masculina.png',
      caption:
        'Fonte: Ilustração elaborada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), baseada em recomendações da World Health Organization (2022) e do Ministério da Saúde do Brasil (2022).',
    },
  ],
};

function fixImages() {
  for (const [slug, fixes] of Object.entries(IMAGE_FIXES)) {
    const section = db.prepare('SELECT id FROM sections WHERE slug = ?').get(slug);
    if (!section) continue;

    const imageBlocks = db
      .prepare("SELECT * FROM blocks WHERE section_id = ? AND type = 'image' ORDER BY order_index")
      .all(section.id);

    fixes.forEach((fix, i) => {
      const url = copyIfMissing(fix.src, fix.dest);
      if (!url) return;

      const target = imageBlocks[i];
      if (target) {
        // Só preenche se ainda estiver nulo — nunca sobrescreve edição manual.
        if (!target.image_url) {
          db.prepare('UPDATE blocks SET image_url = ?, image_caption = COALESCE(image_caption, ?) WHERE id = ?').run(
            url,
            fix.caption ?? null,
            target.id
          );
          console.log(`[migração] imagem preenchida: ${slug} (bloco ${target.id}) -> ${url}`);
        }
      } else if (fix.caption) {
        // Seção tem menos blocos de imagem do que o conteúdo original
        // (ex.: página 10 tinha 2 diagramas — genitália e pelos pubianos —
        // mas só 1 bloco de imagem foi migrado). Adiciona o que falta no fim.
        const nextOrder = db
          .prepare('SELECT COALESCE(MAX(order_index), -1) + 1 AS next FROM blocks WHERE section_id = ?')
          .get(section.id).next;
        db.prepare(
          `INSERT INTO blocks (section_id, order_index, type, image_url, image_caption)
           VALUES (?, ?, 'image', ?, ?)`
        ).run(section.id, nextOrder, url, fix.caption);
        console.log(`[migração] bloco de imagem novo criado: ${slug} -> ${url}`);
      }
    });
  }
}

export default function runContentFixes() {
  ensureCreditos();
  fixImages();
}
