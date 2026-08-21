import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SWIPE_THRESHOLD = 60;
// Abaixo disso o dedo praticamente não se moveu — conta como toque parado, não
// arrasto. Cobre a micro-oscilação normal de um toque em tela de vidro.
const TAP_THRESHOLD = 10;

// Navega para a página anterior/próxima de duas formas: arrastando na tela
// (mobile via toque, desktop via mouse) ou com um toque parado — lado direito
// avança, esquerdo volta, como um leitor de quadrinhos/stories. Usa Pointer
// Events, que cobre touch, mouse e pen num só listener (também funciona ao
// testar arrastando com o mouse no navegador). Ignora o gesto se começou
// dentro de um elemento com scroll horizontal próprio (páginas legado em
// canvas fixo), de uma imagem ampliável (o toque nela abre o zoom, não navega)
// ou de qualquer elemento interativo (link, botão, campo — o toque neles já
// faz outra coisa, não deve também trocar de página).
export default function useSwipeNavigation(prevPath, nextPath) {
  const navigate = useNavigate();
  const start = useRef(null);

  function isInsideHorizontalScroller(target) {
    let el = target;
    while (el && el !== document.body) {
      if (el.scrollWidth > el.clientWidth + 1) return true;
      el = el.parentElement;
    }
    return false;
  }

  // Imagens ampliáveis (IllustrationFrame) marcam seu botão com
  // data-zoomable — o gesto de arrastar-pra-navegar não deve competir pelo
  // mesmo toque que abre o zoom.
  function isInsideZoomable(target) {
    return Boolean(target.closest?.('[data-zoomable]'));
  }

  function isInteractive(target) {
    return Boolean(target.closest?.('a, button, input, textarea, select, [role="button"]'));
  }

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    start.current = {
      x: e.clientX,
      y: e.clientY,
      isTouch: e.pointerType !== 'mouse',
      blocked: isInsideHorizontalScroller(e.target) || isInsideZoomable(e.target) || isInteractive(e.target),
    };
  }

  function onPointerUp(e) {
    if (!start.current || start.current.blocked) {
      start.current = null;
      return;
    }
    const deltaX = e.clientX - start.current.x;
    const deltaY = e.clientY - start.current.y;
    const { x: startX, isTouch } = start.current;
    start.current = null;

    // Toque parado (só em touch/pen — no mouse um clique simples não deve
    // navegar, senão selecionar texto no desktop ficaria impossível): decide
    // pelo lado da tela onde o toque começou.
    if (isTouch && Math.abs(deltaX) < TAP_THRESHOLD && Math.abs(deltaY) < TAP_THRESHOLD) {
      const isRightHalf = startX > window.innerWidth / 2;
      if (isRightHalf && nextPath) navigate(nextPath);
      else if (!isRightHalf && prevPath) navigate(prevPath);
      return;
    }

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0 && nextPath) navigate(nextPath);
    else if (deltaX > 0 && prevPath) navigate(prevPath);
  }

  function onPointerCancel() {
    start.current = null;
  }

  return { onPointerDown, onPointerUp, onPointerCancel };
}
