import React, { useState } from 'react'
import DayCard from './DayCard'

// Sample itinerary data with complete structure
const sampleItinerary = [
  {
    day: 1,
    date: '12 Aug, 2026',
    title: 'Arrival & Eiffel Tower',
    image: 'https://images.unsplash.com/photo-1786813388851-fdb0be9c8d50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D',
    activities: [
      {
        time: '10:00 AM',
        title: 'Airport → Hotel',
        description: 'Travel from Charles de Gaulle Airport to your hotel.',
        location: 'Paris Hotel',
        transport: { type: 'Taxi', duration: '35 min' },
        cost: 1200,
      },
      {
        time: '12:00 PM',
        title: 'Hotel Check-in',
        description: 'Check into your hotel and take some rest.',
        location: 'Paris Hotel',
        cost: 0,
      },
      {
        time: '04:00 PM',
        title: 'Eiffel Tower',
        description: 'Explore the Eiffel Tower and enjoy the city view.',
        location: 'Champ de Mars, Paris',
        cost: 2500,
      },
      {
        time: '08:00 PM',
        title: 'Dinner',
        description: 'Enjoy an authentic French dinner.',
        location: 'Local Restaurant, Paris',
        cost: 800,
      },
    ],
    notes: 'Carry your passport and hotel confirmation.',
  },
  {
    day: 2,
    date: '13 Aug, 2026',
    title: 'Explore Paris',
    image: 'https://images.unsplash.com/photo-1782179284593-b1650a2a3189?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D',
    activities: [
      {
        time: '09:00 AM',
        title: 'Louvre Museum',
        description: 'Discover world-famous artworks including the Mona Lisa.',
        location: 'Louvre Museum, Paris',
        cost: 1700,
      },
      {
        time: '01:00 PM',
        title: 'Notre-Dame',
        description: 'Visit the iconic Notre-Dame Cathedral.',
        location: 'Notre-Dame, Paris',
        cost: 600,
      },
      {
        time: '03:30 PM',
        title: 'Seine River Cruise',
        description: 'Enjoy a scenic boat tour along the Seine.',
        location: 'Seine River, Paris',
        transport: { type: 'Boat', duration: '1 hour' },
        cost: 900,
      },
      {
        time: '07:00 PM',
        title: 'Local Dinner',
        description: 'Dinner at a traditional Parisian bistro.',
        location: 'Bistro, Paris',
        cost: 1000,
      },
    ],
    important: 'Museum tickets should be booked in advance.',
  },
  {
    day: 3,
    date: '14 Aug, 2026',
    title: 'Local Experience',
    image: 'https://images.unsplash.com/photo-1786844520994-dc0358298414?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
    activities: [
      {
        time: '10:00 AM',
        title: 'Montmartre Walking Tour',
        description: 'Explore the charming Montmartre neighborhood.',
        location: 'Montmartre, Paris',
        cost: 500,
      },
      {
        time: '12:30 PM',
        title: 'Café & Local Food',
        description: 'Enjoy French pastries and coffee at a local café.',
        location: 'Montmartre Café',
        cost: 400,
      },
      {
        time: '02:00 PM',
        title: 'Shopping',
        description: 'Browse local boutiques and markets.',
        location: 'Marais District, Paris',
        cost: 2000,
      },
      {
        time: '06:00 PM',
        title: 'Evening at Leisure',
        description: 'Free time to explore at your own pace.',
        location: 'Paris',
        cost: 0,
      },
    ],
  },
  {
    day: 4,
    date: '15 Aug, 2026',
    title: 'Palace & Gardens',
    image: 'https://images.unsplash.com/photo-1786806571457-6fa59a249ceb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
    activities: [
      {
        time: '08:00 AM',
        title: 'Hotel → Palace of Versailles',
        description: 'Travel to the majestic Palace of Versailles.',
        location: 'Palace of Versailles',
        transport: { type: 'Train', duration: '45 min' },
        cost: 300,
      },
      {
        time: '10:00 AM',
        title: 'Palace of Versailles Tour',
        description: 'Guided tour of the palace and its opulent rooms.',
        location: 'Palace of Versailles',
        cost: 1500,
      },
      {
        time: '01:00 PM',
        title: 'Gardens Tour',
        description: 'Explore the expansive gardens and fountains.',
        location: 'Versailles Gardens',
        cost: 500,
      },
      {
        time: '04:00 PM',
        title: 'Return to Paris',
        description: 'Travel back to Paris.',
        location: 'Paris',
        transport: { type: 'Train', duration: '45 min' },
        cost: 300,
      },
      {
        time: '07:00 PM',
        title: 'Farewell Dinner',
        description: 'Special dinner to celebrate the trip.',
        location: 'Fine Dining Restaurant, Paris',
        cost: 1500,
      },
    ],
  },
]

// Calculate total cost from all activities
const calculateTotalCost = (itinerary) => {
  return itinerary.reduce((total, day) => {
    const dayCost = day.activities.reduce((dayTotal, activity) => dayTotal + (activity.cost || 0), 0)
    return total + dayCost
  }, 0)
}

// Calculate total activities
const countTotalActivities = (itinerary) => {
  return itinerary.reduce((total, day) => total + (day.activities?.length || 0), 0)
}

const Itinerary = ({ itinerary = sampleItinerary, travelers = 2, nights = 3 }) => {
  const [expandedDay, setExpandedDay] = useState(1)
  const [showFullItinerary, setShowFullItinerary] = useState(false)

  const visibleItinerary = showFullItinerary ? itinerary : itinerary.slice(0, 4)
  const hasMoreDays = itinerary.length > 4

  const totalCost = calculateTotalCost(visibleItinerary)
  const totalActivities = countTotalActivities(visibleItinerary)
  const totalDays = visibleItinerary.length

  return (
    <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl font-semibold text-slate-900">Your Itinerary</h2>
        </div>
      </div>

      {/* Itinerary Summary */}
      <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-600">Duration & Travelers</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {totalDays} Days • {nights} Nights • {travelers} Travelers
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-600">Activities & Total Cost</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">
              {totalActivities} Activities • <span className="text-blue-600">₹{totalCost.toLocaleString('en-IN')}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Day Cards */}
      <div className="space-y-4">
        {visibleItinerary.map((dayData) => (
          <DayCard
            key={dayData.day}
            dayData={dayData}
            isExpanded={expandedDay === dayData.day}
            onToggle={() => setExpandedDay(expandedDay === dayData.day ? null : dayData.day)}
          />
        ))}
      </div>

      {/* View Full Itinerary Button */}
      {hasMoreDays && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowFullItinerary(!showFullItinerary)}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
          >
            {showFullItinerary ? 'Show Less' : 'View Full Itinerary'}
            <svg
              className={`h-5 w-5 transition-transform ${showFullItinerary ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

export default Itinerary
