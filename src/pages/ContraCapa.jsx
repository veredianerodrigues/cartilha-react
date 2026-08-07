import Page01 from './Page01.jsx';
import ScaledCanvas from '../components/ScaledCanvas.jsx';
import FrontMatterTrail from '../components/FrontMatterTrail.jsx';
import useSwipeNavigation from '../hooks/useSwipeNavigation.js';

export default function ContraCapa() {
  const swipeHandlers = useSwipeNavigation('/', '/ficha-catalografica');

  return (
    <div
      className="flex flex-col items-center gap-6 py-8 px-4"
      onPointerDown={swipeHandlers.onPointerDown}
      onPointerUp={swipeHandlers.onPointerUp}
      onPointerCancel={swipeHandlers.onPointerCancel}
    >
      <ScaledCanvas className="shadow-2xl">
        <Page01 />
      </ScaledCanvas>
      <FrontMatterTrail current="/contracapa" />
    </div>
  );
}
