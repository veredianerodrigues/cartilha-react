import { Outlet } from 'react-router-dom';
import Sumario from './Sumario.jsx';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f5f5ef] font-worksans">
      <Sumario />
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
