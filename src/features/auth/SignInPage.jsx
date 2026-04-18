import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

export default function SignInPage({ onNavigateToSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)
    if (error) setError(error.message)
  }

  return (
    <div className="min-h-screen bg-surface-page flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-content">

        <div className="text-center mb-10">
          <span className="text-h4 font-semibold text-primary leading-heading">
            Clean Shopper
          </span>
          <h1 className="text-h2 font-semibold text-neutral-800 leading-heading tracking-heading mt-2">
            Sign in to your account
          </h1>
        </div>

        <div className="bg-surface-card rounded-lg shadow-md border border-neutral-200 p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Your password"
              errorText={error ?? undefined}
            />
            <Button
              label={loading ? 'Signing in…' : 'Sign in'}
              type="submit"
              isLoading={loading}
              disabled={loading}
            />
          </form>
        </div>

        <p className="text-center text-small text-neutral-500 leading-small mt-6">
          Don't have an account?{' '}
          <button
            onClick={onNavigateToSignUp}
            className="text-primary font-medium hover:text-primary-dark transition-colors duration-fast ease-default"
          >
            Sign up
          </button>
        </p>

      </div>
    </div>
  )
}
