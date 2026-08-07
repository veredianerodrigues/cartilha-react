import { useEffect, useState } from 'react';

const DISMISS_KEY = 'cartilha_install_dismissed';

function isStandalone() {
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function isIos() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

// Aviso discreto (uma tarja fina, sem sobrepor nada) sugerindo instalar o app
// na tela inicial — some sozinho se já estiver instalado e fica escondido
// depois que a pessoa instala ou fecha o aviso (localStorage).
export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const [platform, setPlatform] = useState(null);

  useEffect(() => {
    if (isStandalone() || localStorage.getItem(DISMISS_KEY)) return;

    function handleBeforeInstall(event) {
      event.preventDefault();
      setDeferredPrompt(event);
      setPlatform('generic');
      setVisible(true);
    }

    function handleInstalled() {
      setVisible(false);
      setDeferredPrompt(null);
      localStorage.setItem(DISMISS_KEY, '1');
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleInstalled);

    // Safari no iOS nunca dispara beforeinstallprompt — mostra a dica manual.
    if (isIos()) {
      setPlatform('ios');
      setVisible(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  function dismiss() {
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, '1');
  }

  async function install() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setVisible(false);
    localStorage.setItem(DISMISS_KEY, '1');
  }

  if (!visible) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-[#eaf6f5] border-b border-brand-teal/30">
      <span className="flex-1 min-w-0 font-worksans text-xs text-brand-darker">
        {platform === 'ios'
          ? 'Instale este app: toque em Compartilhar e depois em "Adicionar à Tela de Início".'
          : 'Instale este app na tela inicial pra acessar offline.'}
      </span>
      {platform !== 'ios' && (
        <button
          onClick={install}
          className="shrink-0 font-poppins font-medium text-xs text-brand-blue hover:text-brand-dark transition"
        >
          Instalar
        </button>
      )}
      <button
        onClick={dismiss}
        aria-label="Fechar aviso de instalação"
        className="shrink-0 text-slate-400 hover:text-slate-600 text-base leading-none"
      >
        ×
      </button>
    </div>
  );
}
