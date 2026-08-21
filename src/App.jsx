import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './context/AuthContext.jsx';
import { SectionsProvider } from './context/SectionsContext.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import CoverPage from './pages/CoverPage.jsx';
import ContraCapa from './pages/ContraCapa.jsx';
import FichaCatalografica from './pages/FichaCatalografica.jsx';
import TocPage from './pages/TocPage.jsx';
import SectionPage from './pages/SectionPage.jsx';

// Import dinâmico: o /admin carrega o editor rich text (TipTap), que é pesado
// e não deve engordar o bundle que todo visitante público da cartilha baixa.
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminSectionsList = lazy(() => import('./pages/admin/AdminSectionsList.jsx'));
const AdminSectionEditor = lazy(() => import('./pages/admin/AdminSectionEditor.jsx'));

export default function App() {
  return (
    <AuthProvider>
      <SectionsProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<CoverPage />} />
            <Route path="/contracapa" element={<ContraCapa />} />
            <Route path="/ficha-catalografica" element={<FichaCatalografica />} />
            <Route path="/sumario" element={<TocPage />} />
            <Route path="/secao/:slug" element={<SectionPage />} />
            <Route path="/secao/:slug/:page" element={<SectionPage />} />
          </Route>

          <Route
            path="/admin/login"
            element={
              <Suspense fallback={null}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Suspense fallback={null}>
                  <AdminSectionsList />
                </Suspense>
              </RequireAuth>
            }
          />
          <Route
            path="/admin/secoes/:id"
            element={
              <RequireAuth>
                <Suspense fallback={null}>
                  <AdminSectionEditor />
                </Suspense>
              </RequireAuth>
            }
          />
        </Routes>
      </SectionsProvider>
    </AuthProvider>
  );
}
