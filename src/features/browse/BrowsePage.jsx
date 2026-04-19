import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import SearchBar from '../../components/SearchBar'
import CategoryTag from '../../components/CategoryTag'

const CATEGORIES = ['Personal Care', 'Home Cleaning', 'Baby Care', 'Kitchen']

export default function BrowsePage({ searchMode = false, savedProducts = {}, onToggleSave }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(null)

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

  function handleSearch() {
    setSearchQuery(query.trim())
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
    <main className="max-w-wide mx-auto px-25 py-12">
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

      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-h1 font-regular text-neutral-800 leading-heading tracking-heading">
          Browse Products
        </h1>
        <p className="text-body font-regular text-neutral-500 leading-body">
          Explore products by category and save the ones you want to research further.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              safetyScore={product.safety_score}
              category={product.category}
              description={product.description}
              action={
                <Button
                  label={savedProducts[product.id] ? 'Saved to List' : 'Save to List'}
                  variant={savedProducts[product.id] ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => onToggleSave(product)}
                />
              }
            />
          ))}
        </div>
      )}
    </main>
  )
}
