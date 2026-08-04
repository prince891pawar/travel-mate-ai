import React, { useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

const initialTrips = [
  {
    id: 1,
    destination: 'Paris',
    country: 'France',
    dates: 'Apr 10 - Apr 16',
    budget: 1820,
    status: 'Planned',
  },
  {
    id: 2,
    destination: 'Tokyo',
    country: 'Japan',
    dates: 'Jun 3 - Jun 12',
    budget: 2450,
    status: 'Booked',
  },
  {
    id: 3,
    destination: 'Bali',
    country: 'Indonesia',
    dates: 'Sep 8 - Sep 15',
    budget: 1675,
    status: 'Saved',
  },
]

const Trips = () => {
  const { user } = useAuth()
  const [search, setSearch] = useState('')

  const trips = useMemo(
    () =>
      initialTrips.filter((trip) =>
        [trip.destination, trip.country]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  )

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Trips</p>
            <h1 className="mt-2 text-3xl font-semibold">My Trips</h1>
            <p className="mt-2 text-sm text-slate-500">Welcome back, {user?.name || 'traveler'}.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search trips"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-72"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {trips.map((trip) => (
            <div key={trip.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{trip.status}</p>
                  <h2 className="mt-3 text-xl font-semibold text-slate-900">{trip.destination}</h2>
                </div>
                <div className="rounded-2xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700">{trip.country}</div>
              </div>
              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <p>
                  <span className="font-medium text-slate-900">Dates:</span> {trip.dates}
                </p>
                <p>
                  <span className="font-medium text-slate-900">Budget:</span> ${trip.budget.toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {trips.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
              No trips match your search. Try another destination or remove the search filter.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Trips
