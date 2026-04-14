import NavBar from './components/NavBar'
import SearchPage from './features/search/SearchPage'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-page">
      <NavBar activeRoute="home" />
      <SearchPage />
    </div>
  )
}
