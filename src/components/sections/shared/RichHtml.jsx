import { useMemo } from 'react';

// Transforma cada <sup data-citation data-n="9,19"> salvo no banco (ver
// RichTextEditor.jsx) em números clicáveis que levam pra entrada certa na
// página de Referências (id="ref-N", ver Referencias.jsx). Usa o DOM em vez
// de regex pra não depender da ordem dos atributos no HTML salvo — o editor
// rico e os scripts de migração não geram sempre na mesma ordem.
function linkifyCitations(html) {
  if (!html) return html;
  const container = document.createElement('div');
  container.innerHTML = html;
  container.querySelectorAll('sup[data-citation]').forEach((sup) => {
    const nums = (sup.getAttribute('data-n') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!nums.length) return;
    sup.innerHTML = nums.map((n) => `<a href="/secao/referencias#ref-${n}" class="hover:underline">${n}</a>`).join(',');
  });
  return container.innerHTML;
}

// Substituto de um <div dangerouslySetInnerHTML> puro — usar sempre que for
// jogar HTML salvo do banco na tela, pra citações saírem clicáveis em
// qualquer lugar da cartilha sem precisar tratar cada ponto na mão.
export default function RichHtml({ html, className = '' }) {
  const linked = useMemo(() => linkifyCitations(html), [html]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: linked || '' }} />;
}
