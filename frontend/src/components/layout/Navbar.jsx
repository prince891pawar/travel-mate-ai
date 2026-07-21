// ...existing code...
import React from 'react'

const Navbar = () => {
  const links = ['Home', 'About', 'Services', 'Price', 'Contact']

  return (
    <div>
      {/* thin top accent */}
      <div className="h-1 bg-rose-800" />

      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* logo / left */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold text-slate-900">
             Travel <span className="text-blue-600">Mate</span>
            </span>
          </div>

          {/* center nav (hidden on small screens) */}
          <nav className="hidden md:block">
            <ul className="flex gap-8 items-end text-gray-600">
              {links.map((label) => (
                <li key={label} className="relative">
                  {label === 'Home' ? (
                    <div className="flex flex-col items-center">
                      <a href={`/${label === 'Home' ? '' : label.toLowerCase()}`} className="text-slate-900 font-medium">
                        {label}
                      </a>
                      <span className="mt-2 w-6 h-1 rounded-full bg-pink-500" />
                    </div>
                  ) : (
                    <a href={`/${label.toLowerCase()}`} className="hover:text-slate-900">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* right actions */}
          <div className="flex items-center gap-4">
            <a href="/login" className="text-gray-600 hover:text-slate-900">Login</a>
            <a
              href="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600 transition"
            >
              Register
            </a>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
// ...existing code...