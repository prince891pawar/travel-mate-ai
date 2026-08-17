import React, { useState } from 'react'

// Activity icons based on activity type
const getActivityIcon = (title = '') => {
  const titleLower = title.toLowerCase()

  if (titleLower.includes('airport') || titleLower.includes('flight')) return '✈️'
  if (titleLower.includes('hotel') || titleLower.includes('accommodation') || titleLower.includes('check-in') || titleLower.includes('checkin')) return '🏨'
  if (titleLower.includes('check-in') || titleLower.includes('checkin')) return '🔑'
  if (titleLower.includes('eiffel') || titleLower.includes('tower') || titleLower.includes('landmark') || titleLower.includes('palace')) return '🗼'
  if (titleLower.includes('museum') || titleLower.includes('louvre')) return '🏛️'
  if (titleLower.includes('dinner') || titleLower.includes('restaurant') || titleLower.includes('bistro')) return '🍽️'
  if (titleLower.includes('cafe') || titleLower.includes('coffee')) return '☕'
  if (titleLower.includes('shopping')) return '🛍️'
  if (titleLower.includes('walking') || titleLower.includes('tour')) return '🚶'
  if (titleLower.includes('boat') || titleLower.includes('seine') || titleLower.includes('cruise')) return '🚤'
  if (titleLower.includes('leisure') || titleLower.includes('free')) return '🎭'
  if (titleLower.includes('train') || titleLower.includes('metro') || titleLower.includes('return')) return '🚇'
  if (titleLower.includes('taxi') || titleLower.includes('transport')) return '🚕'
  if (titleLower.includes('garden')) return '🌳'

  return '📍'
}

// Get transport icon
const getTransportIcon = (type = '') => {
  const typeLower = type.toLowerCase()
  if (typeLower.includes('taxi')) return '🚕'
  if (typeLower.includes('train') || typeLower.includes('metro')) return '🚇'
  if (typeLower.includes('boat') || typeLower.includes('cruise')) return '🚤'
  if (typeLower.includes('bus')) return '🚌'
  return '🚗'
}

const DayCard = ({ dayData, isExpanded = true, onToggle = () => {} }) => {
  const [isHovering, setIsHovering] = useState(false)

  const { day, date, title, image, activities = [], notes = '', important = '' } = dayData

  // Calculate day total cost
  const dayCost = activities.reduce((total, activity) => total + (activity.cost || 0), 0)

  const handleViewMap = (location) => {
    console.log('View on map:', location)
  }

  const handleEditDay = () => {
    console.log('Edit day:', day)
  }

  const handleAddActivity = () => {
    console.log('Add activity to day:', day)
  }

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Day Header */}
      <div
        className="flex cursor-pointer items-center justify-between gap-4 p-5"
        onClick={onToggle}
      >
        <div className="flex flex-1 items-center gap-4">
          {image && (
            <img
              src={image}
              alt={`Day ${day}`}
              className="h-20 w-20 rounded-2xl object-cover shrink-0"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-blue-600">
                Day {day}
              </p>
              {date && <p className="text-sm font-semibold text-slate-500">• {date}</p>}
            </div>
            <h3 className="mt-1 text-lg font-semibold text-slate-900">{title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isHovering && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleEditDay()
              }}
              className="rounded-md bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-200"
            >
              Edit
            </button>
          )}
          <svg
            className={`h-6 w-6 shrink-0 transition-transform text-slate-600 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Activities Timeline - Expanded */}
      {isExpanded && (
        <div className="border-t border-slate-200 px-5 py-4">
          {/* Important Info */}
          {important && (
            <div className="mb-4 rounded-2xl border-l-4 border-orange-400 bg-orange-50 p-3">
              <p className="text-xs font-semibold text-orange-600">⚠️ IMPORTANT</p>
              <p className="mt-1 text-sm text-orange-700">{important}</p>
            </div>
          )}

          {/* Activities Timeline */}
          {activities && activities.length > 0 ? (
            <div className="space-y-0">
              {activities.map((activity, index) => (
                <div key={index} className="relative pb-4">
                  {/* Timeline line */}
                  {index < activities.length - 1 && (
                    <div className="absolute left-8 top-12 h-8 w-0.5 bg-slate-200" />
                  )}

                  {/* Activity */}
                  <div className="flex gap-4">
                    {/* Time and Icon */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-slate-600">{activity.time}</span>
                      <span className="text-2xl">{getActivityIcon(activity.title)}</span>
                    </div>

                    {/* Activity Details */}
                    <div className="flex-1 pt-0.5">
                      <div className="flex flex-col gap-1">
                        <p className="font-semibold text-slate-900">{activity.title}</p>

                        {/* Transport Info */}
                        {activity.transport && (
                          <div className="text-xs text-slate-600">
                            {getTransportIcon(activity.transport.type)} {activity.transport.type} • {activity.transport.duration}
                          </div>
                        )}

                        {/* Description */}
                        {activity.description && (
                          <p className="text-xs text-slate-600">{activity.description}</p>
                        )}

                        {/* Location and Cost */}
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          {activity.location && (
                            <button
                              onClick={() => handleViewMap(activity.location)}
                              className="flex items-center gap-1 text-xs text-slate-700 hover:text-blue-600 transition-colors"
                            >
                              📍 {activity.location}
                              <span className="text-blue-600 hover:underline">→</span>
                            </button>
                          )}

                          {activity.cost > 0 && (
                            <div className="flex items-center gap-1 text-xs font-semibold text-slate-900">
                              🎟️ ₹{activity.cost.toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No activities planned</p>
          )}

          {/* Day Cost Summary */}
          <div className="mt-4 border-t border-slate-200 pt-3 flex justify-between items-center">
            <p className="text-sm font-semibold text-slate-700">Estimated Day Cost</p>
            <p className="text-lg font-semibold text-blue-600">₹{dayCost.toLocaleString('en-IN')}</p>
          </div>

          {/* Notes Section */}
          {notes && (
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-600">📝 NOTES</p>
              <p className="mt-1 text-sm text-slate-700">{notes}</p>
            </div>
          )}

          {/* Add Activity Button */}
          <div className="mt-4">
            <button
              onClick={handleAddActivity}
              className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600"
            >
              + Add Activity
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DayCard
