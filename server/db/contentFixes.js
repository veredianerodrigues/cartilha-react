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

// Arquivos que precisam existir em server/uploads independente do estado do
// banco (o seed grava a URL, mas o arquivo físico precisa ser copiado do
// código-fonte pra dentro do volume persistido — ver Dockerfile).
const REQUIRED_FILES = [];

function ensureRequiredFiles() {
  for (const f of REQUIRED_FILES) copyIfMissing(f.src, f.dest);
}

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
  'metodos-comportamentais': [
    { src: 'page18/foto.png', dest: 'metodos-comportamentais-foto.png', caption: BANCO_IMAGENS },
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
      } else {
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
  ensureRequiredFiles();
  ensureCreditos();
  fixImages();
}
