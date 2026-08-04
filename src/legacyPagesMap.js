// As seções ainda não migradas para o banco continuam sendo servidas pelos
// componentes Page*.jsx originais (layout fixo 595x842, herdado do Figma).
// O nome do arquivo (ex. Page05.jsx) corresponde ao page_label da seção ("05").
const modules = import.meta.glob('./pages/Page*.jsx', { eager: true });

const legacyPages = {};
for (const [filePath, mod] of Object.entries(modules)) {
  const match = filePath.match(/Page(\d{2})\.jsx$/);
  if (match) legacyPages[match[1]] = mod.default;
}

export function getLegacyPage(pageLabel) {
  if (!pageLabel) return null;
  return legacyPages[pageLabel.padStart(2, '0')] || null;
}
