import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SearchPage from './features/search/SearchPage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'

const TABS = [
  { key: 'browse', label: 'Browse' },
  { key: 'search', label: 'Search' },
]

type AuthView = 'signin' | 'signup'

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const [authView, setAuthView] = useState<AuthView>('signin')
  const [activeTab, setActiveTab] = useState('browse')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoadingSession(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-surface-page flex items-center justify-center">
        <span className="text-body text-neutral-400">Loading…</span>
      </div>
    )
  }

  if (!session) {
    return authView === 'signin'
      ? <SignInPage onNavigateToSignUp={() => setAuthView('signup')} />
      : <SignUpPage onNavigateToSignIn={() => setAuthView('signin')} />
  }

  return (
    <div className="min-h-screen bg-surface-page">
      <NavBar activeRoute="home" onSignOut={() => supabase.auth.signOut()} />

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
