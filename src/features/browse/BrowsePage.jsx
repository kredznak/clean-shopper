import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'

export default function BrowsePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saved, setSaved] = useState({})

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

  function toggleSave(id) {
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <main className="max-w-wide mx-auto px-8 py-12">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-h1 font-regular text-neutral-800 leading-heading tracking-heading">
          Browse Products
        </h1>
        <p className="text-body font-regular text-neutral-500 leading-body">
          Explore products by category and save the ones you want to research further.
        </p>
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
          {products.map((product) => (
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
      )}
    </main>
  )
}
