export default function HeroSection() {
  return (
    <section className="bg-white w-full rounded-b-xl">
      <div className="px-25 py-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-display font-regular font-brygada text-neutral-800 leading-display tracking-display">
            A healthy home can change your life.
          </h1>
          <p className="text-body font-regular text-neutral-500 leading-body max-w-content">
            Clean Shopper is an AI-powered agent that helps users discover home and pantry products that are clean, non-toxic, and environmentally friendly.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center justify-center">
          <img
            src="/cs-illustration6.png"
            alt="Clean Shopper illustration"
            className="object-contain w-[600px] h-[353px]"
          />
        </div>
      </div>
    </section>
  )
}
