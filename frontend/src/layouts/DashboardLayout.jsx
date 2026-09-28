import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'My Trips', to: '/trips' },
  { label: 'Create Trip', to: '/create-trip' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'History', to: '/history' },
  { label: 'Profile', to: '/profile' },
  { label: 'Settings', to: '/settings' },
]

const DashboardLayout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto grid max-w-360 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-600 text-xl font-semibold text-white">
              ✈️
            </div>
            <div>
              <p className="text-sm text-slate-500">Travel Mate AI</p>
              <h2 className="text-xl font-semibold text-slate-900">Control Panel</h2>
            </div>
          </div>

          <nav className="space-y-2" aria-label="Dashboard navigation">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Need help?</p>
            <p className="mt-3 text-sm text-slate-700">Explore AI-powered trip suggestions and travel insights in one place.</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-5 w-full rounded-3xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Logout
          </button>
        </aside>

        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout