import React from 'react'

const SectionTitle = ({ icon, title }) => {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold text-slate-900">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-lg text-slate-700">
        {icon}
      </span>
      <span>{title}</span>
    </div>
  )
}

export default SectionTitle
