import { Routes, Route } from 'react-router-dom';
import { SectionsProvider } from './context/SectionsContext.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import CoverPage from './pages/CoverPage.jsx';
import ContraCapa from './pages/ContraCapa.jsx';
import FichaCatalografica from './pages/FichaCatalografica.jsx';
import TocPage from './pages/TocPage.jsx';
import SectionPage from './pages/SectionPage.jsx';

export default function App() {
  return (
    <SectionsProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<CoverPage />} />
          <Route path="/contracapa" element={<ContraCapa />} />
          <Route path="/ficha-catalografica" element={<FichaCatalografica />} />
          <Route path="/sumario" element={<TocPage />} />
          <Route path="/secao/:slug" element={<SectionPage />} />
        </Route>
      </Routes>
    </SectionsProvider>
  );
}
