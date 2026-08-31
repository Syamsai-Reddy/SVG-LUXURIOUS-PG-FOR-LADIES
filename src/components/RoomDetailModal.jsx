import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Phone } from 'lucide-react'
import { pg, waLink } from '../data/config'

export default function RoomDetailModal({ room, onClose }) {
  useEffect(() => {
    if (!room) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [room])

  return (
    <AnimatePresence>
      {room && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 bg-ivory w-full sm:max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl shadow-soft"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-20 bg-ivory/90 rounded-full p-2 shadow-card"
            >
              <X size={20} />
            </button>

            <div className="grid sm:grid-cols-2 gap-1 sm:gap-2 p-2 sm:p-3">
              {room.gallery.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt={room.type}
                  className="w-full h-52 sm:h-64 object-cover rounded-2xl"
                  loading="lazy"
                />
              ))}
            </div>

            <div className="p-6 sm:p-10">
              <p className="eyebrow mb-2">Room Detail</p>
              <h3 className="font-serif text-3xl mb-3">{room.type}</h3>
              <p className="text-charcoal/70 font-light leading-relaxed mb-6">{room.description}</p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-charcoal/10 pb-2">
                    <dt className="text-charcoal/50">Occupancy</dt>
                    <dd className="font-medium">{room.occupancy}</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal/10 pb-2">
                    <dt className="text-charcoal/50">Bed Type</dt>
                    <dd className="font-medium">{room.bedType}</dd>
                  </div>
                  <div className="flex justify-between border-b border-charcoal/10 pb-2">
                    <dt className="text-charcoal/50">Furniture</dt>
                    <dd className="font-medium text-right">{room.furniture}</dd>
                  </div>
                  <div className="flex justify-between pb-2">
                    <dt className="text-charcoal/50">Availability</dt>
                    <dd className="font-medium">{room.availability}</dd>
                  </div>
                </dl>

                <div>
                  <p className="text-xs uppercase tracking-widest2 text-charcoal/50 mb-3">
                    What&rsquo;s Included
                  </p>
                  <ul className="space-y-2">
                    {room.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-charcoal/80">
                        <Check size={15} className="text-rose-dark mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs uppercase tracking-widest2 text-charcoal/50 mt-4 mb-2">
                    Deposit
                  </p>
                  <p className="text-sm text-charcoal/70">{room.deposit}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={waLink(
                    `Hi, I'm interested in the ${room.type} at ${pg.name}. Please share availability, pricing and details.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary !bg-rose-dark flex-1"
                >
                  Enquire About This Room
                </a>
                <a href={`tel:${pg.phoneTel}`} className="btn-secondary flex-1">
                  <Phone size={16} /> Call Us
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
