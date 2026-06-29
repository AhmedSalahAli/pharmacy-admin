import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

import './DashboardLayout.css';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
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