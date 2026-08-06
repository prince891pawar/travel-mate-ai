import React from 'react'

const InputField = ({ label, name, value, placeholder, icon, onChange, error }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        {icon}
        <span>{label}</span>
      </div>
      <input
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-3xl border px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${error ? 'border-rose-500/40 bg-rose-50' : 'border-slate-200 bg-white'}`}
        type="text"
      />
      {error && <p className="text-sm text-rose-600">{error}</p>}
    </div>
  )
}

export default InputField
