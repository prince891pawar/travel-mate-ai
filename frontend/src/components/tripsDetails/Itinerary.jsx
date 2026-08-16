import React, { useState } from 'react'
import DayCard from './DayCard'

// Sample itinerary data - replace with actual API data
const sampleItinerary = [
  {
    day: 1,
    title: 'Arrival & Eiffel Tower',
    image: 'https://images.unsplash.com/photo-1786813388851-fdb0be9c8d50?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D',
    activities: [
      'Airport → Hotel',
      'Check-in',
      'Eiffel Tower',
      'Dinner',
    ],
  },
  {
    day: 2,
    title: 'Explore Paris',
    image: 'https://images.unsplash.com/photo-1782179284593-b1650a2a3189?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNnx8fGVufDB8fHx8fA%3D%3D',
    activities: [
      'Louvre Museum',
      'Notre-Dame',
      'Seine River',
      'Local Dinner',
    ],
  },
  {
    day: 3,
    title: 'Local Experience',
    image: 'https://images.unsplash.com/photo-1786844520994-dc0358298414?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D',
    activities: [
      'Montmartre Walking Tour',
      'Café & Local Food',
      'Shopping',
      'Evening at Leisure',
    ],
  },
  {
    day: 4,
    title: 'Palace & Gardens',
    image: 'https://images.unsplash.com/photo-1786806571457-6fa59a249ceb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8',
    activities: [
      'Palace of Versailles',
      'Gardens Tour',
      'Return to Paris',
      'Dinner',
    ],
  },
]

const Itinerary = ({ itinerary = sampleItinerary, maxVisibleDays = 4 }) => {
  const [showFullItinerary, setShowFullItinerary] = useState(false)

  const visibleItinerary = showFullItinerary ? itinerary : itinerary.slice(0, maxVisibleDays)
  const hasMoreDays = itinerary.length > maxVisibleDays

  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <h2 className="text-2xl font-semibold text-slate-900">Your Itinerary</h2>
        </div>
      </div>

      {/* Day Cards Grid */}
      <div className="space-y-4">
        {visibleItinerary.map((dayData) => (
          <DayCard
            key={dayData.day}
            day={dayData.day}
            title={dayData.title}
            image={dayData.image}
            activities={dayData.activities}
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
