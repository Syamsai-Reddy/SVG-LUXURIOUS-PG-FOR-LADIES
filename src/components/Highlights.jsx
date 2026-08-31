import { Star } from 'lucide-react'
import Reveal from './Reveal'
import { highlights, pg } from '../data/config'

export default function Highlights() {
  return (
    <section id="highlights" className="bg-charcoal text-ivory">
      <div className="container-px max-w-content mx-auto py-8 md:py-10">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            <div className="flex items-center gap-2 pr-8 border-r border-ivory/15 last:border-none">
              <div className="flex text-champagne">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-sm text-ivory/85">
                {pg.rating.value.toFixed(1)} &middot; {pg.rating.count} Google Reviews
              </span>
            </div>
            {highlights.map((h) => (
              <span key={h.label} className="text-sm tracking-wide text-ivory/80 uppercase text-xs">
                {h.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
