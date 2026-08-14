import React from 'react'

const overviewStats = [
  { label: 'Destination', key: 'destination', icon: '🗺️' },
  { label: 'Duration', key: 'duration', icon: '📅' },
  { label: 'Travelers', key: 'travelers', icon: '👤' },
  { label: 'Budget', key: 'budget', icon: '💰' },
  { label: 'Travel Style', key: 'travelStyle', icon: '⛰️' },
]

const TripOverview = ({ trip }) => {
  const duration = getTripDuration(trip)

  const values = {
    destination: `${trip.destination}, ${trip.country}`,
    duration: duration === '--' ? 'Custom' : `${duration} Days`,
    travelers: trip.travelers || 'N/A',
    budget: trip.budget ? `₹${trip.budget.toLocaleString()}` : 'N/A',
    travelStyle: trip.travelStyle || 'Adventure',
  }

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Trip Overview</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Overview of your journey</h2>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          <span>📍</span>
          {trip.destination}, {trip.country}
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-5">
        {overviewStats.map((stat) => (
          <div key={stat.key} className="rounded-[24px] bg-white p-4 text-slate-700 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
              <span>{stat.icon}</span>
              <span>{stat.label}</span>
            </div>
            <p className="mt-4 text-lg font-semibold text-slate-900">{values[stat.key]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const parseDate = (dateString) => {
  if (!dateString) return null
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const getTripDuration = (trip) => {
  if (trip.startDate && trip.endDate) {
    const start = parseDate(trip.startDate)
    const end = parseDate(trip.endDate)
    if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '--'
    const diff = Math.round((end - start) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 1
  }

  if (trip.dates) {
    const parts = trip.dates.split('/').map((part) => part.trim())
    if (parts.length === 2) {
      const start = parseDate(parts[0])
      const end = parseDate(parts[1])
      if (start && end && !Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime())) {
        const diff = Math.round((end - start) / (1000 * 60 * 60 * 24))
        return diff > 0 ? diff : 1
      }
    }
  }

  return '--'
}

export default TripOverview
