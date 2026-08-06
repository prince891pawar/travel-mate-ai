import React from 'react'

const GenerateButton = ({ onClick, loading }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:brightness-105"
    >
      {loading ? 'Generating...' : '✨ Generate AI Trip'}
    </button>
  )
}

export default GenerateButton
