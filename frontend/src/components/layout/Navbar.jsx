import React from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

const Navbar = () => {
  const { token, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'My Trips', to: '/trips' },
  ]

  return (
    <div>
      <div className="h-1 bg-blue-600" />

      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xl font-extrabold text-slate-900 sm:text-2xl">
              Travel <span className="text-blue-600">Mate</span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-600 lg:gap-8">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `font-medium transition ${isActive ? 'text-slate-900' : 'hover:text-slate-900'}`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            {token ? (
              <button type="button" onClick={handleLogout} className="inline-flex min-h-11 items-center text-sm font-medium text-gray-600 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex min-h-11 items-center text-sm font-medium text-gray-600 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar