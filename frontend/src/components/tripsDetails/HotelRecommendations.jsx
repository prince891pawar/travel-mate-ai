import React from 'react'

const HotelRecommendations = ({ hotels = [] }) => {
  const formatPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(price) || 0)

  return (
    <section aria-labelledby="accommodation-heading" className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span className="text-xl text-indigo-600" aria-hidden="true">▣</span>
            Accommodation
          </p>
          <h2 id="accommodation-heading" className="mt-2 text-2xl font-semibold text-slate-950">Stay recommendations</h2>
        </div>
        <p className="text-sm text-slate-500">AI suggestions for your trip</p>
      </div>

      {hotels.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">No accommodation recommendations are available yet.</p>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {hotels.map((hotel, index) => (
            <article key={`${hotel.name}-${index}`} className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:shadow-sm sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="break-words text-lg font-semibold text-slate-950 sm:text-xl">{hotel.name}</h3>
                  <p className="mt-1 text-sm font-medium text-indigo-600">{hotel.category}</p>
                </div>
                <p className="text-right text-sm font-semibold text-slate-900">
                  {formatPrice(hotel.estimatedPricePerNight)}
                  <span className="block font-normal text-slate-500">estimated / night</span>
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{hotel.description}</p>
              <p className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <span className="text-rose-500" aria-hidden="true">⌖</span>{hotel.location}
              </p>
            </article>
          ))}
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">AI-generated suggestions and price estimates only. Availability and current rates are not verified.</p>
    </section>
  )
}

export default HotelRecommendations