import { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { pg, waLink, defaultWaMessage } from '../data/config'

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-ivory/90 backdrop-blur-md shadow-card py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container-px max-w-content mx-auto flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <span
              className={`font-serif text-2xl tracking-wide transition-colors whitespace-nowrap ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
            >
              {pg.logoText}
            </span>
            <span
              className={`hidden xl:block h-4 w-px ${scrolled ? 'bg-charcoal/30' : 'bg-white/40'}`}
            />
            <span
              className={`hidden xl:block text-[11px] uppercase tracking-widest2 whitespace-nowrap ${
                scrolled ? 'text-charcoal/70' : 'text-white/85'
              }`}
            >
              Premium Ladies PG
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 flex-wrap justify-center">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide whitespace-nowrap transition-colors hover:text-rose-dark ${
                  scrolled ? 'text-charcoal/80' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href={waLink(defaultWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-2.5 !px-5 whitespace-nowrap"
            >
              Enquire Now
            </a>
          </div>

          <button
            className={`lg:hidden p-2 shrink-0 ${scrolled ? 'text-charcoal' : 'text-white'}`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Rendered as a sibling of <header>, not a descendant — header gets
          backdrop-blur once scrolled, and backdrop-filter/transform on an
          ancestor changes what position:fixed resolves against for its
          children, which was collapsing this overlay into the header's
          own (thin) box instead of the full viewport. */}
      {open && (
        <div className="fixed inset-0 z-50 bg-charcoal text-ivory lg:hidden">
          <div className="flex items-center justify-between container-px py-5">
            <span className="font-serif text-2xl">{pg.logoText}</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={26} />
            </button>
          </div>
          <nav className="flex flex-col items-start gap-1 container-px mt-6">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="w-full py-4 border-b border-ivory/10 text-lg font-serif"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="container-px mt-8 flex flex-col gap-3">
            <a
              href={waLink(defaultWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !bg-rose-dark w-full"
            >
              WhatsApp Us
            </a>
            <a href={`tel:${pg.phoneTel}`} className="btn-outline-light w-full">
              <Phone size={16} /> {pg.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </>
  )
}
