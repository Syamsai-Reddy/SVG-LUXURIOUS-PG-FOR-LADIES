import { randomUUID } from 'node:crypto'
import { kv as defaultKv } from './kv.js'

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60
const INDEX_KEY = 'enquiries:index'

// kvClient is injectable purely so this logic can be unit-tested against an
// in-memory fake instead of a real Redis connection; real callers never pass it.
export async function saveEnquiry(form, kvClient = defaultKv) {
  const id = randomUUID()
  const receivedAt = Date.now()
  const entry = { id, receivedAt, ...form }

  await kvClient.set(`enquiry:${id}`, entry, { ex: THIRTY_DAYS_SECONDS })
  await kvClient.zadd(INDEX_KEY, { score: receivedAt, member: id })

  return entry
}

// Newest first. Individual enquiry records expire on their own (30-day TTL);
// this also prunes any index entries left pointing at an already-expired
// record, so the sorted set never grows unbounded.
export async function listEnquiries(kvClient = defaultKv) {
  const ids = await kvClient.zrange(INDEX_KEY, 0, -1, { rev: true })
  if (!ids || ids.length === 0) return []

  const entries = await Promise.all(
    ids.map(async (id) => {
      const value = await kvClient.get(`enquiry:${id}`)
      if (value == null) {
        await kvClient.zrem(INDEX_KEY, id)
        return null
      }
      return value
    })
  )

  return entries.filter(Boolean)
}

export async function deleteEnquiry(id, kvClient = defaultKv) {
  await kvClient.del(`enquiry:${id}`)
  await kvClient.zrem(INDEX_KEY, id)
}
