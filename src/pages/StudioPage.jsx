import { useEffect } from 'react';
import { Studio } from 'sanity';
import config from '../studio/config.ts';

// O Studio é em inglês e o site declara lang="pt-BR": o tradutor automático do
// navegador reescreve o DOM do Studio e quebra o React ("removeChild ... not a
// child of this node") ao publicar. Desliga a tradução enquanto o Studio estiver aberto.
export default function StudioPage() {
  useEffect(() => {
    const html = document.documentElement;
    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);
    html.setAttribute('translate', 'no');
    html.classList.add('notranslate');
    return () => {
      meta.remove();
      html.removeAttribute('translate');
      html.classList.remove('notranslate');
    };
  }, []);

  // O Studio ocupa 100% da altura do pai; sem isso ele encolhe pro tamanho do conteúdo.
  return (
    <div style={{ height: "100vh" }}>
      <Studio config={config} />
    </div>
  );
}
