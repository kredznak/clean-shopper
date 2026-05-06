import SafetyBadge from './SafetyBadge'

export default function ProductCard({ name, safetyScore, score, category, description, imageUrl, onClick, action, isSaved, onToggleSave }) {
  return (
    <article
      onClick={onClick}
      className={`
        bg-surface-card
        rounded-lg shadow-sm border border-neutral-200
        overflow-hidden
        flex flex-col
        transition-shadow duration-fast ease-default
        hover:shadow-md
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        ${onClick ? 'cursor-pointer' : ''}
      `}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Product image with heart button */}
      <div className="relative w-full h-48 bg-white shrink-0 pt-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain block"
          />
        ) : null}
        {onToggleSave && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave() }}
            aria-label={isSaved ? 'Remove from favorites' : 'Save to favorites'}
            className="absolute top-2 right-2 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 hover:bg-white transition-colors duration-fast ease-default"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isSaved ? 'text-error' : 'text-neutral-400'} aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        )}
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        {/* Product name */}
        <h3 className="text-h3 font-semibold text-neutral-800 leading-subheading tracking-heading">
          {name}
        </h3>

        {/* Safety badge + category row */}
        <div className="flex items-center gap-2 flex-wrap">
          <SafetyBadge score={safetyScore} />
          <span className="text-small font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full leading-small">
            {category}
          </span>
          {score != null && (
            <span className="text-caption font-medium text-neutral-400 leading-caption">
              EWG{' '}
              <span className="font-mono text-neutral-600">{score}</span>
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-body font-regular text-neutral-600 leading-body mt-1 line-clamp-2">
          {description}
        </p>

        {action && (
          <div className="mt-2 pt-4 border-t border-neutral-100">
            {action}
          </div>
        )}
      </div>
    </article>
  )
}
