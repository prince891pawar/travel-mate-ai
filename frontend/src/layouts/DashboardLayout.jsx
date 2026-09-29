import React, { useEffect, useState } from 'react'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!mobileMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  const handleLogout = () => {
    setMobileMenuOpen(false)
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <div className="mx-auto grid min-h-screen max-w-screen-2xl gap-5 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-7 lg:px-8">
        <aside
          id="dashboard-navigation"
          aria-label="Travel Mate navigation"
          className={`invisible fixed inset-y-0 left-0 z-50 w-[min(86vw,20rem)] -translate-x-full overflow-y-auto border-r border-slate-200 bg-white p-5 shadow-xl transition duration-200 sm:p-6 lg:visible lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-auto lg:translate-x-0 lg:rounded-2xl lg:border lg:p-5 lg:shadow-sm ${mobileMenuOpen ? 'visible translate-x-0' : ''}`}
        >
          <div className="mb-8 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-xl font-semibold text-white" aria-hidden="true">
                ✈️
              </div>
              <div className="min-w-0">
                <p className="text-sm text-slate-500">Travel Mate AI</p>
                <h2 className="truncate text-lg font-semibold text-slate-900">Control Panel</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 lg:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1.5" aria-label="Dashboard navigation">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/dashboard'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-11 items-center rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    isActive
                      ? 'bg-blue-50 text-blue-800'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Need help?</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">Explore AI-powered trip suggestions and travel insights in one place.</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 min-h-11 w-full rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Logout
          </button>
        </aside>

        <div className="min-w-0">
          <header className="mb-5 flex min-h-12 items-center justify-between lg:hidden">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-lg text-white" aria-hidden="true">✈️</span>
              <span className="font-semibold text-slate-900">Travel Mate</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="dashboard-navigation"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </header>
          <div className="min-w-0"><Outlet /></div>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout