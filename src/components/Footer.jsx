import { Instagram, Facebook } from 'lucide-react'
import { pg } from '../data/config'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Rooms', href: '#rooms' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Location', href: '#location' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#211D19] text-ivory/70">
      <div className="container-px max-w-content mx-auto py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="font-serif text-3xl text-ivory">{pg.logoText}</span>
          <p className="mt-3 text-sm leading-relaxed max-w-xs">
            {pg.name} — a premium, women-only residence near PES College, Banashankari,
            Bengaluru.
          </p>
          {(pg.social.instagram || pg.social.facebook) && (
            <div className="flex gap-3 mt-5">
              {pg.social.instagram && (
                <a href={pg.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                  <Instagram size={18} />
                </a>
              )}
              {pg.social.facebook && (
                <a href={pg.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-ivory">
                  <Facebook size={18} />
                </a>
              )}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest2 text-ivory/40 mb-4">Quick Links</p>
          <ul className="space-y-2.5 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ivory transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest2 text-ivory/40 mb-4">Contact</p>
          <ul className="space-y-2.5 text-sm">
            <li>{pg.phoneDisplay}</li>
            <li>{pg.email}</li>
            <li className="leading-relaxed">{pg.address.full}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-px max-w-content mx-auto py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/40">
          <p>&copy; {year} {pg.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-ivory/70">Privacy Policy</a>
            <a href="#" className="hover:text-ivory/70">House Rules</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
