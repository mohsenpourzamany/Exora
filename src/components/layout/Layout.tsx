import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} />
      <Navbar collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} />

      <main
        className={`
          pt-16 min-h-screen transition-all duration-300
          ${collapsed ? 'mr-[72px]' : 'mr-64'}
        `}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
