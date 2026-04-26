import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import SearchBar from '../../components/SearchBar'
import ProductCard from '../../components/ProductCard'
import EmptyState from '../../components/EmptyState'
import Button from '../../components/Button'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [saved, setSaved] = useState({})

  async function handleSearch() {
    const trimmed = query.trim()
    if (!trimmed) return

    setLoading(true)
    setHasSearched(true)

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .or(
        `name.ilike.%${trimmed}%,brand.ilike.%${trimmed}%,description.ilike.%${trimmed}%`
      )
      .order('id', { ascending: true })

    setLoading(false)

    if (!error) {
      setResults(data)
    }
  }

  function toggleSave(id) {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="px-25 py-12">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-h1 font-regular text-neutral-800 leading-heading tracking-heading">
          Search Products
        </h1>
        <p className="text-body font-regular text-neutral-500 leading-body">
          Search by product name, brand, or ingredient concern to see safety scores.
        </p>
      </div>

      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearch}
        placeholder='Try "soap", "fragrance free", or "Branch Basics"'
        isLoading={loading}
      />

      <div className="mt-10">
        {!hasSearched && (
          <EmptyState
            heading="Start your search"
            body="Type a product name, brand, or keyword above and press Search to see safety scores."
          />
        )}

        {hasSearched && !loading && results.length === 0 && (
          <EmptyState
            heading="No results found"
            body={`No products matched "${query}". Try a different keyword or brand name.`}
          />
        )}

        {!loading && results.length > 0 && (
          <>
            <p className="text-small font-medium text-neutral-500 leading-small mb-6">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  safetyScore={product.safety_score}
                  category={product.category}
                  description={product.description}
                  action={
                    <Button
                      label={saved[product.id] ? 'Saved to List' : 'Save to List'}
                      variant={saved[product.id] ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => toggleSave(product.id)}
                    />
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
