import Page01 from './Page01.jsx';
import ScaledCanvas from '../components/ScaledCanvas.jsx';
import FrontMatterTrail from '../components/FrontMatterTrail.jsx';

export default function ContraCapa() {
  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4">
      <ScaledCanvas className="shadow-2xl">
        <Page01 />
      </ScaledCanvas>
      <FrontMatterTrail current="/contracapa" />
    </div>
  );
}
