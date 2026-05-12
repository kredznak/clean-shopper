import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'
import MyListPage from './features/my-list/MyListPage'
import ProductDetailPage from './features/product-detail/ProductDetailPage'
import FloatingChat from './features/chat/FloatingChat'
import SignInPage from './features/auth/SignInPage'
import SignUpPage from './features/auth/SignUpPage'

type AuthView = 'signin' | 'signup'

export default function App() {
  const [session, setSession] = useState<any>(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const [authView, setAuthView] = useState<AuthView>('signin')
  const [activeTab, setActiveTab] = useState('browse')
  const [savedProducts, setSavedProducts] = useState<Record<number, any>>({})
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  function toggleSave(product: any) {
    setSavedProducts((prev) => {
      if (prev[product.id]) {
        const next = { ...prev }
        delete next[product.id]
        return next
      }
      return { ...prev, [product.id]: product }
    })
  }

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
        onNavigate={(tab: string) => { setSelectedProduct(null); setActiveTab(tab) }}
        onSignOut={() => supabase.auth.signOut()}
      />

      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
          isSaved={!!savedProducts[selectedProduct.id]}
          onToggleSave={() => toggleSave(selectedProduct)}
        />
      ) : (
        <>
          {activeTab === 'my-list' && (
            <MyListPage
              savedProducts={savedProducts}
              onToggleSave={toggleSave}
              onNavigateToBrowse={() => setActiveTab('browse')}
              onSelectProduct={setSelectedProduct}
            />
          )}
          {(activeTab === 'browse' || activeTab === 'search') && (
            <BrowsePage
              searchMode={activeTab === 'search'}
              savedProducts={savedProducts}
              onToggleSave={toggleSave}
              onSelectProduct={setSelectedProduct}
            />
          )}
        </>
      )}

      <FloatingChat />
    </div>
  )
}
