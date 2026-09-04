import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, Mail, BedDouble, CalendarDays, Users, Clock3, MessageSquare, Trash2, Check, X } from 'lucide-react'
import { formatMoveInDate } from '../../utils/enquiry'

function timeAgo(ts) {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

const FIELDS = [
  { key: 'phone', icon: Phone, label: 'Mobile' },
  { key: 'email', icon: Mail, label: 'Email' },
  { key: 'roomType', icon: BedDouble, label: 'Looking For' },
  { key: 'moveIn', icon: CalendarDays, label: 'Move-in', format: formatMoveInDate },
  { key: 'numPeople', icon: Users, label: 'People' },
  { key: 'stayDuration', icon: Clock3, label: 'Stay' },
]

export default function EnquiryCard({ enquiry, index, onDelete }) {
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const isNew = Date.now() - enquiry.receivedAt < 60 * 60 * 1000 // last hour

  const handleConfirmDelete = async () => {
    setDeleting(true)
    const ok = await onDelete(enquiry.id)
    if (!ok) {
      setDeleting(false)
      setConfirming(false)
    }
    // on success the card unmounts via the parent's state update + AnimatePresence
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.25 } }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border border-champagne/25 shadow-card p-6 relative overflow-hidden"
    >
      {isNew && !confirming && (
        <span className="absolute top-0 right-0 bg-rose-dark text-ivory text-[10px] uppercase tracking-widest2 px-3 py-1 rounded-bl-xl">
          New
        </span>
      )}

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <User className="text-gold" size={18} />
          </div>
          <div>
            <h3 className="font-serif text-lg leading-tight">{enquiry.name}</h3>
            <p className="text-xs text-charcoal/45">{timeAgo(enquiry.receivedAt)}</p>
          </div>
        </div>
        {!confirming && (
          <button
            onClick={() => setConfirming(true)}
            aria-label="Delete enquiry"
            className="p-1.5 rounded-full text-charcoal/30 hover:text-rose-dark hover:bg-rose-dark/10 transition-colors shrink-0"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>

      <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 mb-3">
        {FIELDS.map(({ key, icon: Icon, label, format }) => (
          <div key={key} className="flex items-start gap-2 text-sm">
            <Icon className="text-charcoal/35 shrink-0 mt-0.5" size={14} />
            <div className="min-w-0">
              <dt className="text-[10px] uppercase tracking-wide text-charcoal/40 leading-none mb-0.5">
                {label}
              </dt>
              <dd className="text-charcoal/80 truncate">{format ? format(enquiry[key]) : enquiry[key]}</dd>
            </div>
          </div>
        ))}
      </dl>

      {enquiry.message && (
        <div className="flex items-start gap-2 pt-3 border-t border-charcoal/10 text-sm">
          <MessageSquare className="text-charcoal/35 shrink-0 mt-0.5" size={14} />
          <p className="text-charcoal/70 leading-relaxed">{enquiry.message}</p>
        </div>
      )}

      {confirming && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-6 text-center"
        >
          <p className="text-sm text-charcoal/75">Delete this enquiry?</p>
          <div className="flex items-center gap-2">
            <button
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 bg-rose-dark text-ivory text-xs rounded-full px-4 py-2 hover:bg-rose-dark/90 transition-colors disabled:opacity-60"
            >
              <Check size={13} /> {deleting ? 'Deleting…' : 'Yes, delete'}
            </button>
            <button
              onClick={() => setConfirming(false)}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 border border-charcoal/20 text-charcoal/70 text-xs rounded-full px-4 py-2 hover:bg-charcoal/5 transition-colors"
            >
              <X size={13} /> Cancel
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
