import React, { useState } from 'react'
import DayCard from './DayCard'

const Itinerary = ({ itinerary = [], travelers = 'solo' }) => {
  const [expandedDay, setExpandedDay] = useState(1)
  const [showFullItinerary, setShowFullItinerary] = useState(false)
  const visibleItinerary = showFullItinerary ? itinerary : itinerary.slice(0, 4)
  const totalActivities = itinerary.reduce((total, day) => total + (day.activities?.length || 0), 0)
  const hasMoreDays = itinerary.length > 4

  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-2xl">📋</span>
        <h2 className="text-2xl font-semibold text-slate-900">Your Itinerary</h2>
      </div>

      {itinerary.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">No itinerary has been generated yet.</p>
      ) : (
        <>
          <div className="mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Duration & Travelers</p>
                <p className="mt-1 break-words text-base font-semibold capitalize text-slate-900 sm:text-lg">{itinerary.length} Days • {Math.max(0, itinerary.length - 1)} Nights • {travelers} Travelers</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Planned Activities</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">{totalActivities} Activities</p>
              </div>
            </div>
          </div>

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

          {hasMoreDays && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowFullItinerary(!showFullItinerary)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
              >
                {showFullItinerary ? 'Show Less' : 'View Full Itinerary'}
                <svg className={`h-5 w-5 transition-transform ${showFullItinerary ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default Itinerary