import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import TripsHeaders from '../components/tripsDetails/TripsHeaders'
import TripOverview from '../components/tripsDetails/TripOverview'
import Itinerary from '../components/tripsDetails/Itinerary'
import BudgetBreakdown from '../components/tripsDetails/BudgetBreakdown'
import HotelRecommendations from '../components/tripsDetails/HotelRecommendations'
import TravelTips from '../components/tripsDetails/TravelTips'


const TripsDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { token } = useAuth()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [generationError, setGenerationError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const fetchTrip = async () => {
      try {
        if (!token) {
          navigate('/login', { replace: true })
          return
        }

        const response = await fetch(`http://localhost:3000/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        })
        const data = await response.json()
        if (!response.ok) throw new Error('Unable to load this trip. Please try again.')
        setTrip(data.trip)
      } catch {
        if (!controller.signal.aborted) setError('Unable to load this trip. Please try again.')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchTrip()
    return () => controller.abort()
  }, [id, navigate, token])

  const retryGeneration = async () => {
    setIsGenerating(true)
    setGenerationError('')
    try {
      if (!token) {
        navigate('/login', { replace: true })
        return
      }

      const response = await fetch(`http://localhost:3000/api/trips/${id}/generate-ai`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) throw new Error('Unable to generate your travel plan.')
      setTrip(data.trip)
    } catch {
      setGenerationError('We could not generate your travel plan. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (loading) {
    return <div role="status" className="flex min-h-64 items-center justify-center py-12 text-slate-600">Loading your trip...</div>
  }

  if (error || !trip) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 px-4 py-12 text-center">
        <p className="text-rose-700">{error || 'Trip not found.'}</p>
        <Link to="/trips" className="inline-flex min-h-11 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
          Back to My Trips
        </Link>
      </div>
    )
  }

  return (
    <div className="min-w-0 py-2">
      <div className="mx-auto max-w-6xl space-y-5">
        <TripsHeaders trip={trip} />
        <TripOverview trip={trip} />
        {trip.aiStatus === 'generating' && <p role="status" className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900"><span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-blue-300 border-t-blue-700" aria-hidden="true" />Creating your personalized travel plan...</p>}
        {(trip.aiStatus === 'failed' || trip.aiStatus === 'pending') && (
          <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
            <p>{generationError || 'The AI travel plan is not ready yet.'}</p>
            <button type="button" onClick={retryGeneration} disabled={isGenerating} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">
              {isGenerating && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />}
              {isGenerating ? 'Generating...' : 'Retry AI plan'}
            </button>
          </div>
        )}
        <HotelRecommendations hotels={trip.hotelRecommendations} />
        <TravelTips tips={trip.travelTips} />
        <Itinerary itinerary={trip.itinerary} travelers={trip.travelers} startDate={trip.startingDate} />
        <BudgetBreakdown breakdown={trip.budgetBreakdown} />
        
      </div>
    </div>
  )
}

export default TripsDetail
