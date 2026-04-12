const VARIANTS = {
  clean: {
    label: 'Clean',
    className: 'bg-primary/10 text-primary-dark',
  },
  caution: {
    label: 'Caution',
    className: 'bg-warning/10 text-warning',
  },
  avoid: {
    label: 'Avoid',
    className: 'bg-error/10 text-error',
  },
}

export default function SafetyBadge({ score }) {
  const variant = VARIANTS[score] ?? VARIANTS.caution

  return (
    <span
      className={`
        shrink-0
        text-caption font-medium leading-caption tracking-caps
        uppercase
        px-2 py-1
        rounded-sm
        ${variant.className}
      `}
    >
      {variant.label}
    </span>
  )
}
