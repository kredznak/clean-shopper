import Button from './Button'

export default function EmptyState({ heading, body, action }) {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-16 px-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-h4 font-semibold text-neutral-700 leading-subheading">
          {heading}
        </p>
        <p className="text-body font-regular text-neutral-500 leading-body max-w-content">
          {body}
        </p>
      </div>
      {action && (
        <Button
          variant="primary"
          label={action.label}
          onClick={action.onClick}
          size="sm"
        />
      )}
    </div>
  )
}
