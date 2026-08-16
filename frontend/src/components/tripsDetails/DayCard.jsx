import React, { useState } from 'react'

const activityIcons = {
  flight: '✈️',
  hotel: '🏨',
  checkin: '🔑',
  landmark: '🗼',
  museum: '🏛️',
  restaurant: '🍽️',
  dinner: '🍽️',
  shopping: '🛍️',
  cafe: '☕',
  walking: '🚶',
  boat: '🚤',
  leisure: '🎭',
  tour: '🎫',
  transport: '🚌',
  default: '📍',
}

const getActivityIcon = (activity) => {
  const activityLower = activity.toLowerCase()
  
  if (activityLower.includes('airport') || activityLower.includes('flight')) return activityIcons.flight
  if (activityLower.includes('hotel') || activityLower.includes('accommodation')) return activityIcons.hotel
  if (activityLower.includes('check-in') || activityLower.includes('checkin')) return activityIcons.checkin
  if (activityLower.includes('eiffel') || activityLower.includes('tower') || activityLower.includes('landmark')) return activityIcons.landmark
  if (activityLower.includes('museum') || activityLower.includes('louvre')) return activityIcons.museum
  if (activityLower.includes('dinner') || activityLower.includes('restaurant')) return activityIcons.restaurant
  if (activityLower.includes('cafe') || activityLower.includes('coffee')) return activityIcons.cafe
  if (activityLower.includes('shopping')) return activityIcons.shopping
  if (activityLower.includes('walking') || activityLower.includes('tour')) return activityIcons.walking
  if (activityLower.includes('boat') || activityLower.includes('seine')) return activityIcons.boat
  if (activityLower.includes('leisure')) return activityIcons.leisure
  
  return activityIcons.default
}

const DayCard = ({ day, title, image, activities = [] }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div
        className="flex cursor-pointer items-center justify-between gap-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-1 items-center gap-4">
          {image && (
            <img
              src={image}
              alt={`Day ${day}`}
              className="h-20 w-20 rounded-[16px] object-cover"
            />
          )}
          <div>
            <p className="text-sm font-semibold text-blue-600">Day {day}</p>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          </div>
        </div>
        <svg
          className={`h-6 w-6 flex-shrink-0 transition-transform text-slate-600 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Activities List - Expanded */}
      {isExpanded && (
        <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
          {activities && activities.length > 0 ? (
            activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-700">
                <span className="text-lg">{getActivityIcon(activity)}</span>
                <span className="text-sm font-medium">{activity}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No activities planned</p>
          )}
        </div>
      )}
    </div>
  )
}

export default DayCard
