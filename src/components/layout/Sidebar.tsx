import { NavLink } from 'react-router-dom'

const items = [
  { label: 'Dashboard', path: '/', icon: '◌' },
  { label: 'Revision History', path: '/history', icon: '↺' },
]

export default function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-r border-slate-200 bg-slate-50 lg:w-80">
      <div className="flex h-full flex-col px-5 py-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
            Workspace
          </span>
        </div>

        <nav className="space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-white hover:text-slate-900'
                }`
              }
            >
              <span className="text-base" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <section className="mt-auto rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
            System Health
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-sm font-semibold text-slate-600">
              All services online
            </span>
          </div>
        </section>
      </div>
    </aside>
  )
}
