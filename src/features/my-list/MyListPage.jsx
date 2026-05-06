import ProductCard from '../../components/ProductCard'
import EmptyState from '../../components/EmptyState'

export default function MyListPage({ savedProducts, onToggleSave, onNavigateToBrowse, onSelectProduct }) {
  const products = Object.values(savedProducts)

  return (
    <main className="px-25 py-12">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-h1 font-regular text-neutral-800 leading-heading tracking-heading">
          My Favorites
        </h1>
        <p className="text-body font-regular text-neutral-500 leading-body">
          Products you've saved. Tap the heart on any card to remove it.
        </p>
      </div>

      {products.length === 0 ? (
        <EmptyState
          heading="No favorites yet"
          body="Tap the heart on any product to save it here."
          action={{ label: 'Browse Products', onClick: onNavigateToBrowse }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              safetyScore={product.safety_score}
              category={product.category}
              description={product.description}
              imageUrl={product.image_url}
              isSaved={true}
              onToggleSave={() => onToggleSave(product)}
              onClick={() => onSelectProduct && onSelectProduct(product)}
            />
          ))}
        </div>
      )}
    </main>
  )
}
