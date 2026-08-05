import Page02 from './Page02.jsx';
import ScaledCanvas from '../components/ScaledCanvas.jsx';
import FrontMatterTrail from '../components/FrontMatterTrail.jsx';

export default function FichaCatalografica() {
  return (
    <div className="flex flex-col items-center gap-6 py-8 px-4">
      <ScaledCanvas className="shadow-2xl">
        <Page02 />
      </ScaledCanvas>
      <FrontMatterTrail current="/ficha-catalografica" />
    </div>
  );
}
