import SafetyBadge from './SafetyBadge'

export default function ProductCard({ name, safetyScore, score, category, description, onClick, action }) {
  return (
    <article
      onClick={onClick}
      className={`
        bg-surface-card
        rounded-lg shadow-sm border border-neutral-200
        p-6
        flex flex-col gap-3
        transition-shadow duration-fast ease-default
        hover:shadow-md
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        ${onClick ? 'cursor-pointer' : ''}
      `}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {/* Header row: name + safety badge */}
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-h3 font-semibold text-neutral-800 leading-subheading tracking-heading">
          {name}
        </h3>
        <SafetyBadge score={safetyScore} />
      </div>

      {/* Category + numeric score row */}
      <div className="flex items-center gap-2">
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
      <p className="text-body font-regular text-neutral-600 leading-body mt-1">
        {description}
      </p>

      {action && (
        <div className="mt-2 pt-4 border-t border-neutral-100">
          {action}
        </div>
      )}
    </article>
  )
}
