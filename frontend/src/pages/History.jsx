import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import useTrips from '../hooks/useTrips.jsx'

const History = () => {
  const { token } = useAuth()
  const { trips, loading, error, reload } = useTrips(token)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const pastTrips = trips.filter((trip) => {
    const endDate = parseTripDate(trip.endDate)
    return endDate && endDate < today
  })

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.24em] text-blue-600">History</p>
          <h1 className="mt-2 text-3xl font-semibold">Past trips</h1>
          <p className="mt-2 text-sm text-slate-500">Trips are considered past when their end date has passed.</p>
        </section>

        {loading ? (
          <StateMessage>Loading your trip history...</StateMessage>
        ) : error ? (
          <StateMessage error={error}>
            <button type="button" onClick={reload} className="mt-4 rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Try again
            </button>
          </StateMessage>
        ) : pastTrips.length === 0 ? (
          <StateMessage>{trips.length === 0 ? "You don't have any trips yet." : 'No past trips found.'}</StateMessage>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {pastTrips.map((trip) => (
              <article key={trip._id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">{formatTripDate(trip.startingDate)} - {formatTripDate(trip.endDate)}</p>
                <h2 className="mt-2 text-xl font-semibold">{trip.destination}</h2>
                <p className="mt-2 text-sm text-slate-600">{formatLabel(trip.travelStyle)} · {formatLabel(trip.budget)} budget</p>
                <Link to={`/trip/${trip._id}`} className="mt-5 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View Details
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

const StateMessage = ({ children, error }) => (
  <div className={`rounded-3xl border bg-white p-8 text-center shadow-sm ${error ? 'border-rose-200 text-rose-700' : 'border-slate-200 text-slate-500'}`}>
    {error ? <><p>{error}</p>{children}</> : children}
  </div>
)

const parseTripDate = (value) => {
  if (!value) return null
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

const formatTripDate = (value) => parseTripDate(value)?.toLocaleDateString() || 'Date unavailable'

const formatLabel = (value) => value ? String(value).replace(/\b\w/g, (character) => character.toUpperCase()) : '—'

export default History