import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import EmptyState from '../../components/EmptyState'

export default function MyListPage({ savedProducts, onToggleSave, onNavigateToBrowse }) {
  const products = Object.values(savedProducts)

  return (
    <main className="max-w-wide mx-auto px-25 py-12">
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="text-h1 font-regular text-neutral-800 leading-heading tracking-heading">
          My List
        </h1>
        <p className="text-body font-regular text-neutral-500 leading-body">
          Products you've saved for research. Remove any item by clicking the button on its card.
        </p>
      </div>

      {products.length === 0 ? (
        <EmptyState
          heading="Your list is empty"
          body="Save products from Browse to start building your list."
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
              action={
                <Button
                  label="Remove from List"
                  variant="secondary"
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
