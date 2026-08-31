import { ShieldCheck } from 'lucide-react'
import Reveal from './Reveal'
import { safety } from '../data/config'

export default function Safety() {
  return (
    <section className="bg-charcoal text-ivory">
      <div className="container-px max-w-content mx-auto py-24 md:py-32 grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-[4/5]">
            <img
              src="/images/room-5.webp"
              alt="Comfortable furnished room at SVG Luxurious PG for Ladies"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="eyebrow mb-4 !text-champagne">Safety</p>
          <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-8">
            Designed With Your Safety in Mind
          </h2>
          <div className="space-y-6">
            {safety.map((s) => (
              <div key={s.title} className="flex gap-4">
                <ShieldCheck className="text-champagne shrink-0 mt-1" size={22} strokeWidth={1.5} />
                <div>
                  <h3 className="font-medium mb-1">{s.title}</h3>
                  <p className="text-ivory/65 text-sm font-light leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
