import { motion } from 'framer-motion'

// fade-up-on-scroll wrapper; framer-motion already backs off for prefers-reduced-motion
export default function Reveal({ children, delay = 0, className = '', as = 'div', y = 24 }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
