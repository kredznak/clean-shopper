import NavBar from './components/NavBar'
import BrowsePage from './features/browse/BrowsePage'

export default function App() {
  return (
    <div className="min-h-screen bg-surface-page">
      <NavBar activeRoute="home" />
      <BrowsePage />
    </div>
  )
}
