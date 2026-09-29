import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import useTrips from '../hooks/useTrips.jsx'

const Dashboard = () => {
  const { user, token } = useAuth()
  const [search, setSearch] = useState('')
  const { trips, loading, error, reload } = useTrips(token)

  const filteredTrips = useMemo(
    () =>
      trips.filter((trip) =>
        [trip.destination, trip.startingFrom, trip.budget, trip.travelers, trip.travelStyle, trip.hotelPreference, trip.notes, trip.aiStatus]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search, trips],
  )
  const recentTrips = filteredTrips.slice(0, 5)

  const stats = useMemo(() => {
    const destinations = new Set(
      trips.map((trip) => String(trip.destination || '').trim().toLowerCase()).filter(Boolean),
    ).size

    return {
      totalTrips: trips.length,
      destinations,
      commonBudget: getMostCommonValue(trips.map((trip) => trip.budget)),
      topDestination: getMostCommonValue(trips.map((trip) => trip.destination)),
      upcomingTrips: trips.filter((trip) => {
        const startDate = parseTripDate(trip.startingDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return startDate && startDate >= today
      }).length,
    }
  }, [trips])

  return (
    <main className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Welcome back,</p>
                <h1 className="mt-2 break-words text-2xl font-semibold text-slate-900 sm:text-3xl">{user?.name || '—'}</h1>
                <p className="mt-2 text-sm text-slate-500">Ready for your next adventure? Let AI build the perfect trip for you.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/create-trip"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 sm:w-auto"
                >
                  Create New Trip
                </Link>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="break-words text-[0.7rem] font-medium uppercase leading-4 tracking-wide text-slate-500 sm:text-sm sm:tracking-wider">Total Trips</p>
              <p className="mt-3 break-words text-3xl font-semibold text-slate-900 sm:text-4xl">{stats.totalTrips}</p>
              <p className="mt-2 text-sm text-slate-500">All your trips</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="break-words text-[0.7rem] font-medium uppercase leading-4 tracking-wide text-slate-500 sm:text-sm sm:tracking-wider">Destinations</p>
              <p className="mt-3 break-words text-3xl font-semibold text-slate-900 sm:text-4xl">{stats.destinations}</p>
              <p className="mt-2 text-sm text-slate-500">Across your trips</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="break-words text-[0.7rem] font-medium uppercase leading-4 tracking-wide text-slate-500 sm:text-sm sm:tracking-wider">Common Budget</p>
              <p className="mt-3 break-words text-2xl font-semibold text-slate-900 sm:text-3xl">{formatLabel(stats.commonBudget) || '—'}</p>
              <p className="mt-2 text-xs text-slate-500 sm:text-sm">Most selected preference</p>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <p className="break-words text-[0.7rem] font-medium uppercase leading-4 tracking-wide text-slate-500 sm:text-sm sm:tracking-wider">Upcoming Trips</p>
              <p className="mt-3 break-words text-3xl font-semibold text-slate-900 sm:text-4xl">{stats.upcomingTrips}</p>
              <p className="mt-2 text-xs text-slate-500 sm:text-sm">Based on your trip dates</p>
            </div>
          </section>

          <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(17rem,0.8fr)]">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Recent Trips</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Planning your next escape</h2>
                </div>
                <div className="flex min-w-0 items-center gap-3">
                  <input
                    aria-label="Search trips"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search trips"
                    className="min-h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-base text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-64"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {loading ? (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                    Loading your trips...
                  </div>
                ) : error ? (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                    {error}
                    <button type="button" onClick={reload} className="mt-4 block w-full font-semibold text-blue-600 hover:text-blue-700">
                      Try again
                    </button>
                  </div>
                ) : recentTrips.length > 0 ? (
                  recentTrips.map((trip) => (
                    <Link key={trip._id} to={`/trip/${trip._id}`} className="block min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="break-words text-sm font-semibold text-slate-900">{trip.destination}</p>
                          <p className="mt-1 text-sm text-slate-500">{formatTripDate(trip.startingDate)} - {formatTripDate(trip.endDate)}</p>
                        </div>
                        <span className="rounded-2xl bg-blue-600 px-3 py-1 text-xs font-semibold text-white">{formatLabel(trip.aiStatus || 'pending')}</span>
                      </div>
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-600">
                        <p>Budget: {formatLabel(trip.budget)}</p>
                        <p className="font-medium text-slate-900">{formatLabel(trip.travelStyle)}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                    {trips.length === 0
                      ? "You don't have any trips yet."
                      : 'No trips match your search. Try a different keyword.'}
                  </div>
                )}
              </div>
            </div>

            <div className="min-w-0 space-y-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Travel Insights</p>
                <ul className="mt-6 space-y-4 text-sm text-slate-600">
                  {trips.length > 0 ? (
                    <>
                      <li className="rounded-3xl bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">Most planned destination: {stats.topDestination}</p>
                        <p className="mt-2 text-slate-500">You have trips saved across {stats.destinations} destinations.</p>
                      </li>
                      <li className="rounded-3xl bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">Most common budget: {formatLabel(stats.commonBudget)}</p>
                        <p className="mt-2 text-slate-500">Based on your saved trip preferences.</p>
                      </li>
                    </>
                  ) : (
                    <li className="rounded-3xl bg-slate-50 p-4">
                      <p className="font-semibold text-slate-900">No trip insights yet</p>
                      <p className="mt-2 text-slate-500">Your saved trip details will appear here.</p>
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Upcoming action</p>
                <div className="mt-5 space-y-3">
                  <div className="rounded-xl bg-blue-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Plan your next itinerary</p>
                    <p className="mt-1">Start a new trip with your destination and travel preferences.</p>
                    <Link to="/create-trip" className="mt-3 inline-flex min-h-10 items-center font-semibold text-blue-700 hover:text-blue-800">Create a trip <span className="ml-1" aria-hidden="true">→</span></Link>
                  </div>  
                  <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Review your travel history</p>
                    <p className="mt-1">See trips whose end dates have passed.</p>
                    <Link to="/history" className="mt-3 inline-flex min-h-10 items-center font-semibold text-blue-700 hover:text-blue-800">View history <span className="ml-1" aria-hidden="true">→</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </main>
  )
}

const getMostCommonValue = (values) => {
  const counts = new Map()

  values.filter(Boolean).forEach((value) => {
    const label = String(value)
    const key = label.toLowerCase()
    const entry = counts.get(key) || { label, count: 0 }
    entry.count += 1
    counts.set(key, entry)
  })

  return [...counts.values()].sort((left, right) => right.count - left.count)[0]?.label || ''
}

const formatLabel = (value) => {
  if (!value) return ''
  return String(value).replace(/\b\w/g, (character) => character.toUpperCase())
}

const formatTripDate = (value) => {
  if (!value) return '—'
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number)
  if (!year || !month || !day) return '—'
  return new Date(year, month - 1, day).toLocaleDateString()
}

const parseTripDate = (value) => {
  if (!value) return null
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

export default Dashboard
