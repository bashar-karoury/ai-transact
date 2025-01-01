'use client'

export default function Error({
  error,
  reset,
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="error-button"
      >
        Try again
      </button>
    </div>
  )
} 
