import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import Reveal from './Reveal'
import { pg, waLink, defaultWaMessage } from '../data/config'

const ITEMS = [
  { icon: Phone, label: 'Phone', value: pg.phoneDisplay, href: `tel:${pg.phoneTel}` },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: pg.phoneDisplay,
    href: waLink(defaultWaMessage),
  },
  { icon: Mail, label: 'Email', value: pg.email, href: `mailto:${pg.email}` },
  { icon: Clock, label: 'Visiting Hours', value: pg.visitingHours, href: null },
  { icon: MapPin, label: 'Address', value: pg.address.full, href: pg.mapsDirectionsUrl },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-charcoal text-ivory">
      <div className="container-px max-w-content mx-auto py-24 md:py-28">
        <Reveal className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <p className="eyebrow mb-4 !text-champagne">Contact</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight">Talk to Us</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {ITEMS.map((item, i) => {
            const isAddress = item.label === 'Address'
            const content = (
              <div className="flex flex-col h-full min-h-[188px] bg-ivory/5 border border-ivory/10 rounded-2xl p-6 transition-colors duration-300 hover:border-gold/40 hover:bg-ivory/[0.07]">
                <div className="h-11 w-11 rounded-full bg-gold/10 flex items-center justify-center mb-5 shrink-0">
                  <item.icon className="text-gold" size={20} strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-widest2 text-ivory/45 mb-2">
                  {item.label}
                </p>
                <p
                  className={`text-sm text-ivory/85 leading-relaxed break-words ${
                    isAddress ? '' : 'mt-auto'
                  }`}
                >
                  {item.value}
                </p>
              </div>
            )
            return (
              <Reveal key={item.label} delay={i * 0.06} className={`h-full ${isAddress ? 'sm:col-span-2 lg:col-span-2' : ''}`}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="block h-full hover:-translate-y-1 transition-transform duration-300"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
