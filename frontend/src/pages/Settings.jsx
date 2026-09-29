import React from 'react'

const Settings = () => (
  <main className="min-w-0 py-2 text-slate-900">
    <div className="mx-auto max-w-5xl">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Settings</p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Account settings</h1>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <section className="rounded-xl border border-slate-200 p-4 sm:p-5">
            <h2 className="font-semibold text-slate-900">Account</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Account details are managed from your profile. Editing and password controls are not connected yet.</p>
          </section>
          <section className="rounded-xl border border-slate-200 p-4 sm:p-5">
            <h2 className="font-semibold text-slate-900">Preferences</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">No preferences are currently saved or changed here because settings are not connected yet.</p>
          </section>
        </div>
      </section>
    </div>
  </main>
)

export default Settings