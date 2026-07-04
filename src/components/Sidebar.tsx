import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-full">Pharmacy</span>
        <span className="sidebar-logo-short">P</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <span className="sidebar-link-icon">🏠</span>
          <span className="sidebar-link-text">Dashboard</span>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          <span className="sidebar-link-icon">📦</span>
          <span className="sidebar-link-text">Products</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;