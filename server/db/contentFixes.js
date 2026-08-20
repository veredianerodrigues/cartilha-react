import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pool from './pool.js';
import { uploadToStorage } from '../lib/supabaseStorage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

async function ensureCreditos() {
  const { rows } = await pool.query('SELECT id FROM sections WHERE slug = $1', ['creditos']);
  if (rows[0]) return;

  const inserted = await pool.query(
    `INSERT INTO sections (parent_id, slug, order_index, page_label, title, is_front_matter)
     VALUES (NULL, 'creditos', 9999, NULL, 'Créditos e ficha catalográfica', true)
     RETURNING id`
  );
  const sectionId = inserted.rows[0].id;

  const blocks = [
    { type: 'heading', heading: 'Autoria' },
    { type: 'paragraph', body: 'Cariane Renata Saldanha Fant Gonzatto' },
    { type: 'paragraph', body: 'Orientadora: Profª. Dra. Solange de Fátima Reis Conterno' },
    { type: 'paragraph', body: 'Cascavel, PR, 2026' },

    { type: 'heading', heading: 'Ficha catalográfica' },
    {
      type: 'paragraph',
      body:
        'Gonzatto, Cariane Renata Saldanha Fant. "Vamos conversar sobre gravidez na adolescência?" / Cariane Renata Saldanha Fant Gonzatto e Solange de Fátima Reis Conterno. Cascavel/ Paraná, 2026. 32 p.',
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

  for (const [i, b] of blocks.entries()) {
    await pool.query(
      `INSERT INTO blocks (section_id, order_index, type, heading, body, items_json, image_url, image_caption)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [sectionId, i, b.type, b.heading ?? null, b.body ?? null, null, null, null]
    );
  }

  console.log('[migração] seção "creditos" criada.');
}

// Seção excluída na revisão 10-08 da Cariane (conteúdo absorvido pelo callout
// "Olha só..." de classificacao-metodos) — já removida de SECTION_LAYOUTS e
// da TREE de seed, mas o banco existente não é reseedado, só recebe upserts.
// blocks tem ON DELETE CASCADE, então os blocos da seção caem junto.
async function dropMetodosComportamentais() {
  const { rowCount } = await pool.query("DELETE FROM sections WHERE slug = 'metodos-comportamentais'");
  if (rowCount > 0) console.log('[migração] seção "metodos-comportamentais" removida.');
}

// Título trocado na revisão 10-08 (comentário da Cariane: "achei meio
// desconexo aquele"). Só troca se ainda estiver com o título antigo, pra não
// sobrescrever uma edição manual feita depois pelo /admin.
async function renameGravidezSection() {
  const { rowCount } = await pool.query(
    `UPDATE sections SET title = $1 WHERE slug = 'gravidez-adolescencia-mudancas' AND title = $2`,
    ['E se a gravidez acontecer...', 'Gravidez na adolescência e mudanças']
  );
  if (rowCount > 0) console.log('[migração] título de "gravidez-adolescencia-mudancas" atualizado.');
}

const MIME_BY_EXT = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };

// Sobe pro Supabase Storage a partir de uma imagem-fonte versionada em
// src/assets — só é chamada quando o bloco ainda não tem image_url (ver
// fixImages), então não bate na rede de novo a cada boot depois da 1ª vez.
async function copyIfMissing(srcRelPath, destFileName) {
  const src = path.join(assetsRoot, srcRelPath);
  if (!fs.existsSync(src)) {
    console.warn(`[migração] imagem-fonte não encontrada: ${src}`);
    return null;
  }
  const buffer = fs.readFileSync(src);
  const contentType = MIME_BY_EXT[path.extname(destFileName).toLowerCase()] || 'application/octet-stream';
  return uploadToStorage(destFileName, buffer, contentType);
}

// Fotos genéricas (banco de imagens) sem citação acadêmica no documento-fonte —
// a Verediane confirmou usar essa legenda padrão pra todas elas.
const BANCO_IMAGENS = 'Fonte: Banco de imagens Canva.';

// slug -> imagens a preencher (na ordem em que devem aparecer na seção)
const IMAGE_FIXES = {
  'adolescencia-chegou': [
    { src: 'page05/menina-v2.png', dest: 'adolescencia-menina-v2.png', caption: BANCO_IMAGENS },
    { src: 'page05/menino-v2.png', dest: 'adolescencia-menino-v2.png', caption: BANCO_IMAGENS },
  ],
  'transformacoes-menino': [{ src: 'page07/foto.png', dest: 'transformacoes-menino-foto.png', caption: BANCO_IMAGENS }],
  'erecao-ejaculacao': [{ src: 'page08/foto.png', dest: 'erecao-ejaculacao-foto.png', caption: BANCO_IMAGENS }],
  'tanner-menino': [
    {
      src: 'page10/genitalia-v2.png',
      dest: 'tanner-menino-genitalia-v2.png',
      caption: 'Fonte: Brasil (2012a, p. 32-33).',
    },
    {
      src: 'page10/pelos-v2.png',
      dest: 'tanner-menino-pelos-v2.png',
      caption: 'Fonte: Brasil (2012a, p. 32-33).',
    },
    {
      // 3º bloco de imagem: foto ilustrativa do card "Você sabia..." (página 9).
      src: 'page09/grupo-v2.png',
      dest: 'tanner-menino-grupo-v2.png',
      caption: BANCO_IMAGENS,
    },
  ],
  'transformacoes-menina': [
    {
      src: 'page12/mamas-v2.png',
      dest: 'tanner-menina-mamas-v2.png',
      caption: 'Fonte: Brasil (2012b, p. 32-33).',
    },
    {
      src: 'page11/foto-v2.png',
      dest: 'transformacoes-menina-foto-v2.png',
      caption: BANCO_IMAGENS,
    },
    {
      // 3º bloco: diagrama de pelos pubianos (página 12), separado do de mamas.
      src: 'page12/pelos-v2.png',
      dest: 'tanner-menina-pelos-v2.png',
      caption: 'Fonte: Brasil (2012b, p. 32-33).',
    },
  ],
  menstruacao: [
    {
      src: 'page14/ciclo-v2.png',
      dest: 'ciclo-menstrual-v2.png',
      caption:
        'Fonte: Ilustração criada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), baseada em Guyton; Hall (2021) e Krishna; Witchel (2024).',
    },
    {
      src: 'page13/foto-v2.png',
      dest: 'menstruacao-foto-v2.png',
      caption: BANCO_IMAGENS,
    },
  ],
  fecundacao: [
    {
      src: 'page16/fecundacao-infografico.png',
      dest: 'fecundacao-diagrama-v2.png',
      caption:
        'Fonte: Elaborada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), com base em WHO (2022); Krishna; Witchel (2024).',
    },
  ],
  'metodos-contraceptivos': [
    { src: 'page17/foto.png', dest: 'metodos-contraceptivos-foto.png', caption: BANCO_IMAGENS },
  ],
  'metodos-barreira': [
    {
      // 1º bloco de imagem da seção = camisinha masculina. O 2º (camisinha
      // feminina) fica sem correção aqui de propósito: não existe ilustração
      // real disponível localmente para ela ainda — continuará mostrando o
      // placeholder até a Verediane cadastrar pelo /admin.
      src: 'page19/preservativo-masculino.png',
      dest: 'camisinha-masculina.png',
      caption:
        'Fonte: Ilustração elaborada por inteligência artificial generativa (ChatGPT/OpenAI, 2025), baseada em recomendações da World Health Organization (2022) e do Ministério da Saúde do Brasil (2022).',
    },
  ],
  diu: [
    {
      src: 'page21/diu-infografico.png',
      dest: 'diu-infografico.png',
      caption: 'Fonte: Elaborado pela autora com auxílio do ChatGPT (OpenAI), 2026.',
    },
    {
      src: 'page21/implanon-infografico.png',
      dest: 'implanon-infografico.png',
      caption: 'Fonte: Elaborado pela autora com auxílio do ChatGPT (OpenAI), 2026.',
    },
  ],
  'metodos-hormonais': [
    { src: 'page22/foto.png', dest: 'metodos-hormonais-visao-geral.png', caption: BANCO_IMAGENS },
    { src: 'page24/foto.png', dest: 'metodos-hormonais-adesivo.png', caption: BANCO_IMAGENS },
    { src: 'page25/foto.png', dest: 'metodos-hormonais-calendario.png', caption: BANCO_IMAGENS },
    { src: 'page26/foto.png', dest: 'metodos-hormonais-anel-vaginal.png', caption: BANCO_IMAGENS },
  ],
  'mitos-anticoncepcional': [{ src: 'page27/foto.png', dest: 'mitos-anticoncepcional-foto.png', caption: BANCO_IMAGENS }],
  'gravidez-adolescencia-mudancas': [
    { src: 'page29/foto.png', dest: 'gravidez-teste.png', caption: BANCO_IMAGENS },
    { src: 'page30/foto.png', dest: 'gravidez-barriga.png', caption: BANCO_IMAGENS },
  ],
  'orientacao-quem-pode-ajudar': [
    { src: 'page31/foto.png', dest: 'orientacao-foto.png', caption: BANCO_IMAGENS },
  ],
};

async function fixImages() {
  for (const [slug, fixes] of Object.entries(IMAGE_FIXES)) {
    const { rows: sectionRows } = await pool.query('SELECT id FROM sections WHERE slug = $1', [slug]);
    const section = sectionRows[0];
    if (!section) continue;

    const { rows: imageBlocks } = await pool.query(
      "SELECT * FROM blocks WHERE section_id = $1 AND type = 'image' ORDER BY order_index",
      [section.id]
    );

    for (const [i, fix] of fixes.entries()) {
      const target = imageBlocks[i];

      // Só faz upload se ainda estiver nulo — nunca sobrescreve edição manual,
      // e evita subir de novo pro Storage a cada boot depois da 1ª vez.
      if (target && target.image_url) continue;

      const url = await copyIfMissing(fix.src, fix.dest);
      if (!url) continue;

      if (target) {
        await pool.query(
          'UPDATE blocks SET image_url = $1, image_caption = COALESCE(image_caption, $2) WHERE id = $3',
          [url, fix.caption ?? null, target.id]
        );
        console.log(`[migração] imagem preenchida: ${slug} (bloco ${target.id}) -> ${url}`);
      } else {
        // Seção tem menos blocos de imagem do que o conteúdo original
        // (ex.: página 10 tinha 2 diagramas — genitália e pelos pubianos —
        // mas só 1 bloco de imagem foi migrado). Adiciona o que falta no fim.
        const { rows } = await pool.query(
          'SELECT COALESCE(MAX(order_index), -1) + 1 AS next FROM blocks WHERE section_id = $1',
          [section.id]
        );
        await pool.query(
          `INSERT INTO blocks (section_id, order_index, type, image_url, image_caption)
           VALUES ($1, $2, 'image', $3, $4)`,
          [section.id, rows[0].next, url, fix.caption]
        );
        console.log(`[migração] bloco de imagem novo criado: ${slug} -> ${url}`);
      }
    }
  }
}

export default async function runContentFixes() {
  await ensureCreditos();
  await dropMetodosComportamentais();
  await renameGravidezSection();
  await fixImages();
}
