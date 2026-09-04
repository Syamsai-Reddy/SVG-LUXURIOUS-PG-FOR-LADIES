import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, LogIn } from 'lucide-react'

export default function AdminLogin({ onLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        onLoggedIn()
      } else {
        setError(data.error || 'Invalid email or password')
      }
    } catch {
      setError('Could not reach the server.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <span className="font-serif text-3xl text-ivory">SVG</span>
          <p className="text-xs uppercase tracking-widest2 text-gold mt-2">Admin Panel</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-ivory/5 border border-ivory/10 rounded-2xl p-7 space-y-4"
        >
          <div>
            <label className="block text-xs uppercase tracking-widest2 text-ivory/45 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" size={16} />
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-ivory/15 bg-transparent pl-11 pr-4 py-3 text-sm text-ivory outline-none focus:border-gold transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest2 text-ivory/45 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-ivory/15 bg-transparent pl-11 pr-4 py-3 text-sm text-ivory outline-none focus:border-gold transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-xs text-rose-dark">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 bg-gold text-charcoal font-medium rounded-full px-6 py-3 text-sm transition-all hover:bg-gold-light disabled:opacity-60"
          >
            <LogIn size={16} /> {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
