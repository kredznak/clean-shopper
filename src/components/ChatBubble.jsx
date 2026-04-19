export default function ChatBubble({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`
          max-w-[80%] rounded-lg px-4 py-3 text-body font-regular leading-body
          ${isUser
            ? 'bg-primary/10 text-neutral-800'
            : 'bg-surface-card border border-neutral-200 shadow-sm text-neutral-800'
          }
        `}
      >
        {content}
      </div>
    </div>
  )
}
