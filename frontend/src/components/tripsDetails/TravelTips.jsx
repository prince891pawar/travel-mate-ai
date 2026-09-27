import React, { useState } from 'react'

const TravelTips = ({ tips = [] }) => {
  const [expandedTip, setExpandedTip] = useState(null)

  return (
    <section aria-labelledby="travel-tips-heading" className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl" aria-hidden="true">💡</div>
        <div>
          <h2 id="travel-tips-heading" className="text-2xl font-semibold tracking-tight text-slate-950">Travel Tips</h2>
          <p className="mt-1 text-sm text-slate-600">Suggestions tailored to your trip.</p>
        </div>
      </div>

      {tips.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500">Travel tips will appear when the AI travel plan is ready.</p>
      ) : (
        <div className="mt-6 space-y-3">
          {tips.map((tip, index) => {
            const isExpanded = expandedTip === index
            return (
              <div key={`${tip}-${index}`} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:border-slate-300 hover:shadow-md">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpandedTip(isExpanded ? null : index)}
                  className="flex w-full items-center gap-4 p-3 text-left sm:p-4"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                  <span className="min-w-0 flex-1 text-sm leading-6 text-slate-700">{tip}</span>
                  <span className={`shrink-0 text-slate-400 transition ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true">⌄</span>
                </button>
                {isExpanded && <p className="border-t border-slate-100 px-4 py-3 text-sm text-slate-500">AI-generated travel suggestion based on your trip details.</p>}
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default TravelTips