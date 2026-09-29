import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-5 py-12 text-center text-slate-900">
      <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">404</p>
      <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">The page you requested doesn&apos;t exist or may have moved.</p>
      <Link to="/" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
        Back to home
      </Link>
    </main>
  )
}

export default NotFound
