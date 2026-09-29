import React from 'react'
import { Link } from 'react-router-dom'

const Wishlist = () => (
  <main className="min-w-0 py-2 text-slate-900">
    <div className="mx-auto max-w-5xl">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Wishlist</p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Saved trips</h1>
        <div className="mt-7 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center sm:px-8">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-rose-50 text-2xl text-rose-600" aria-hidden="true">♡</span>
          <p className="mt-4 font-semibold text-slate-900">No saved trips yet</p>
          <p className="mt-2 text-sm text-slate-500">Wishlist support is not connected yet.</p>
          <Link to="/trips" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            Explore my trips
          </Link>
          <Link to="/create-trip" className="ml-2 mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
            Plan a trip
          </Link>
        </div>
      </section>
    </div>
  </main>
)

export default Wishlist