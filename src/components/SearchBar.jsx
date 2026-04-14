import { useState } from 'react'

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  isLoading = false,
}) {
  const [focused, setFocused] = useState(false)

  function handleKeyDown(e) {
    if (e.key === 'Enter') onSubmit()
  }

  return (
    <div
      className={`
        flex items-center gap-3
        bg-surface-card border rounded-md px-4 py-3 shadow-sm
        transition-colors duration-fast ease-default
        ${focused ? 'border-primary' : 'border-neutral-200'}
      `}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        disabled={isLoading}
        className="flex-1 text-body font-regular text-neutral-800 leading-body placeholder:text-neutral-400 bg-transparent outline-none disabled:opacity-50"
      />
      <button
        onClick={onSubmit}
        disabled={isLoading || !value.trim()}
        className="shrink-0 bg-primary text-surface-card text-small font-medium rounded-md px-4 py-2 transition-colors duration-fast ease-default hover:bg-primary-light active:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-surface-card border-t-transparent rounded-full animate-spin" />
        ) : (
          'Search'
        )}
      </button>
    </div>
  )
}
