# SVG Luxurious PG for Ladies

Premium, public-facing website for **SVG Luxurious PG for Ladies** — a women-only PG residence near PES College, Banashankari, Bengaluru.

Built with React + Vite + Tailwind CSS, with a central content config, WhatsApp/call quick-contact links, an enquiry form backed by an admin panel, and a lightbox gallery.

## Stack

- React 18 + Vite 6
- Tailwind CSS
- Framer Motion (animations)
- lucide-react (icons)
- Vercel serverless functions (`/api`) + Vercel KV for storage

## Enquiry form → Admin panel

The enquiry form (`src/components/Enquire.jsx`) posts validated submissions to `/api/enquiry`
(`api/enquiry.js`), which stores them in Vercel KV for the admin dashboard at `/admin` — no
WhatsApp message is sent automatically. The owner reviews and (optionally) contacts enquirers
directly from the panel; the site's separate "WhatsApp Us" / "Call Now" buttons elsewhere are
unrelated quick-contact links and still work as before.

See `api/README` notes below for what the admin panel itself requires.

### Admin panel (`/admin`)

Login-protected dashboard showing every enquiry, newest first, with a delete option per entry
and automatic removal after 30 days. Requires these environment variables in the hosting
project's settings (Vercel → Project → Settings → Environment Variables), **never committed
to the repo**:

| Variable | Where to get it |
|---|---|
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | Auto-added when you connect a Vercel KV database to this project (Vercel → Storage → Create Database → KV) |
| `ADMIN_EMAIL` | The admin login email |
| `ADMIN_PASSWORD_HASH` | A scrypt hash (`salt:hash`) — never store the plaintext password anywhere |
| `ADMIN_SESSION_SECRET` | A random secret used to sign session cookies |

Until the KV database is connected, `/api/enquiry` and `/admin` return a clear storage error
instead of silently failing or faking success.

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
