import React from 'react'

function ProgressBar({ percent = 0 }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}

export default ProgressBar
