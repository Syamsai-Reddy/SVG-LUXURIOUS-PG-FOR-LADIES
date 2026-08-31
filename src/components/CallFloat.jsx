import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { pg } from '../data/config'

export default function CallFloat() {
  return (
    <motion.a
      href={`tel:${pg.phoneTel}`}
      aria-label="Call us"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.85, duration: 0.4 }}
      whileHover={{ scale: 1.06 }}
      className="fixed bottom-44 sm:bottom-24 right-5 sm:right-7 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-charcoal border border-gold/40 shadow-soft"
    >
      <Phone className="text-gold" size={22} strokeWidth={1.75} fill="currentColor" fillOpacity={0.08} />
    </motion.a>
  )
}
