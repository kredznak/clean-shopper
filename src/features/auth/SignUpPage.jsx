import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import InputField from '../../components/InputField'
import Button from '../../components/Button'

export default function SignUpPage({ onNavigateToSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-surface-page flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-content text-center">
          <span className="text-h4 font-semibold text-primary leading-heading">
            Clean Shopper
          </span>
          <div className="bg-surface-card rounded-lg shadow-md border border-neutral-200 p-8 mt-10">
            <h2 className="text-h3 font-semibold text-neutral-800 leading-subheading mb-2">
              Check your email
            </h2>
            <p className="text-body font-regular text-neutral-500 leading-body">
              We sent a confirmation link to <strong className="text-neutral-800">{email}</strong>.
              Click it to activate your account, then sign in.
            </p>
            <div className="mt-6">
              <Button
                label="Back to sign in"
                variant="secondary"
                onClick={onNavigateToSignIn}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-page flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-content">

        <div className="text-center mb-10">
          <span className="text-h4 font-semibold text-primary leading-heading">
            Clean Shopper
          </span>
          <h1 className="text-h2 font-semibold text-neutral-800 leading-heading tracking-heading mt-2">
            Create your account
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
              placeholder="Create a password"
              helperText="Use at least 6 characters."
              errorText={error ?? undefined}
            />
            <Button
              label={loading ? 'Creating account…' : 'Create account'}
              type="submit"
              isLoading={loading}
              disabled={loading}
            />
          </form>
        </div>

        <p className="text-center text-small text-neutral-500 leading-small mt-6">
          Already have an account?{' '}
          <button
            onClick={onNavigateToSignIn}
            className="text-primary font-medium hover:text-primary-dark transition-colors duration-fast ease-default"
          >
            Sign in
          </button>
        </p>

      </div>
    </div>
  )
}
