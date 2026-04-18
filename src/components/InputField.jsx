export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  helperText,
  errorText,
  disabled = false,
  type = 'text',
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-small font-medium text-neutral-700 leading-small">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full bg-neutral-200 text-body font-regular text-neutral-800 leading-body
          rounded-md px-4 py-3 border
          placeholder:text-neutral-400
          outline-none transition-colors duration-fast ease-default
          focus:border-primary focus:bg-surface-card
          disabled:opacity-50 disabled:cursor-not-allowed
          ${errorText ? 'border-error' : 'border-neutral-200'}
        `}
      />
      {errorText && (
        <p className="text-small text-error leading-small">{errorText}</p>
      )}
      {!errorText && helperText && (
        <p className="text-small text-neutral-500 leading-small">{helperText}</p>
      )}
    </div>
  )
}
