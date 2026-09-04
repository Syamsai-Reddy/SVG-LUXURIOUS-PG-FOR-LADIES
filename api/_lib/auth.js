import { randomBytes, scryptSync, timingSafeEqual, createHmac } from 'node:crypto'

const SESSION_COOKIE = 'admin_session'
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password, storedHash) {
  if (!storedHash || !storedHash.includes(':')) return false
  const [salt, hash] = storedHash.split(':')
  const candidate = scryptSync(password, salt, 64)
  const expected = Buffer.from(hash, 'hex')
  if (candidate.length !== expected.length) return false
  return timingSafeEqual(candidate, expected)
}

function sign(value, secret) {
  return createHmac('sha256', secret).update(value).digest('hex')
}

export function createSessionToken(secret) {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })).toString('base64url')
  return `${payload}.${sign(payload, secret)}`
}

export function verifySessionToken(token, secret) {
  if (!token || !token.includes('.')) return false
  const [payload, signature] = token.split('.')
  const expected = sign(payload, secret)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return typeof exp === 'number' && exp > Date.now()
  } catch {
    return false
  }
}

export function parseCookies(cookieHeader) {
  const out = {}
  if (!cookieHeader) return out
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim())
  }
  return out
}

export function sessionCookieHeader(token) {
  const maxAge = Math.floor(SESSION_TTL_MS / 1000)
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}`
}

export function clearSessionCookieHeader() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
}

export function isAuthenticated(req, secret) {
  const cookies = parseCookies(req.headers.cookie)
  return verifySessionToken(cookies[SESSION_COOKIE], secret)
}

export { SESSION_COOKIE }
