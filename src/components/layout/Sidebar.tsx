import { NavLink } from 'react-router-dom'

const items = [
  { label: 'Dashboard', path: '/', icon: '◌' },
  { label: 'Revision History', path: '/history', icon: '↺' },
]

export default function Sidebar() {
  return (
    <aside className="app-sidebar">
      <div className="workspace-label">
        <span className="workspace-title">Workspace</span>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''}`
            }
          >
            <span className="sidebar-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <section className="system-card">
        <div className="system-title">System Health</div>
        <div className="system-status">
          <span className="system-dot"></span>
          <span className="system-copy">All services online</span>
        </div>
      </section>
    </aside>
  )
}
