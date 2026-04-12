import { useState } from 'react'
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'

const PRODUCTS = [
  {
    id: 1,
    name: "Dr. Bronner's Pure Castile Soap",
    safetyScore: 'clean',
    category: 'Personal Care',
    description:
      'Organic, fair-trade certified with no synthetic preservatives or detergents. Safe for skin and household use.',
  },
  {
    id: 2,
    name: 'Neutrogena Hydro Boost Gel',
    safetyScore: 'caution',
    category: 'Personal Care',
    description:
      'Hyaluronic acid formula for deep hydration. Contains a few synthetic fragrance ingredients worth reviewing for sensitive skin.',
  },
  {
    id: 3,
    name: 'Branch Basics Concentrate',
    safetyScore: 'clean',
    category: 'Home Cleaning',
    description:
      'Plant- and mineral-based concentrate free from synthetic fragrances, dyes, and preservatives. Works as an all-purpose cleaner.',
  },
  {
    id: 4,
    name: 'Lysol Disinfecting Spray',
    safetyScore: 'avoid',
    category: 'Home Cleaning',
    description:
      'Contains quaternary ammonium compounds and synthetic fragrance linked to respiratory irritation. Safer alternatives available.',
  },
  {
    id: 5,
    name: "Burt's Bees Baby Lotion",
    safetyScore: 'clean',
    category: 'Baby Care',
    description:
      'Fragrance-free formula with shea butter and vitamin E. Pediatrician-tested and free from parabens and phthalates.',
  },
  {
    id: 6,
    name: 'Johnson\'s Baby Powder',
    safetyScore: 'avoid',
    category: 'Baby Care',
    description:
      'Talc-based formula with ongoing safety concerns around respiratory risk. Cornstarch alternatives are recommended for infants.',
  },
]

export default function BrowsePage() {
  const [saved, setSaved] = useState({})

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            safetyScore={product.safetyScore}
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
    </main>
  )
}
