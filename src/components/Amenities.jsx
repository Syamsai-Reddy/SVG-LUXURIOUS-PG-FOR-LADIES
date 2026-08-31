import { Utensils, Wifi, Droplets, SprayCan, Refrigerator, WashingMachine, Armchair } from 'lucide-react'
import Reveal from './Reveal'
import { amenities } from '../data/config'

const ICONS = {
  'Home-Cooked Food': Utensils,
  'High-Speed Wi-Fi': Wifi,
  'Hot Water': Droplets,
  'Daily Housekeeping': SprayCan,
  Refrigerator: Refrigerator,
  'Washing Machine': WashingMachine,
  'Furnished Rooms': Armchair,
}

export default function Amenities() {
  return (
    <section id="amenities" className="bg-ivory bg-glow">
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <p className="eyebrow mb-4">Amenities</p>
          <h2 className="section-heading">Everything You Need, Thoughtfully Provided</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((a, i) => {
            const Icon = ICONS[a.name] || Armchair
            return (
              <Reveal key={a.name} delay={i * 0.05}>
                <div className="card-premium p-7 h-full">
                  <div className="h-11 w-11 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                    <Icon className="text-gold" size={20} strokeWidth={1.4} />
                  </div>
                  <h3 className="font-medium text-charcoal mb-1.5">{a.name}</h3>
                  <p className="text-sm text-charcoal/60 font-light leading-relaxed">{a.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
