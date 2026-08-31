import { useState } from 'react'
import { Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import { faqs } from '../data/config'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faqs" className="bg-cream">
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <Reveal className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <p className="eyebrow mb-4">FAQs</p>
          <h2 className="section-heading">Good to Know</h2>
        </Reveal>

        <div className="max-w-3xl mx-auto divide-y divide-charcoal/10">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.03, 0.2)}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg md:text-xl text-charcoal">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-rose-dark"
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-charcoal/65 font-light leading-relaxed pr-8">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
