import { Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth } from './context/AuthContext.jsx';
import { SectionsProvider } from './context/SectionsContext.jsx';
import PublicLayout from './components/PublicLayout.jsx';
import CoverPage from './pages/CoverPage.jsx';
import SectionPage from './pages/SectionPage.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminSectionsList from './pages/admin/AdminSectionsList.jsx';
import AdminSectionEditor from './pages/admin/AdminSectionEditor.jsx';

export default function App() {
  return (
    <AuthProvider>
      <SectionsProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<CoverPage />} />
            <Route path="/secao/:slug" element={<SectionPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <AdminSectionsList />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/secoes/:id"
            element={
              <RequireAuth>
                <AdminSectionEditor />
              </RequireAuth>
            }
          />
        </Routes>
      </SectionsProvider>
    </AuthProvider>
  );
}
