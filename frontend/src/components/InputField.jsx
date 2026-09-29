import React from 'react'

const InputField = ({ label, name, value, placeholder, icon, onChange, error }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        {icon}
        <span>{label}</span>
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`min-h-12 w-full min-w-0 rounded-xl border px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-100 ${error ? 'border-rose-500/60 bg-rose-50' : 'border-slate-200 bg-white'}`}
        type="text"
      />
      {error && <p id={`${name}-error`} className="text-sm text-rose-700">{error}</p>}
    </div>
  )
}

export default InputField
