import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { pg, heroImage, waLink, defaultWaMessage } from '../data/config'

export default function Hero() {
  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="SVG Luxurious PG for Ladies — building exterior, Banashankari"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/40 to-charcoal/20" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center container-px">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[11px] md:text-xs uppercase tracking-widest2 text-champagne mb-5"
        >
          Premium Women&rsquo;s Residence &middot; Banashankari, Bengaluru
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-white text-5xl sm:text-6xl md:text-7xl leading-[1.05] max-w-4xl"
        >
          A Better Way to Live,
          <br />
          Near PES College
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-xl text-white/85 text-base md:text-lg font-light leading-relaxed"
        >
          {pg.name} offers comfortable, furnished rooms, home-style food and attentive
          hospitality — rated {pg.rating.value.toFixed(1)} by {pg.rating.count} residents on
          Google.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#rooms" className="btn-primary !bg-rose-dark min-w-[190px]">
            Explore Rooms
          </a>
          <a
            href={waLink(defaultWaMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-light min-w-[190px]"
          >
            WhatsApp Us
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#highlights"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80"
      >
        <ChevronDown size={26} />
      </motion.a>
    </section>
  )
}
