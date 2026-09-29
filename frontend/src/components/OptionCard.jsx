import React from 'react'

const OptionCard = ({ label, icon, value, selectedValue, onSelect }) => {
  const isSelected = selectedValue === value
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={isSelected}
      className={`group flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:min-h-16 sm:gap-3 sm:px-4 ${isSelected ? 'border-blue-500 bg-blue-600 text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'}`}
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition sm:h-10 sm:w-10 ${isSelected ? 'border-white/30 bg-white/10 text-white' : 'border-slate-200 bg-slate-50 text-slate-600'}`} aria-hidden="true">
        {icon}
      </span>
      <span className="min-w-0 break-words">{label}</span>
    </button>
  )
}

export default OptionCard
