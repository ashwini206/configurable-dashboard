import { NavLink, Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="operations-app">
      <aside className="operations-sidebar">
        <div className="operations-manager">
          <span className="operations-logo">OM</span>
          <span className="operations-manager-name">Operations Manager</span>
        </div>

        <nav className="operations-nav">
          <NavLink className="operations-nav-link" to="/">
            <span className="operations-nav-icon">▦</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink className="operations-nav-link" to="/history">
            <span className="operations-nav-icon">↺</span>
            <span>Revision History</span>
          </NavLink>
        </nav>

        <section className="operations-health">
          <div className="operations-health-title">System Health</div>
          <div className="operations-health-status">
            <span className="operations-health-dot"></span>
            <span className="operations-health-copy">All services online</span>
          </div>
        </section>
      </aside>

      <main className="operations-main">
        <section className="operations-admin-header">
          <span className="operations-admin-title">Admin Dashboard</span>

          <div className="operations-admin-view">
            <span className="operations-view-label">Viewing as</span>
            <select className="operations-view-select" defaultValue="Admin">
              <option>Admin</option>
              <option>Executive</option>
              <option>Analyst</option>
            </select>
            <span className="operations-admin-session">Admin<br />Simulated session</span>
          </div>
        </section>

        <section className="operations-content">
          <Outlet />
        </section>
      </main>
    </div>
  )
}
