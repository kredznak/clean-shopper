import { useState } from 'react'

const NAV_LINKS = [
  { key: 'browse', label: 'Browse' },
  { key: 'search', label: 'Search' },
  { key: 'my-list', label: 'My Favorites' },
]

export default function NavBar({ activeRoute, onNavigate, onSignOut }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-surface-card border-b border-neutral-200 shadow-sm">
      <nav className="px-25 flex items-center justify-between h-16">

        {/* Wordmark */}
        <span className="text-h4 font-semibold text-primary leading-heading">
          Clean Shopper
        </span>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-6">
          {NAV_LINKS.map(({ key, label }) => {
            const isActive = activeRoute === key
            return (
              <a
                key={key}
                href="#"
                onClick={(e) => { e.preventDefault(); onNavigate?.(key) }}
                className={`
                  text-small font-medium
                  transition-colors duration-fast ease-default
                  ${isActive
                    ? 'text-primary border-b-2 border-primary pb-0.5'
                    : 'text-neutral-500 hover:text-neutral-800'
                  }
                `}
              >
                {label}
              </a>
            )
          })}
          {onSignOut && (
            <button
              onClick={onSignOut}
              className="text-small font-medium text-neutral-500 hover:text-neutral-800 transition-colors duration-fast ease-default"
            >
              Sign out
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="sm:hidden text-neutral-500 hover:text-neutral-800 transition-colors duration-fast ease-default"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="sm:hidden bg-surface-card border-t border-neutral-100 px-25 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ key, label }) => {
            const isActive = activeRoute === key
            return (
              <a
                key={key}
                href="#"
                className={`
                  text-small font-medium
                  transition-colors duration-fast ease-default
                  ${isActive ? 'text-primary' : 'text-neutral-500 hover:text-neutral-800'}
                `}
                onClick={(e) => { e.preventDefault(); onNavigate?.(key); setMenuOpen(false) }}
              >
                {label}
              </a>
            )
          })}
          {onSignOut && (
            <button
              onClick={() => { setMenuOpen(false); onSignOut() }}
              className="text-small font-medium text-neutral-500 hover:text-neutral-800 transition-colors duration-fast ease-default text-left"
            >
              Sign out
            </button>
          )}
        </div>
      )}
    </header>
  )
}
