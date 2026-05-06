import { useRef } from 'react'

const SLIDES = [
  {
    id: 1,
    type: 'quote',
    quote: "Switching to cleaner products felt overwhelming — until I found Clean Shopper. Now I know exactly what I'm bringing into my home.",
    author: "Sarah M.",
    location: "Austin, TX",
  },
  {
    id: 2,
    type: 'customer',
    initials: "JR",
    avatarBg: "bg-primary/20",
    name: "Jessica R.",
    title: "Mom of 3",
    quote: "Finally an app that explains ingredients instead of just giving a score.",
  },
  {
    id: 3,
    type: 'highlight',
    label: "Community Favorite",
    productName: "Pure Castile Liquid Soap",
    detail: "Rated clean by 94% of our community",
  },
  {
    id: 4,
    type: 'quote',
    quote: "As a mom of two, knowing which products are truly safe — not just marketed as 'natural' — has been life-changing.",
    author: "Amanda K.",
    location: "Portland, OR",
  },
  {
    id: 5,
    type: 'customer',
    initials: "DL",
    avatarBg: "bg-accent/20",
    name: "David L.",
    title: "Health-conscious dad",
    quote: "It's like having a toxicologist in your pocket.",
  },
  {
    id: 6,
    type: 'highlight',
    label: "Top Rated",
    productName: "Sensitive Skin Facial Cleanser",
    detail: "EWG Verified · Fragrance-free",
  },
  {
    id: 7,
    type: 'quote',
    quote: "I had no idea how many hidden ingredients were in my cleaning products. Clean Shopper opened my eyes.",
    author: "Maya T.",
    location: "Denver, CO",
  },
  {
    id: 8,
    type: 'customer',
    initials: "RN",
    avatarBg: "bg-warning/20",
    name: "Rachel N.",
    title: "Registered Nurse",
    quote: "I recommend this to every patient who asks about making safer choices at home.",
  },
]

function QuoteCard({ quote, author, location }) {
  return (
    <div className="min-w-72 w-72 h-80 bg-surface-card rounded-xl shadow-sm border border-neutral-200 p-8 flex flex-col justify-between snap-start shrink-0">
      <div>
        <span className="text-h1 font-semibold text-primary leading-none select-none" aria-hidden="true">&ldquo;</span>
        <p className="text-body font-regular text-neutral-700 leading-body mt-2">{quote}</p>
      </div>
      <div className="pt-4 border-t border-neutral-200">
        <p className="text-small font-semibold text-neutral-800 leading-small">{author}</p>
        <p className="text-caption text-neutral-400 leading-caption">{location}</p>
      </div>
    </div>
  )
}

function CustomerCard({ initials, avatarBg, name, title, quote }) {
  return (
    <div className="min-w-72 w-72 h-80 bg-surface-card rounded-xl shadow-sm border border-neutral-200 p-8 flex flex-col items-center text-center justify-center gap-4 snap-start shrink-0">
      <div className={`w-16 h-16 rounded-full ${avatarBg} flex items-center justify-center shrink-0`}>
        <span className="text-h3 font-semibold text-neutral-700">{initials}</span>
      </div>
      <div>
        <p className="text-small font-semibold text-neutral-800 leading-small">{name}</p>
        <p className="text-caption text-neutral-500 leading-caption">{title}</p>
      </div>
      <p className="text-body font-regular text-neutral-600 leading-body">&ldquo;{quote}&rdquo;</p>
    </div>
  )
}

function HighlightCard({ label, productName, detail }) {
  return (
    <div className="min-w-72 w-72 h-80 bg-primary/10 rounded-xl p-8 flex flex-col items-center text-center justify-center gap-4 snap-start shrink-0">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 6C20 6 8 12 8 24C8 30.627 13.373 36 20 36C26.627 36 32 30.627 32 24C32 12 20 6 20 6Z" fill="#6B8F71" fillOpacity="0.3" stroke="#4A6B50" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M20 8L20 34" stroke="#4A6B50" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 18C20 18 14 22 14 28" stroke="#4A6B50" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M20 22C20 22 26 25 26 31" stroke="#4A6B50" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <p className="text-caption font-medium text-primary-dark uppercase tracking-caps">{label}</p>
      <p className="text-h3 font-semibold text-neutral-800 leading-subheading">{productName}</p>
      <p className="text-small font-regular text-neutral-500 leading-small">{detail}</p>
      <span className="text-caption font-medium text-primary-dark bg-primary/20 px-3 py-1 rounded-full">
        ✓ Clean
      </span>
    </div>
  )
}

const SCROLL_BY = 312

export default function TestimonialCarousel() {
  const scrollRef = useRef(null)

  function scroll(dir) {
    scrollRef.current?.scrollBy({ left: dir * SCROLL_BY, behavior: 'smooth' })
  }

  return (
    <section className="bg-neutral-100 py-16 overflow-hidden">
      <div className="px-25 flex items-end justify-between mb-10">
        <div>
          <p className="text-caption font-medium text-primary uppercase tracking-caps mb-2">Community</p>
          <h2 className="text-h1 font-regular text-neutral-800 leading-heading tracking-heading">
            From people who care<br />about what's in their home.
          </h2>
        </div>
        <div className="hidden sm:flex gap-3 mb-1">
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full bg-surface-card border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800 transition-colors duration-fast ease-default"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full bg-surface-card border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-neutral-200 hover:text-neutral-800 transition-colors duration-fast ease-default"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pl-25 pb-4 snap-x snap-mandatory no-scrollbar"
      >
        {SLIDES.map((slide) => {
          if (slide.type === 'quote') return <QuoteCard key={slide.id} {...slide} />
          if (slide.type === 'customer') return <CustomerCard key={slide.id} {...slide} />
          if (slide.type === 'highlight') return <HighlightCard key={slide.id} {...slide} />
          return null
        })}
        <div className="w-25 shrink-0" aria-hidden="true" />
      </div>
    </section>
  )
}
