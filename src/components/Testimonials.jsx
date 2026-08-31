import { useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Reveal from './Reveal'
import { testimonials, pg } from '../data/config'

export default function Testimonials() {
  const scrollerRef = useRef(null)

  const scrollBy = (dir) => {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' })
  }

  return (
    <section className="bg-charcoal text-ivory overflow-hidden">
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-4 !text-champagne">Testimonials</p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">What Residents Say</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-champagne">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
              ))}
              <span className="ml-2 text-sm text-ivory/70">
                {pg.rating.value.toFixed(1)} from {pg.rating.count} Google reviews
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => scrollBy(-1)}
                aria-label="Previous"
                className="p-2.5 rounded-full border border-ivory/20 hover:bg-ivory/10"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollBy(1)}
                aria-label="Next"
                className="p-2.5 rounded-full border border-ivory/20 hover:bg-ivory/10"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </Reveal>

        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name + i}
              delay={Math.min(i * 0.05, 0.3)}
              className="snap-start shrink-0 w-[300px] md:w-[340px]"
            >
              <div className="bg-ivory/5 border border-ivory/10 rounded-2xl p-7 h-full flex flex-col transition-all duration-300 hover:border-gold/40 hover:bg-ivory/[0.08] hover:-translate-y-1">
                <Quote className="text-champagne mb-4" size={24} strokeWidth={1.5} />
                <p className="text-ivory/80 text-sm leading-relaxed font-light flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-6 pt-5 border-t border-ivory/10">
                  <div className="flex items-center gap-1 text-champagne mb-1">
                    {Array.from({ length: t.rating }).map((_, r) => (
                      <Star key={r} size={12} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-ivory/45">{t.meta}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
