import { useState, useEffect } from 'react'
import { analyzeIngredients } from '../../lib/api/claude'
import IngredientTag from '../../components/IngredientTag'
import SafetyBadge from '../../components/SafetyBadge'
import Button from '../../components/Button'
import CategoryTag from '../../components/CategoryTag'

export default function ProductDetailPage({ product, onBack }) {
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    analyzeIngredients(product)
      .then(setIngredients)
      .catch(() => setError('Could not load ingredient analysis. Please try again.'))
      .finally(() => setLoading(false))
  }, [product.id])

  return (
    <main className="max-w-content mx-auto px-8 py-12">
      {/* Back nav */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-small font-medium text-neutral-500 hover:text-neutral-800 transition-colors duration-fast ease-default mb-8"
      >
        <span aria-hidden="true">←</span> Back
      </button>

      {/* Product header */}
      <div className="flex flex-col gap-6 mb-10">
        {product.image_url && (
          <div className="w-full max-w-xs h-48 bg-white rounded-lg border border-neutral-200 flex items-center justify-center p-4">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-h1 font-regular text-neutral-800 leading-heading tracking-heading">
              {product.name}
            </h1>
            <SafetyBadge score={product.safety_score} />
          </div>

          {product.brand && (
            <p className="text-small font-medium text-neutral-500 leading-small">{product.brand}</p>
          )}

          <CategoryTag label={product.category} />

          <p className="text-body font-regular text-neutral-600 leading-body max-w-content">
            {product.description}
          </p>
        </div>
      </div>

      {/* Ingredient analysis */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-h2 font-semibold text-neutral-800">Ingredient Analysis</h2>
          <p className="text-small font-regular text-neutral-500 leading-small">
            AI-generated breakdown based on typical ingredients for this product type.
          </p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <span className="text-body text-neutral-400">Analyzing ingredients…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center py-16">
            <span className="text-body text-error">{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="flex flex-col gap-3">
            {ingredients.map((ing, i) => (
              <IngredientTag
                key={i}
                name={ing.name}
                score={ing.score}
                explanation={ing.explanation}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
