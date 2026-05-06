import { useState, useEffect, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import SearchBar from '../../components/SearchBar'
import CategoryTag from '../../components/CategoryTag'
import HeroSection from './HeroSection'
import TestimonialCarousel from './TestimonialCarousel'

const CATEGORIES = ['Personal Care', 'Home Cleaning', 'Baby Care', 'Kitchen']

export default function BrowsePage({ searchMode = false, savedProducts = {}, onToggleSave, onSelectProduct }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const gridRef = useRef(null)

  const INITIAL_LIMIT = 6

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (!searchMode) {
      setQuery('')
      setSearchQuery('')
    }
  }, [searchMode])

  useEffect(() => {
    setShowAll(false)
  }, [activeCategory, searchQuery])

  function handleSearch() {
    setSearchQuery(query.trim())
  }

  function scrollToGrid() {
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filteredProducts = products.filter((p) => {
    const matchesSearch = searchQuery
      ? (p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.description?.toLowerCase().includes(searchQuery.toLowerCase()))
      : true
    const matchesCategory = activeCategory
      ? p.category?.toLowerCase() === activeCategory.toLowerCase()
      : true
    return matchesSearch && matchesCategory
  })

  return (
    <>
      {!searchMode && <HeroSection onScrollToGrid={scrollToGrid} />}

      <main className="max-w-wide mx-auto px-8 py-12">

        {searchMode && (
          <div className="mb-8">
            <SearchBar
              value={query}
              onChange={setQuery}
              onSubmit={handleSearch}
              placeholder='Try "soap", "fragrance free", or "Branch Basics"'
            />
            {searchQuery && (
              <p className="text-small font-medium text-neutral-500 leading-small mt-4">
                {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Category filter row — scroll target for hero CTA */}
        <div ref={gridRef} className="flex flex-wrap gap-2 mb-8">
          <CategoryTag
            label="All"
            selected={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {CATEGORIES.map((cat) => (
            <CategoryTag
              key={cat}
              label={cat}
              selected={activeCategory === cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
            />
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <span className="text-body text-neutral-400">Loading products…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-16">
            <span className="text-body text-error">Failed to load products: {error}</span>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAll ? filteredProducts : filteredProducts.slice(0, INITIAL_LIMIT)).map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  safetyScore={product.safety_score}
                  category={product.category}
                  description={product.description}
                  imageUrl={product.image_url}
                  isSaved={!!savedProducts[product.id]}
                  onToggleSave={() => onToggleSave(product)}
                  onClick={() => onSelectProduct && onSelectProduct(product)}
                  action={
                    <Button
                      label="View more details"
                      variant="primary"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); onSelectProduct && onSelectProduct(product) }}
                    />
                  }
                />
              ))}
            </div>
            {filteredProducts.length > INITIAL_LIMIT && (
              <div className="flex justify-center mt-10">
                <Button
                  label={showAll ? 'See less' : 'See more'}
                  variant="secondary"
                  size="md"
                  onClick={() => setShowAll((prev) => !prev)}
                />
              </div>
            )}
          </>
        )}
      </main>

      {!searchMode && <TestimonialCarousel />}
    </>
  )
}
