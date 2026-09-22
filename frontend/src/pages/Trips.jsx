import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useNavigate } from 'react-router-dom'

const Trips = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch user's trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/login')
          return
        }

        const response = await fetch(
          'http://localhost:3000/api/trips',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          throw new Error(
            data.message || 'Failed to fetch trips'
          )
        }

        console.log('My trips:', data)

        setTrips(data.trips || [])
      } catch (error) {
        console.error('Fetch Trips Error:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [navigate])

  // Search trips
  const filteredTrips = useMemo(() => {
    return trips.filter((trip) =>
      [
        trip.destination,
        trip.startingFrom,
        trip.travelStyle,
        trip.travelers,
        trip.hotelPreference,
      ]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [trips, search])

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg text-slate-600">
          Loading your trips...
        </p>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <p className="text-red-600">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-blue-600">
              Trips
            </p>

            <h1 className="mt-2 text-3xl font-semibold">
              My Trips
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Welcome back, {user?.name || 'traveler'}.
            </p>
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

        {/* Trips */}
        <div className="grid gap-6 lg:grid-cols-3">

          {filteredTrips.map((trip) => (
            <div
              key={trip._id}
              onClick={() => navigate(`/trip/${trip._id}`)}
              className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {trip.travelStyle}
                  </p>

                  <h2 className="mt-3 text-xl font-semibold text-slate-900">
                    {trip.destination}
                  </h2>
                </div>

                <div className="rounded-2xl bg-blue-50 px-3 py-2 text-sm font-semibold capitalize text-blue-700">
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
                  {new Date(trip.startDate).toLocaleDateString()} -{' '}
                  {new Date(trip.endDate).toLocaleDateString()}
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

              </div>

              {/* View Details */}
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-sm font-medium text-blue-600">
                  View trip details →
                </p>
              </div>
            </div>
          ))}

          {/* No Trips */}
          {filteredTrips.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500 shadow-sm">
              {trips.length === 0
                ? 'You have no trips yet. Create your first trip!'
                : 'No trips match your search. Try another destination or remove the search filter.'}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Trips