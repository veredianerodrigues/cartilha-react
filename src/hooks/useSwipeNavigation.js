import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SWIPE_THRESHOLD = 60;

// Navega para a página anterior/próxima ao arrastar na tela (mobile via toque,
// desktop via mouse) usando Pointer Events — cobre touch, mouse e pen num só
// listener, o que também funciona ao testar arrastando com o mouse no navegador.
// Ignora o gesto se o arrasto começou dentro de um elemento com scroll horizontal
// próprio (páginas legado em canvas fixo), para não conflitar com o pan do usuário.
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

  function onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    start.current = {
      x: e.clientX,
      y: e.clientY,
      blocked: isInsideHorizontalScroller(e.target),
    };
  }

  function onPointerUp(e) {
    if (!start.current || start.current.blocked) {
      start.current = null;
      return;
    }
    const deltaX = e.clientX - start.current.x;
    const deltaY = e.clientY - start.current.y;
    start.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0 && nextPath) navigate(nextPath);
    else if (deltaX > 0 && prevPath) navigate(prevPath);
  }

  function onPointerCancel() {
    start.current = null;
  }

  return { onPointerDown, onPointerUp, onPointerCancel };
}
