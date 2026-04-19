export default function CategoryTag({ label, selected = false, onClick }) {
  if (!onClick) {
    return (
      <span className="text-small font-medium text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full leading-small">
        {label}
      </span>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`
        text-small font-medium px-3 py-1 rounded-full leading-small
        transition-colors duration-fast ease-default
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
        ${selected
          ? 'bg-primary/10 text-primary-dark ring-1 ring-primary'
          : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-600'
        }
      `}
    >
      {label}
    </button>
  )
}
