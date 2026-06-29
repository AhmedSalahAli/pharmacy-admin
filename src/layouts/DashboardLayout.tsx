import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAppStore } from '../store/useAppStore';

import './DashboardLayout.css';

function DashboardLayout() {
  const sidebarCollapsed = useAppStore(
    (state) => state.sidebarCollapsed,
  );

  return (
    <div
      className={
        sidebarCollapsed
          ? 'dashboard-layout sidebar-collapsed'
          : 'dashboard-layout'
      }
    >
      <Sidebar />

      <div className="dashboard-main">
        <Header />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;