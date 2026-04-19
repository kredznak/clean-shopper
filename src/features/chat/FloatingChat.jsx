import { useState, useEffect, useRef } from 'react'
import ChatBubble from '../../components/ChatBubble'
import { fetchProducts, sendChatMessage } from '../../lib/api/claude'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm your Clean Shopper advisor. Ask me about product safety, specific ingredients, or tell me what you're looking for and I'll recommend options from our catalog.",
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    fetchProducts().then(setProducts).catch(() => {})
  }, [])

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [open, messages, isLoading])

  async function handleSubmit(e) {
    e?.preventDefault()
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage = { role: 'user', content: text }
    const updatedHistory = [...messages, userMessage]

    setMessages(updatedHistory)
    setInput('')
    setIsLoading(true)
    setError(null)

    try {
      const reply = await sendChatMessage(updatedHistory, products)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('Chat error:', err)
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Chat panel */}
      {open && (
        <div className="w-96 h-[520px] bg-surface-page border border-neutral-200 rounded-xl shadow-lg flex flex-col overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-surface-card border-b border-neutral-200">
            <div>
              <p className="text-h4 font-semibold text-neutral-800 leading-subheading">Ask AI</p>
              <p className="text-caption font-medium text-neutral-500 leading-caption">Product safety advisor</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-neutral-400 hover:text-neutral-700 transition-colors duration-fast ease-default p-1 rounded-md"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Message thread */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <ChatBubble key={i} role={msg.role} content={msg.content} />
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface-card border border-neutral-200 shadow-sm rounded-lg px-3 py-2">
                  <span className="text-small text-neutral-400">Thinking…</span>
                </div>
              </div>
            )}

            {error && (
              <p className="text-caption text-error text-center">{error}</p>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-neutral-200 bg-surface-card">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-surface-page border border-neutral-200 rounded-md px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask about a product or ingredient…"
                className="flex-1 text-small font-regular text-neutral-800 leading-body placeholder:text-neutral-400 bg-transparent outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="shrink-0 bg-primary text-surface-card rounded-md p-1.5 transition-colors duration-fast ease-default disabled:opacity-40 hover:bg-primary-light"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Close chat' : 'Open AI advisor'}
        className="flex items-center gap-2 bg-primary text-surface-card shadow-md rounded-full pl-4 pr-5 h-14 transition-colors duration-fast ease-default hover:bg-primary-light"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
            <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H7l-4 3V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
        <span className="text-small font-medium leading-small">
          {open ? 'Close' : 'Ask a question'}
        </span>
      </button>
    </div>
  )
}
