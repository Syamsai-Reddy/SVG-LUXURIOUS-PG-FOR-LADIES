import { randomUUID } from 'node:crypto'
import { kv as defaultKv } from './kv.js'

const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60
const INDEX_KEY = 'enquiries:index'

function requireKv(kvClient) {
  if (!kvClient) {
    throw new Error(
      'Redis is not configured — set KV_REST_API_URL/KV_REST_API_TOKEN or UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN'
    )
  }
  return kvClient
}

// kvClient is injectable purely so this logic can be unit-tested against an
// in-memory fake instead of a real Redis connection; real callers never pass it.
export async function saveEnquiry(form, kvClient = defaultKv) {
  kvClient = requireKv(kvClient)
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
  kvClient = requireKv(kvClient)
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
  kvClient = requireKv(kvClient)
  await kvClient.del(`enquiry:${id}`)
  await kvClient.zrem(INDEX_KEY, id)
}
