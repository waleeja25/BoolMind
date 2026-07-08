function Select({ label, error, children, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        {...props}
        className={`rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-400' : 'border-gray-300'
        }`}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}

export default Select
