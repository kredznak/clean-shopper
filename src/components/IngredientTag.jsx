import SafetyBadge from './SafetyBadge'

export default function IngredientTag({ name, score, explanation }) {
  return (
    <div className="flex flex-col gap-1 p-4 bg-surface-card rounded-md border border-neutral-200">
      <div className="flex items-center justify-between gap-4">
        <span className="text-small font-medium text-neutral-800 leading-small">{name}</span>
        <SafetyBadge score={score} />
      </div>
      {explanation && (
        <p className="text-caption font-regular text-neutral-500 leading-caption">{explanation}</p>
      )}
    </div>
  )
}
