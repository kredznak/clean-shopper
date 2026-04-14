import { useState } from 'react'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'

const TABS = [
  { key: 'browse', label: 'Browse' },
  { key: 'search', label: 'Search' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('browse')

  return (
    <div className="min-h-screen bg-surface-page">
      <NavBar activeRoute="home" />

      {/* Tab strip */}
      <div className="bg-surface-card border-b border-neutral-200">
        <div className="max-w-wide mx-auto px-8">
          <div className="flex gap-6">
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`
                  text-small font-medium py-4
                  border-b-2 -mb-px
                  transition-colors duration-fast ease-default
                  ${activeTab === key
                    ? 'text-primary border-primary'
                    : 'text-neutral-500 border-transparent hover:text-neutral-800 hover:border-neutral-300'
                  }
                `}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeTab === 'browse' ? <BrowsePage /> : <SearchPage />}
    </div>
  )
}
