import React from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

const Profile = () => {
  const { user } = useAuth()

  return (
    <main className="min-w-0 py-2 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Profile</p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Your account</h1>
          <div className="mt-7 flex min-w-0 flex-col items-start gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-blue-100 text-xl font-semibold text-blue-800" aria-hidden="true">
              {user?.name?.trim()?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="min-w-0">
              <p className="break-words text-xl font-semibold text-slate-900">{user?.name || 'Name not available'}</p>
              <p className="break-all text-sm text-slate-500">{user?.email || 'Email not available'}</p>
            </div>
          </div>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <dt className="text-sm font-medium text-slate-500">Name</dt>
              <dd className="mt-2 break-words text-base font-semibold sm:text-lg">{user?.name || 'Not available'}</dd>
            </div>
            <div className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <dt className="text-sm font-medium text-slate-500">Email</dt>
              <dd className="mt-2 break-all text-base font-semibold sm:text-lg">{user?.email || 'Not available'}</dd>
            </div>
          </dl>
          <p className="mt-6 text-sm text-slate-500">Profile editing is unavailable because no profile update API is connected.</p>
        </section>
      </div>
    </main>
  )
}

export default Profile