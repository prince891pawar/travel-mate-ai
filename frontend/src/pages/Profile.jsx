import React from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

const Profile = () => {
  const { user } = useAuth()

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Profile</p>
          <h1 className="mt-2 text-3xl font-semibold">Your account</h1>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <dt className="text-sm font-medium text-slate-500">Name</dt>
              <dd className="mt-2 text-lg font-semibold">{user?.name || 'Not available'}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <dt className="text-sm font-medium text-slate-500">Email</dt>
              <dd className="mt-2 break-all text-lg font-semibold">{user?.email || 'Not available'}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-slate-500">Profile editing is unavailable because no profile update API is connected.</p>
        </section>
      </div>
    </main>
  )
}

export default Profile