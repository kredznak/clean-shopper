import Button from '../../components/Button'

export default function HeroSection({ onScrollToGrid }) {
  return (
    <section className="relative overflow-hidden bg-surface-page">

      {/* Grain texture */}
      <div
        className="absolute inset-0 bg-grain opacity-[0.07] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-wide mx-auto px-8 py-16 flex flex-col md:flex-row items-center gap-12">

        {/* Text block */}
        <div className="flex-1 flex flex-col gap-6">
          <p className="text-caption font-medium text-primary uppercase tracking-caps">
            AI-Powered Ingredient Research
          </p>

          <h1 className="text-display font-brygada font-regular text-neutral-800 leading-display tracking-display">
            A healthy home can change your life.
          </h1>

          <p className="text-body font-regular text-neutral-600 leading-body max-w-[460px]">
            Know exactly what's in every product you bring home. Search thousands of personal care and cleaning brands, get AI ingredient analysis, and shop with confidence.
          </p>

          <div>
            <Button
              label="Browse Products"
              variant="primary"
              size="md"
              onClick={onScrollToGrid}
            />
          </div>
        </div>

        {/* Painting */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <img
            src="/cs-illustration3.png"
            alt="Sunlit flowers on a wooden table"
            className="w-[520px] max-w-full h-auto rounded-xl object-cover shadow-md"
          />
        </div>

      </div>
    </section>
  )
}
