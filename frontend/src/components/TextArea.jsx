import React from 'react'

const TextArea = ({ label, name, value, placeholder, onChange }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        <span>{label}</span>
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="min-h-32 w-full min-w-0 resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-2 focus-visible:ring-blue-100"
      />
    </div>
  )
}

export default TextArea
