import React from 'react'

const OptionCard = ({ label, icon, value, selectedValue, onSelect }) => {
  const isSelected = selectedValue === value
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={`group flex min-h-[84px] w-full items-center justify-center gap-3 rounded-3xl border px-4 py-4 text-sm font-semibold transition ${isSelected ? 'border-blue-500 bg-blue-600 text-white shadow-lg' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}
    >
      <span className={`grid h-10 w-10 place-items-center rounded-2xl border transition ${isSelected ? 'border-white bg-white/10 text-white' : 'border-slate-200 bg-slate-50 text-slate-600'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  )
}

export default OptionCard
