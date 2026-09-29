import React from 'react'

const BudgetBreakdown = ({ breakdown }) => {
  const categories = [
    { name: 'Accommodation', key: 'accommodation', icon: '🏨' },
    { name: 'Food', key: 'food', icon: '🍴' },
    { name: 'Transportation', key: 'transportation', icon: '🚕' },
    { name: 'Activities', key: 'activities', icon: '🎟️' },
    { name: 'Miscellaneous', key: 'miscellaneous', icon: '🛍️' },
  ]

  const formatCurrency = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

  if (!breakdown) {
    return (
      <section className="w-full space-y-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900">Estimated Budget</h2>
        <p className="text-sm text-gray-600">Budget estimates will appear when the AI travel plan is ready.</p>
      </section>
    )
  }

  const total = Number(breakdown.total) || categories.reduce((sum, category) => sum + (Number(breakdown[category.key]) || 0), 0)

  return (
    <section className="w-full min-w-0 space-y-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
      <div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Estimated Budget</h2>
        <p className="text-sm text-gray-600">AI-generated estimates in {breakdown.currency || 'INR'}.</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold uppercase text-gray-600">Estimated Total</p>
        <p className="mt-2 break-words text-2xl font-bold text-gray-900 sm:text-3xl">{formatCurrency(total)}</p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
        <h3 className="mb-6 text-lg font-bold text-gray-900">Expense Categories</h3>
        <div className="space-y-5">
          {categories.map((category) => {
            const amount = Number(breakdown[category.key]) || 0
            const percentage = total > 0 ? Math.min((amount / total) * 100, 100) : 0
            return (
              <div key={category.key} className="border-b border-gray-100 pb-5 last:border-b-0 last:pb-0">
                <div className="mb-3 flex min-w-0 flex-wrap items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="text-2xl" aria-label={category.name}>{category.icon}</span>
                    <span className="break-words text-sm font-semibold text-gray-900 md:text-base">{category.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-900 md:text-base">{formatCurrency(amount)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="w-12 text-right text-xs font-semibold text-gray-600">{percentage.toFixed(0)}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BudgetBreakdown