import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const SWIPE_THRESHOLD = 60;

// Navega para a seção anterior/próxima ao arrastar o dedo na tela (mobile).
// Ignora o gesto se o toque começou dentro de um elemento com scroll horizontal
// próprio (páginas legado em canvas fixo), para não conflitar com o pan do usuário.
export default function useSwipeNavigation(prevSlug, nextSlug) {
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

  function onTouchStart(e) {
    const touch = e.touches[0];
    start.current = {
      x: touch.clientX,
      y: touch.clientY,
      blocked: isInsideHorizontalScroller(e.target),
    };
  }

  function onTouchEnd(e) {
    if (!start.current || start.current.blocked) {
      start.current = null;
      return;
    }
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - start.current.x;
    const deltaY = touch.clientY - start.current.y;
    start.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0 && nextSlug) navigate(`/secao/${nextSlug}`);
    else if (deltaX > 0 && prevSlug) navigate(`/secao/${prevSlug}`);
  }

  return { onTouchStart, onTouchEnd };
}
