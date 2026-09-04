// Serverless function (Vercel) — receives enquiry form submissions, validates
// them, and stores them for the admin panel at /admin. No WhatsApp API call
// here; the owner reviews enquiries directly in the panel.

import { validateEnquiry } from '../src/utils/enquiry.js'
import { saveEnquiry } from './_lib/store.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const form = req.body || {}
  const errors = validateEnquiry(form)
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, error: 'Invalid enquiry details', fieldErrors: errors })
  }

  try {
    await saveEnquiry(form)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to save enquiry:', err)
    return res.status(502).json({
      ok: false,
      error: 'We could not save your enquiry right now. Please WhatsApp or call us directly.',
    })
  }
}
