// Thin re-export so storage/auth code can be unit-tested by mocking this
// one module instead of reaching into @vercel/kv directly.
export { kv } from '@vercel/kv'
