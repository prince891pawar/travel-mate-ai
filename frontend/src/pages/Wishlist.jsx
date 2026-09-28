import React from 'react'
import { Link } from 'react-router-dom'

const Wishlist = () => (
  <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Wishlist</p>
        <h1 className="mt-2 text-3xl font-semibold">Saved trips</h1>
        <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="font-medium text-slate-800">No saved trips yet.</p>
          <p className="mt-2 text-sm text-slate-500">Wishlist support is not connected yet.</p>
          <Link to="/create-trip" className="mt-5 inline-flex rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
            Plan a trip
          </Link>
        </div>
      </section>
    </div>
  </main>
)

export default Wishlist