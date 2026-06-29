import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-logo">
        Pharmacy
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? 'sidebar-link active' : 'sidebar-link'
          }
        >
          Products
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;