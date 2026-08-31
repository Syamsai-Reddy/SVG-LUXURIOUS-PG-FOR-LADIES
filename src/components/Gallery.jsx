import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import Reveal from './Reveal'
import { galleryImages } from '../data/config'

const CATEGORIES = ['All', ...new Set(galleryImages.map((g) => g.category))]

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [index, setIndex] = useState(null)
  const scrollerRef = useRef(null)

  const filtered = filter === 'All' ? galleryImages : galleryImages.filter((g) => g.category === filter)

  const openAt = (img) => setIndex(filtered.indexOf(img))
  const close = () => setIndex(null)
  const next = () => setIndex((i) => (i + 1) % filtered.length)
  const prev = () => setIndex((i) => (i - 1 + filtered.length) % filtered.length)
  const scrollBy = (dir) => scrollerRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, filtered.length])

  return (
    <section id="gallery" className="bg-ivory bg-glow overflow-hidden">
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-4">Gallery</p>
            <h2 className="section-heading">A Closer Look at the Residence</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll gallery left"
              className="p-2.5 rounded-full border border-charcoal/15 hover:border-gold hover:bg-gold/5 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll gallery right"
              className="p-2.5 rounded-full border border-charcoal/15 hover:border-gold hover:bg-gold/5 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        <Reveal className="flex flex-wrap gap-2.5 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 rounded-full text-sm border transition-all duration-300 ${
                filter === c
                  ? 'bg-charcoal text-ivory border-charcoal'
                  : 'bg-white text-charcoal/65 border-champagne/30 hover:border-gold hover:text-charcoal'
              }`}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <div
          ref={scrollerRef}
          className="flex gap-4 md:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none' }}
        >
          {filtered.map((img, i) => (
            <Reveal
              key={img.src + filter}
              delay={Math.min(i, 6) * 0.05}
              className="snap-start shrink-0 w-[240px] sm:w-[300px] md:w-[360px]"
            >
              <button
                onClick={() => openAt(img)}
                className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-card"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
                    img.src.includes('building') ? 'object-[center_25%]' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/0 to-charcoal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-[10px] uppercase tracking-widest2 text-champagne mb-1">
                    {img.category}
                  </span>
                </div>
                <span className="absolute top-3 right-3 h-8 w-8 rounded-full bg-charcoal/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Expand size={14} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[70] bg-charcoal/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close gallery"
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous image"
              className="absolute left-4 md:left-8 text-white/70 hover:text-white transition-colors"
            >
              <ChevronLeft size={36} />
            </button>
            <AnimatePresence mode="wait">
              <motion.img
                key={filtered[index].src}
                src={filtered[index].src}
                alt={filtered[index].alt}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                className="max-h-[80vh] max-w-[88vw] object-contain rounded-lg shadow-soft"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next image"
              className="absolute right-4 md:right-8 text-white/70 hover:text-white transition-colors"
            >
              <ChevronRight size={36} />
            </button>
            <p className="absolute bottom-6 text-white/60 text-xs tracking-widest2 uppercase">
              {index + 1} / {filtered.length} &middot; {filtered[index].category}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
