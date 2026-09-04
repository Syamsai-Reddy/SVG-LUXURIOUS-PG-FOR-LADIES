# SVG Luxurious PG for Ladies

Premium, public-facing website for **SVG Luxurious PG for Ladies** — a women-only PG residence near PES College, Banashankari, Bengaluru.

Built with React + Vite + Tailwind CSS, with a central content config, WhatsApp/call integrations, an enquiry form that sends straight to the owner's WhatsApp via the Cloud API, and a lightbox gallery.

## Stack

- React 18 + Vite 6
- Tailwind CSS
- Framer Motion (animations)
- lucide-react (icons)
- `/api/enquiry` — Vercel serverless function (WhatsApp Cloud API)

## Enquiry form → WhatsApp

The enquiry form (`src/components/Enquire.jsx`) posts validated submissions to `/api/enquiry`
(`api/enquiry.js`), which sends the enquiry straight to the owner's WhatsApp via Meta's
WhatsApp Business Cloud API — no OTP, no manual "press Send" step for the customer.

This requires the following environment variables, set in the hosting project's settings
(Vercel → Project → Settings → Environment Variables), **never committed to the repo**:

| Variable | Where to get it |
|---|---|
| `WHATSAPP_ACCESS_TOKEN` | Permanent token from a System User in Meta Business Manager |
| `WHATSAPP_PHONE_NUMBER_ID` | "Phone Number ID" from the WhatsApp Cloud API setup (not the phone number itself) |
| `WHATSAPP_OWNER_NUMBER` | Owner's WhatsApp number in international format, e.g. `917396838373` |
| `WHATSAPP_API_VERSION` | Optional, defaults to `v21.0` |

Until these are configured, `/api/enquiry` returns a clear "not configured" error instead of
silently failing or faking success — the frontend surfaces that error to the customer with a
prompt to WhatsApp or call directly.

Note: outside a 24-hour window since the owner last messaged the WhatsApp Business number,
Meta may require the notification to use a pre-approved message **template** instead of a
free-form text message — see the WhatsApp Cloud API docs on message templates if enquiries
stop delivering after the integration has been idle.

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Content

All site content (contact details, rooms, amenities, testimonials, FAQs) lives in [src/data/config.js](src/data/config.js) — update values there without touching component code. Anything wrapped in `[BRACKETS]` is a placeholder still awaiting real information.
