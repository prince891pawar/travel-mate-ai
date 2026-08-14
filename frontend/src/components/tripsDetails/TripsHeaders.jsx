import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackButton from '../BackButton'

const TripsHeaders = ({ trip }) => {
  const navigate = useNavigate()
  const [deleted, setDeleted] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const handleEdit = () => {
    navigate('/create-trip', { state: { trip } })
  }

  const handleShare = async () => {
    const shareText = `${trip.destination}, ${trip.country} — ${formatTripDates(trip)} for ${trip.travelers} travelers.`

    try {
      await navigator.clipboard.writeText(shareText)
      setStatusMessage('Trip details copied to clipboard!')
    } catch (error) {
      setStatusMessage('Unable to copy trip details.')
    }

    window.setTimeout(() => setStatusMessage(''), 2500)
  }

  const handleDelete = () => {
    const confirmDelete = window.confirm('Delete this trip? This action cannot be undone.')
    if (confirmDelete) {
      setDeleted(true)
      setStatusMessage('Trip deleted.')
      window.setTimeout(() => setStatusMessage(''), 2500)
    }
  }

  if (deleted) {
    return (
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Trip Removed</p>
          <h1 className="text-3xl font-semibold text-slate-900">This trip was deleted</h1>
          <p className="mx-auto max-w-lg text-sm leading-6 text-slate-600">
            The trip has been removed from your travel plans. Head back to your trips list to create a new itinerary or restore a saved plan.
          </p>
          <button
            type="button"
            onClick={() => navigate('/trips')}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Trips
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="rounded-[36px] overflow-hidden border border-slate-200 bg-white shadow-sm">
      <div className="relative overflow-hidden bg-slate-900/5">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${trip.image})`, filter: 'brightness(0.55)' }}
        />
        <div className="relative px-6 pb-10 pt-6 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <BackButton onClick={() => navigate('/trips')} />
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
                  {trip.country}
                </span>
                <span className="rounded-full bg-white/90 px-4 py-2 text-sm text-slate-600 shadow-sm">
                  {formatTripDates(trip)}
                </span>
              </div>
            </div>

            <div className="grid gap-6 rounded-[32px] bg-white/90 p-8 shadow-xl shadow-slate-950/5 sm:grid-cols-[1.8fr_1.2fr]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-slate-700">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900">
                    <span>🗺️</span>
                    {trip.destination}, {trip.country}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                    <span>👤</span>
                    {trip.travelers} Travelers
                  </span>
                </div>
                <div>
                  <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                    {trip.destination}, {trip.country} <span role="img" aria-label="flag">🇫🇷</span>
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                    Explore iconic landmarks, riverside cafés, and curated cultural experiences with a polished itinerary designed for a comfortable group getaway.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Travelers</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">{trip.travelers}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Budget</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">₹{trip.budget.toLocaleString()}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Duration</p>
                    <p className="mt-3 text-lg font-semibold text-slate-900">{getTripDuration(trip)} Days</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 rounded-[28px] bg-slate-950/95 p-6 text-white shadow-lg shadow-slate-950/20">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Trip actions</p>
                  <h2 className="text-2xl font-semibold">Manage your trip</h2>
                </div>
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="w-full rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Edit Trip
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="w-full rounded-3xl border border-slate-200 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                  >
                    Share
                  </button>
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="w-full rounded-3xl bg-slate-800 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-slate-900"
                  >
                    Delete
                  </button>
                </div>
                {statusMessage && (
                  <p className="rounded-3xl bg-white/10 px-4 py-3 text-sm text-slate-100">{statusMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
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

const formatTripDates = (trip) => {
  if (trip.startDate && trip.endDate) {
    const start = parseDate(trip.startDate)
    const end = parseDate(trip.endDate)
    if (!start || !end || Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return trip.dates
    return `${start.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} — ${end.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`
  }
  return trip.dates
}

export default TripsHeaders
