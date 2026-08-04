import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const Navbar = () => {
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'My Trips', to: '/trips' },
  ]

  return (
    <div>
      <div className="h-1 bg-blue-600" />

      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-2xl font-extrabold text-slate-900">
              Travel <span className="text-blue-600">Mate</span>
            </Link>
          </div>

          <nav className="hidden md:block">
            <ul className="flex gap-8 items-center text-gray-600">
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
            <Link
              to="/login"
              className="text-gray-600 hover:text-slate-900"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700 transition"
            >
              Register
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar