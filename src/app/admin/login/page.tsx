'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Login failed')
        return
      }

      router.push('/admin')
      router.refresh()
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-da-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-2xl font-semibold text-da-text mb-1">
            Albert Łukasik
          </h1>
          <p className="text-da-text-muted text-sm">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="da-card p-8">
          <h2 className="font-serif text-lg text-da-text mb-6">Sign in</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-950/40 border border-red-900/40 rounded-lg px-4 py-3">
                <p className="text-da-error text-sm">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-da-text-muted mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-da-text-muted mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full mt-2"
              size="lg"
            >
              Sign in
            </Button>
          </form>
        </div>

        <p className="text-center mt-6">
          <a href="/" className="text-xs text-da-text-muted hover:text-da-text transition-colors">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  )
}
