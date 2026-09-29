import React, { useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { Link } from 'react-router-dom'
import useTrips from '../hooks/useTrips.jsx'

const Trips = () => {
  const { user, token } = useAuth()

  const [search, setSearch] = useState('')
  const { trips, loading, error, reload } = useTrips(token)

  // Search trips
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) =>
      [
        trip.destination,
        trip.startingFrom,
        trip.travelStyle,
        trip.travelers,
        trip.hotelPreference,
        trip.notes,
      ]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [trips, search])

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center px-4 py-12">
        <p className="text-lg text-slate-600">
          Loading your trips...
        </p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-64 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <p className="text-red-600">
            {error}
          </p>

          <button
            onClick={reload}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-0 py-2 text-slate-900">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-600">
              Trips
            </p>

            <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
              My Trips
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back, {user?.name || 'traveler'}.
            </p>
          </div>

          <div className="flex min-w-0 items-center gap-3">
            <input
              aria-label="Search trips"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trips"
              className="min-h-11 w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-base text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-72"
            />
          </div>
        </div>

        {/* Trips */}
        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {filteredTrips.map((trip) => (
              <Link
              key={trip._id}
              to={`/trip/${trip._id}`}
              className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:p-6"
            >
              {/* Card Header */}
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {trip.travelStyle}
                  </p>

                  <h2 className="mt-2 break-words text-xl font-semibold text-slate-900">
                    {trip.destination}
                  </h2>
                </div>

                <div className="max-w-28 shrink-0 break-words rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold capitalize text-blue-700">
                  {trip.travelers}
                </div>
              </div>

              {/* Trip Information */}
              <div className="mt-6 space-y-3 text-sm text-slate-600">

                <p>
                  <span className="font-medium text-slate-900">
                    From:
                  </span>{' '}
                  {trip.startingFrom}
                </p>

                <p>
                  <span className="font-medium text-slate-900">
                    Dates:
                  </span>{' '}
                  {formatTripDate(trip.startingDate)} - {formatTripDate(trip.endDate)}
                </p>

                <p>
                  <span className="font-medium text-slate-900">
                    Budget:
                  </span>{' '}
                  <span className="capitalize">
                    {trip.budget}
                  </span>
                </p>

                <p>
                  <span className="font-medium text-slate-900">
                    Hotel:
                  </span>{' '}
                  {trip.hotelPreference}
                </p>

                <p>
                  <span className="font-medium text-slate-900">AI plan:</span>{' '}
                  <span className="capitalize">{trip.aiStatus || 'pending'}</span>
                </p>

              </div>

              {/* View Details */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="inline-flex min-h-11 items-center text-sm font-semibold text-blue-700 group-hover:text-blue-800">
                  View Details <span className="ml-1" aria-hidden="true">→</span>
                </p>
              </div>
            </Link>
          ))}

          {/* No Trips */}
          {filteredTrips.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
              {trips.length === 0
                ? "You don't have any trips yet."
                : 'No trips match your search. Try another destination or remove the search filter.'}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

const formatTripDate = (value) => {
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString()
}

export default Trips