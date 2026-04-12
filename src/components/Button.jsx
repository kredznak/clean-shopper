export default function Button({
  label,
  variant = 'primary',
  onClick,
  type = 'button',
  isLoading = false,
  disabled = false,
  size = 'md',
}) {
  const base =
    'text-small font-medium leading-small rounded-md transition-colors duration-fast ease-default disabled:opacity-50 disabled:cursor-not-allowed'

  const sizes = {
    sm: 'px-4 py-2',
    md: 'px-6 py-3',
  }

  const variants = {
    primary:
      'bg-primary text-surface-card hover:bg-primary-light active:bg-primary-dark',
    secondary:
      'bg-transparent text-primary border border-primary hover:bg-primary/10 active:bg-primary/20',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        label
      )}
    </button>
  )
}
