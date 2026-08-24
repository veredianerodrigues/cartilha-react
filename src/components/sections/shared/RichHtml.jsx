import { useMemo } from 'react';
import { useSections } from '../../../context/SectionsContext.jsx';

// Transforma cada <sup data-citation data-n="9,19"> salvo no banco (ver
// RichTextEditor.jsx) em números clicáveis que levam pra entrada certa na
// página de Referências. "9" e "19" aqui são ids ESTÁVEIS da referência
// (nunca mudam), não a posição de exibição — citationMap resolve pra posição
// ATUAL (pode ter mudado se a lista de Referências foi reordenada desde que
// a citação foi escrita; ver migrateReferenciasText.js e SectionsContext.jsx).
// Se o id não existir no mapa (referência removida ou mapa ainda carregando),
// mostra o próprio id como aviso visual de que algo precisa de atenção, em
// vez de simplesmente sumir sem explicação.
//
// Usa o DOM em vez de regex pra não depender da ordem dos atributos no HTML
// salvo — o editor rico e os scripts de migração não geram sempre na mesma ordem.
function linkifyCitations(html, citationMap) {
  if (!html) return html;
  const container = document.createElement('div');
  container.innerHTML = html;
  container.querySelectorAll('sup[data-citation]').forEach((sup) => {
    const ids = (sup.getAttribute('data-n') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!ids.length) return;
    sup.innerHTML = ids
      .map((id) => {
        const position = citationMap[id];
        const label = position ?? id;
        return `<a href="/secao/referencias#ref-${position ?? id}" class="hover:underline">${label}</a>`;
      })
      .join(',');
  });
  return container.innerHTML;
}

// Substituto de um <div dangerouslySetInnerHTML> puro — usar sempre que for
// jogar HTML salvo do banco na tela, pra citações saírem clicáveis (com o
// número certo) em qualquer lugar da cartilha sem precisar tratar cada ponto
// na mão.
export default function RichHtml({ html, className = '' }) {
  const { citationMap } = useSections();
  const linked = useMemo(() => linkifyCitations(html, citationMap || {}), [html, citationMap]);
  return <div className={className} dangerouslySetInnerHTML={{ __html: linked || '' }} />;
}
