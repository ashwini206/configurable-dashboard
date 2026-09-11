export default function Header() {
  return (
    <header className="app-topbar">
      <div className="brand-cluster">
        <span className="brand-mark">CD</span>
        <div>
          <span className="brand-kicker">Configurable Dashboard</span>
          <span className="brand-name">Operations Overview</span>
        </div>
      </div>

      <div className="topbar-actions">
        <button className="topbar-chip">
          This Week
        </button>
        <button className="topbar-create">
          Create Report
        </button>
      </div>
    </header>
  )
}
