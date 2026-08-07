import { api } from './api.js';

function collectImageUrls(section) {
  const urls = [];
  for (const block of section.blocks || []) {
    if (block.type === 'image' && block.image_url) urls.push(block.image_url);
  }
  return urls;
}

function flattenSlugs(nodes, out = []) {
  for (const node of nodes) {
    out.push(node.slug);
    if (node.children?.length) flattenSlugs(node.children, out);
  }
  return out;
}

// Baixa o conteúdo e as imagens de todas as seções em segundo plano, pra que
// o service worker (ver vite.config.js) já tenha tudo em cache na primeira
// visita online — depois disso a cartilha inteira funciona offline, mesmo em
// páginas que o usuário nunca abriu. Silenciosa: falha de rede aqui não deve
// incomodar quem está só navegando normalmente.
export async function precacheWholeCartilha(tree) {
  if (!navigator.onLine) return;

  const slugs = flattenSlugs(tree);
  const imageUrls = new Set();

  for (const slug of slugs) {
    try {
      const section = await api.getSection(slug);
      collectImageUrls(section).forEach((url) => imageUrls.add(url));
    } catch {
      // Segue tentando as outras seções.
    }
  }

  await Promise.all(
    [...imageUrls].map((url) => fetch(url, { mode: 'cors' }).catch(() => {})),
  );
}
