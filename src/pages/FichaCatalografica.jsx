import Page02 from './Page02.jsx';
import ScaledCanvas from '../components/ScaledCanvas.jsx';
import PrevNextNav from '../components/PrevNextNav.jsx';
import useSwipeNavigation from '../hooks/useSwipeNavigation.js';

export default function FichaCatalografica() {
  const swipeHandlers = useSwipeNavigation('/contracapa', '/sumario');

  return (
    <div
      className="flex flex-col items-center gap-6 py-8 px-4"
      onPointerDown={swipeHandlers.onPointerDown}
      onPointerUp={swipeHandlers.onPointerUp}
      onPointerCancel={swipeHandlers.onPointerCancel}
    >
      <ScaledCanvas className="shadow-2xl">
        <Page02 />
      </ScaledCanvas>
      <PrevNextNav
        prev={{ to: '/contracapa', title: 'Contracapa' }}
        next={{ to: '/sumario', title: 'Sumário' }}
      />
    </div>
  );
}
