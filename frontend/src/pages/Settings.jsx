import React from 'react'

const Settings = () => (
  <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold">Account settings</h1>
        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="font-semibold">Preferences</h2>
          <p className="mt-2 text-sm text-slate-600">Settings are not connected yet. No preferences are currently saved or changed here.</p>
        </div>
      </section>
    </div>
  </main>
)

export default Settings