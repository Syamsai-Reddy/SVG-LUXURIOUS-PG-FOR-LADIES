import { isAuthenticated } from '../_lib/auth.js'
import { listEnquiries } from '../_lib/store.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const { ADMIN_SESSION_SECRET } = process.env
  if (!ADMIN_SESSION_SECRET || !isAuthenticated(req, ADMIN_SESSION_SECRET)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }

  try {
    const enquiries = await listEnquiries()
    return res.status(200).json({ ok: true, enquiries })
  } catch (err) {
    console.error('Failed to load enquiries from storage:', err)
    return res.status(502).json({ ok: false, error: 'Could not load enquiries right now.' })
  }
}
