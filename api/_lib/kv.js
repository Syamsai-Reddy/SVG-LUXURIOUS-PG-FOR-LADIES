// Redis client for the enquiry store. Built directly on @upstash/redis
// (rather than @vercel/kv) so it can accept whichever environment variable
// names actually end up in the project — Vercel's storage integrations have
// used a couple of different naming conventions over time:
//   KV_REST_API_URL       + KV_REST_API_TOKEN        (classic Vercel KV)
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (Upstash marketplace integration)
import { Redis } from '@upstash/redis'

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

export const kv = url && token ? new Redis({ url, token }) : null
