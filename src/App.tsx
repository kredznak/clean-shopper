import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'

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
      <NavBar
        activeRoute={activeTab}
        onNavigate={setActiveTab}
        onSignOut={() => supabase.auth.signOut()}
      />

      <BrowsePage searchMode={activeTab === 'search'} />
    </div>
  )
}
