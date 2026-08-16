import React from 'react'
import { useLocation } from 'react-router-dom'
import TripsHeaders from '../components/tripsDetails/TripsHeaders'
import TripOverview from '../components/tripsDetails/TripOverview'
import Itinerary from '../components/tripsDetails/Itinerary'

const defaultTrip = {
  destination: 'Paris',
  country: 'France',
  dates: '2026-08-12/2026-08-18',
  travelers: 2,
  budget: 80000,
  travelStyle: 'Adventure',
  startDate: '2026-08-12',
  endDate: '2026-08-18',
  image:
    'https://images.unsplash.com/photo-1549890736-7a5f7b6fcc31?auto=format&fit=crop&w=1600&q=80',
}

const TripsDetail = () => {
  const location = useLocation()
  const trip = location.state?.trip || defaultTrip

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <TripsHeaders trip={trip} />
        <TripOverview trip={trip} />
        <Itinerary />
      </div>
    </div>
  )
}

export default TripsDetail
