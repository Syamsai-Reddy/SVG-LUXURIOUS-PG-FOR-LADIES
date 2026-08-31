import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, X } from 'lucide-react'

// A single top-of-page notification. `toast` is either null (hidden) or
// { type: 'success' | 'error', message: string }. Auto-dismisses after 5s.
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onClose, 5000)
    return () => clearTimeout(t)
  }, [toast, onClose])

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-md"
          role="status"
          aria-live="polite"
        >
          <div
            className={`flex items-start gap-3 rounded-2xl px-5 py-4 shadow-soft border ${
              toast.type === 'success'
                ? 'bg-charcoal text-ivory border-gold/40'
                : 'bg-white text-charcoal border-rose-dark/30'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={20} />
            ) : (
              <AlertCircle className="text-rose-dark shrink-0 mt-0.5" size={20} />
            )}
            <p className="text-sm leading-relaxed flex-1">{toast.message}</p>
            <button
              onClick={onClose}
              aria-label="Dismiss"
              className={`shrink-0 opacity-60 hover:opacity-100 transition-opacity ${
                toast.type === 'success' ? 'text-ivory' : 'text-charcoal'
              }`}
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
