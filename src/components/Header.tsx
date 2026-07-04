import { useAppStore } from '../store/useAppStore';

function Header() {
  const appName = useAppStore((state) => state.appName);
  const userName = useAppStore((state) => state.userName);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button
          type="button"
          className="sidebar-toggle-button"
          onClick={toggleSidebar}
        >
          ☰
        </button>

        <strong>{appName}</strong>
      </div>

      <div className="dashboard-user">
        {userName}
      </div>
    </header>
  );
}

export default Header;