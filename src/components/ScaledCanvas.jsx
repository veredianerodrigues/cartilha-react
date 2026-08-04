import { useLayoutEffect, useRef, useState } from 'react';

const CANVAS_WIDTH = 595;
const CANVAS_HEIGHT = 842;

// Envolve um componente de canvas fixo (595x842, herdado do Figma) e o escala para
// caber na largura disponível, evitando corte/scroll horizontal em telas menores.
export default function ScaledCanvas({ children, className = '' }) {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    function measure() {
      const width = el.getBoundingClientRect().width;
      if (width > 0) setScale(Math.min(1, width / CANVAS_WIDTH));
    }

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div ref={wrapperRef} className={`w-full max-w-[595px] ${className}`}>
      <div style={{ width: CANVAS_WIDTH * scale, height: CANVAS_HEIGHT * scale }} className="mx-auto">
        <div style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
