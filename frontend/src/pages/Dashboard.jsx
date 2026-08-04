import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

const sampleTrips = [
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
    destination: 'Goa',
    country: 'India',
    dates: 'Dec 22 - Dec 28',
    budget: 980,
    status: 'Completed',
  },
]

const sidebarItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'My Trips', to: '/trips' },
  { label: 'Create Trip', to: '/trips' },
  { label: 'Wishlist', to: '/trips' },
  { label: 'History', to: '/trips' },
  { label: 'Profile', to: '/dashboard' },
  { label: 'Settings', to: '/dashboard' },
]

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [search, setSearch] = useState('')

  const filteredTrips = useMemo(
    () =>
      sampleTrips.filter((trip) =>
        [trip.destination, trip.country, trip.status]
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  )

  const stats = useMemo(() => {
    const totalBudget = sampleTrips.reduce((sum, trip) => sum + trip.budget, 0)
    const countriesVisited = new Set(sampleTrips.map((trip) => trip.country)).size

    return {
      totalTrips: sampleTrips.length,
      countriesVisited,
      totalBudget,
      favoritePlace: 'Goa',
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto grid max-w-360 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-12 w-12 rounded-3xl bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
              ✈️
            </div>
            <div>
              <p className="text-sm text-slate-500">Travel Mate AI</p>
              <h2 className="text-xl font-semibold text-slate-900">Control Panel</h2>
            </div>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="block rounded-3xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Need help?</p>
            <p className="mt-3 text-sm text-slate-700">Explore AI-powered trip suggestions and travel insights in one place.</p>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-blue-600">Welcome back,</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">{user?.name || 'Prince'}</h1>
                <p className="mt-2 text-sm text-slate-500">Ready for your next adventure? Let AI build the perfect trip for you.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => logout?.()}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Logout
                </button>
                <Link
                  to="/trips"
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
                >
                  Create New Trip
                </Link>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Total Trips</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{stats.totalTrips}</p>
              <p className="mt-2 text-sm text-slate-500">All your trips</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Countries Visited</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{stats.countriesVisited}</p>
              <p className="mt-2 text-sm text-slate-500">Amazing places</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Total Budget</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">${stats.totalBudget.toLocaleString()}</p>
              <p className="mt-2 text-sm text-slate-500">Across all trips</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Favourite Place</p>
              <p className="mt-4 text-4xl font-semibold text-slate-900">{stats.favoritePlace}</p>
              <p className="mt-2 text-sm text-slate-500">Your top pick</p>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Recent Trips</p>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-900">Planning your next escape</h2>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search trips"
                    className="w-full min-w-45 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 sm:w-auto"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {filteredTrips.length > 0 ? (
                  filteredTrips.map((trip) => (
                    <article key={trip.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{trip.destination}, {trip.country}</p>
                          <p className="mt-1 text-sm text-slate-500">{trip.dates}</p>
                        </div>
                        <span className="rounded-2xl bg-blue-600 px-3 py-1 text-xs font-semibold text-white">{trip.status}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
                        <p>Budget: ${trip.budget.toLocaleString()}</p>
                        <p className="font-medium text-slate-900">{trip.status === 'Booked' ? 'Ready' : 'Next step'}</p>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
                    No trips match your search. Try a different keyword.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Travel Insights</p>
                <ul className="mt-6 space-y-4 text-sm text-slate-600">
                  <li className="rounded-3xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">AI suggests booking sooner for Paris</p>
                    <p className="mt-2 text-slate-500">Airfare and hotel prices are expected to rise next week.</p>
                  </li>
                  <li className="rounded-3xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">Popular destination: Bali</p>
                    <p className="mt-2 text-slate-500">Beach packages are trending for December travel.</p>
                  </li>
                </ul>
              </div>

              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Upcoming action</p>
                <div className="mt-5 space-y-3">
                  <div className="rounded-3xl bg-blue-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Review your next itinerary</p>
                    <p className="mt-1">Check hotel and flight details before booking.</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                    <p className="font-semibold text-slate-900">Save your favorite places</p>
                    <p className="mt-1">Add wishlist locations to follow price alerts.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Dashboard