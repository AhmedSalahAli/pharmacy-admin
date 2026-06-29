import { useAppStore } from '../store/useAppStore';
function Header() {
  const { appName, userName } = useAppStore();
  return (
    <header className="dashboard-header">
      <div>
        <strong>{appName}</strong>
      </div>
      <div className="dashboard-user">
        {userName}
      </div>
    </header>
  );
}

export default Header;