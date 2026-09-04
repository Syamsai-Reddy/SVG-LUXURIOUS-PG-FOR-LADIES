import { verifyPassword, createSessionToken, sessionCookieHeader } from '../_lib/auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_SESSION_SECRET } = process.env
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !ADMIN_SESSION_SECRET) {
    console.error('Admin login is not configured — missing environment variables.')
    return res.status(503).json({
      ok: false,
      error: 'Admin login is not configured yet. ADMIN_EMAIL, ADMIN_PASSWORD_HASH and ADMIN_SESSION_SECRET need to be set.',
    })
  }

  const { email, password } = req.body || {}
  const emailOk = typeof email === 'string' && email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase()
  const passwordOk = typeof password === 'string' && verifyPassword(password, ADMIN_PASSWORD_HASH)

  if (!emailOk || !passwordOk) {
    return res.status(401).json({ ok: false, error: 'Invalid email or password' })
  }

  const token = createSessionToken(ADMIN_SESSION_SECRET)
  res.setHeader('Set-Cookie', sessionCookieHeader(token))
  return res.status(200).json({ ok: true })
}
