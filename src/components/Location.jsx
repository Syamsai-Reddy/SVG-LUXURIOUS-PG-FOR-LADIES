import { MapPin, Navigation } from 'lucide-react'
import Reveal from './Reveal'
import { pg, nearby } from '../data/config'

export default function Location() {
  return (
    <section id="location" className="bg-ivory">
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <p className="eyebrow mb-4">Location</p>
          <h2 className="section-heading">Right Where You Need to Be</h2>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-3 lg:self-center rounded-2xl overflow-hidden shadow-card h-[360px] md:h-[460px]">
            <iframe
              title="SVG Luxurious PG for Ladies location map"
              src={pg.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="bg-cream rounded-2xl p-7 md:p-8 h-full flex flex-col">
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="text-rose-dark shrink-0 mt-1" size={20} />
                <p className="text-charcoal/80 leading-relaxed">{pg.address.full}</p>
              </div>

              <div className="space-y-5 mb-8">
                {nearby.map((n) => (
                  <div key={n.category}>
                    <p className="text-xs uppercase tracking-widest2 text-charcoal/45 mb-1.5">
                      {n.category}
                    </p>
                    <p className="text-sm text-charcoal/75">{n.items.join(', ')}</p>
                  </div>
                ))}
              </div>

              <a
                href={pg.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary !bg-rose-dark mt-auto"
              >
                <Navigation size={16} /> Get Directions
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
