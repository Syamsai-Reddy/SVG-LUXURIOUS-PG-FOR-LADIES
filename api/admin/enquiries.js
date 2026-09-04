import { isAuthenticated } from '../_lib/auth.js'
import { listEnquiries, deleteEnquiry } from '../_lib/store.js'

export default async function handler(req, res) {
  const { ADMIN_SESSION_SECRET } = process.env
  if (!ADMIN_SESSION_SECRET || !isAuthenticated(req, ADMIN_SESSION_SECRET)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      const enquiries = await listEnquiries()
      return res.status(200).json({ ok: true, enquiries })
    } catch (err) {
      console.error('Failed to load enquiries from storage:', err)
      return res.status(502).json({ ok: false, error: 'Could not load enquiries right now.' })
    }
  }

  if (req.method === 'DELETE') {
    const id = req.query?.id
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ ok: false, error: 'Missing enquiry id' })
    }
    try {
      await deleteEnquiry(id)
      return res.status(200).json({ ok: true })
    } catch (err) {
      console.error('Failed to delete enquiry:', err)
      return res.status(502).json({ ok: false, error: 'Could not delete this enquiry right now.' })
    }
  }

  res.setHeader('Allow', 'GET, DELETE')
  return res.status(405).json({ ok: false, error: 'Method not allowed' })
}
