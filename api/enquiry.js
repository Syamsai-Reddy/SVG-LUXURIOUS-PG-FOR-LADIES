// Serverless function (Vercel) — receives enquiry form submissions and sends
// them to the owner's WhatsApp automatically via the WhatsApp Business Cloud
// API. Runs server-side only, so the access token never reaches the browser.
//
// Requires these environment variables to be set in the Vercel project
// (Project Settings -> Environment Variables), NOT committed to the repo:
//   WHATSAPP_ACCESS_TOKEN     permanent System User token from Meta Business Manager
//   WHATSAPP_PHONE_NUMBER_ID  the Cloud API "Phone Number ID" (not the phone number itself)
//   WHATSAPP_OWNER_NUMBER     owner's WhatsApp number in international format, e.g. 917396838373
// Optional:
//   WHATSAPP_API_VERSION      Graph API version, defaults to v21.0

import { validateEnquiry, buildEnquiryMessage } from '../src/utils/enquiry.js'
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

  // Store for the admin panel regardless of whether the WhatsApp ping below
  // succeeds — the panel is the durable record, WhatsApp is a best-effort
  // instant notification on top of it. A storage hiccup here shouldn't
  // change the response the customer already gets from the WhatsApp step.
  try {
    await saveEnquiry(form)
  } catch (err) {
    console.error('Failed to save enquiry for the admin panel:', err)
  }

  const { WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_OWNER_NUMBER } = process.env
  if (!WHATSAPP_ACCESS_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_OWNER_NUMBER) {
    console.error('WhatsApp Cloud API is not configured — missing environment variables.')
    return res.status(503).json({
      ok: false,
      error:
        'WhatsApp sending is not configured on the server yet. The owner needs to add WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_OWNER_NUMBER in the hosting project settings.',
    })
  }

  const apiVersion = process.env.WHATSAPP_API_VERSION || 'v21.0'
  const message = buildEnquiryMessage(form)

  try {
    const metaRes = await fetch(
      `https://graph.facebook.com/${apiVersion}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: WHATSAPP_OWNER_NUMBER,
          type: 'text',
          text: { body: message },
        }),
      }
    )

    const metaData = await metaRes.json().catch(() => ({}))

    if (!metaRes.ok) {
      console.error('WhatsApp Cloud API error:', metaData)
      return res.status(502).json({
        ok: false,
        error: 'The enquiry could not be delivered to WhatsApp. Please try WhatsApp or call directly.',
      })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to reach WhatsApp Cloud API:', err)
    return res.status(502).json({
      ok: false,
      error: 'The enquiry could not be delivered right now. Please try WhatsApp or call directly.',
    })
  }
}
