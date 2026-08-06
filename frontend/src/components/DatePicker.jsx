import React from 'react'

const DatePicker = ({ label, name, value, placeholder, icon, onChange, error }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        {icon}
        <span>{label}</span>
      </div>
      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-3xl border px-4 py-4 pr-12 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${error ? 'border-rose-500/40 bg-rose-50' : 'border-slate-200 bg-white'}`}
          type="date"
        />
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 2V6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 10H21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 22H19C20.1046 22 21 21.1046 21 20V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V20C3 21.1046 3.89543 22 5 22Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {error && <p className="text-sm text-rose-600">{error}</p>}
    </div>
  )
}

export default DatePicker
