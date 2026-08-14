import React from 'react'

const TripHeader = () => {
  return (
    <div className="grid gap-6 rounded-[32px] bg-slate-50 p-8 shadow-sm sm:p-10 lg:grid-cols-[1.6fr_1.2fr]">
      <div className="space-y-4">
        <div className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Create Your Dream Trip <span aria-hidden="true">✈️</span>
        </div>
        <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
          Tell us your travel preferences and let AI plan the perfect itinerary.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[28px] bg-white p-6 shadow-md">
        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-blue-100 opacity-80" />
        <div className="absolute -left-8 top-16 h-20 w-20 rounded-full bg-slate-100 opacity-80" />
        <div className="relative flex flex-col gap-4">
          <div className="h-40 rounded-[28px] bg-blue-600 p-5 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-blue-200">Travel kit</div>
                <div className="mt-3 text-xl font-semibold">Your next escape</div>
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-3xl bg-white/15">
                <span className="text-2xl">🧳</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-blue-100">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">📍</span>
              <span>Beach view, city tours, local cuisine</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm">
              <div className="font-semibold text-slate-900">Destination</div>
              <div className="mt-2 text-slate-500">Lisbon</div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 shadow-sm">
              <div className="font-semibold text-slate-900">Trip style</div>
              <div className="mt-2 text-slate-500">Adventure</div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Ready for takeoff</div>
            <p className="mt-2 text-slate-500">Design your travel preferences and generate your AI itinerary in seconds.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TripHeader
