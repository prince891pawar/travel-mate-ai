import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TripsHeaders from '../components/tripsDetails/TripsHeaders'
import TripOverview from '../components/tripsDetails/TripOverview'
import Itinerary from '../components/tripsDetails/Itinerary'
import BudgetBreakdown from '../components/tripsDetails/BudgetBreakdown'
import HotelRecommendations from '../components/tripsDetails/HotelRecommendations'
import TravelTips from '../components/tripsDetails/TravelTips'


const TripsDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState('')
  const [generationError, setGenerationError] = useState('')

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login', { replace: true })
          return
        }

        const response = await fetch(`http://localhost:3000/api/trips/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Unable to load this trip.')
        setTrip(data.trip)
      } catch (fetchError) {
        setError(fetchError.message || 'Unable to load this trip.')
      } finally {
        setLoading(false)
      }
    }

    fetchTrip()
  }, [id, navigate])

  const retryGeneration = async () => {
    setIsGenerating(true)
    setGenerationError('')
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:3000/api/trips/${id}/generate-ai`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to generate your travel plan.')
      setTrip(data.trip)
    } catch (generationError) {
      setGenerationError(generationError.message || 'Unable to generate your travel plan. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-slate-600">Loading your trip...</div>
  }

  if (error || !trip) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 text-center text-rose-700">{error || 'Trip not found.'}</div>
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <TripsHeaders trip={trip} />
        <TripOverview trip={trip} />
        {trip.aiStatus === 'generating' && <p className="rounded-2xl bg-white p-5 text-slate-600">Creating your AI travel plan...</p>}
        {(trip.aiStatus === 'failed' || trip.aiStatus === 'pending') && (
          <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 sm:flex-row sm:items-center sm:justify-between">
            <p>{generationError || 'The AI travel plan is not ready yet.'}</p>
            <button type="button" onClick={retryGeneration} disabled={isGenerating} className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-60">
              {isGenerating ? 'Generating...' : 'Generate AI plan'}
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
