import { Outlet } from 'react-router-dom'

import Header from './Header'
import Sidebar from './Sidebar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Header />

      <div className="flex min-h-[calc(100vh-5rem)] flex-col lg:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 bg-slate-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
