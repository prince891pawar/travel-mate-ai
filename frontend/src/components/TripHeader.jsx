import React from 'react'

const TripHeader = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-blue-50/60 p-5 sm:p-7 lg:p-8">
      <div className="space-y-4">
        <div className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Create Your Dream Trip <span aria-hidden="true">✈️</span>
        </div>
        <p className="max-w-2xl text-base leading-7 text-slate-600">
          Tell us your travel preferences and let AI plan the perfect itinerary.
        </p>
      </div>
    </div>
  )
}

export default TripHeader
