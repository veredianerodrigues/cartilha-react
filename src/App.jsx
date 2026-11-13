import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { SectionsProvider } from './context/SectionsContext.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import CoverPage from './pages/CoverPage.jsx';
import ContraCapa from './pages/ContraCapa.jsx';
import FichaCatalografica from './pages/FichaCatalografica.jsx';
import TocPage from './pages/TocPage.jsx';
import SectionPage from './pages/SectionPage.jsx';

// O Studio é pesado: só é baixado quando alguém abre /studio.
const StudioPage = lazy(() => import('./pages/StudioPage.jsx'));

function PublicRoutes() {
  return (
    <SectionsProvider>
      <Outlet />
    </SectionsProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/studio/*"
        element={
          <Suspense fallback={null}>
            <StudioPage />
          </Suspense>
        }
      />
      <Route element={<PublicRoutes />}>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<CoverPage />} />
          <Route path="/contracapa" element={<ContraCapa />} />
          <Route path="/ficha-catalografica" element={<FichaCatalografica />} />
          <Route path="/sumario" element={<TocPage />} />
          <Route path="/secao/:slug" element={<SectionPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
