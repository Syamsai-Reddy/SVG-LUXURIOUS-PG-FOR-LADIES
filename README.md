# SVG Luxurious PG for Ladies

Premium, public-facing website for **SVG Luxurious PG for Ladies** — a women-only PG residence near PES College, Banashankari, Bengaluru.

Built with React + Vite + Tailwind CSS, with a central content config, WhatsApp/call quick-contact links, an enquiry form that opens a pre-filled WhatsApp message, and a lightbox gallery.

## Stack

- React 18 + Vite 6
- Tailwind CSS
- Framer Motion (animations)
- lucide-react (icons)

No backend, no database — everything runs client-side.

## Enquiry form → WhatsApp

The enquiry form (`src/components/Enquire.jsx`) validates the customer's details entirely in
the browser (`src/utils/enquiry.js`), then opens `wa.me` with a pre-filled message built from
the real submitted values, addressed to the owner's WhatsApp number in
[src/data/config.js](src/data/config.js). The customer still has to tap Send in WhatsApp
themselves — nothing is sent automatically. The site's other "WhatsApp Us" / "Call Now"
buttons elsewhere use the same `waLink()` helper with a simpler generic message.

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
