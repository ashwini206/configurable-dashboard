import { Outlet } from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="app-shell">
      <Header />

      <div className="app-workspace">
        <Sidebar />

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
