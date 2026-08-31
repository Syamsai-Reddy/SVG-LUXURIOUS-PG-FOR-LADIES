import { useState } from 'react'
import { Users, BedDouble } from 'lucide-react'
import Reveal from './Reveal'
import RoomDetailModal from './RoomDetailModal'
import { rooms, pg, waLink } from '../data/config'

export default function Rooms() {
  const [active, setActive] = useState(null)

  return (
    <section id="rooms" className="bg-ivory bg-glow">
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <p className="eyebrow mb-4">Accommodation</p>
          <h2 className="section-heading">Choose Your Space</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <Reveal key={room.id} delay={i * 0.1}>
              <article className="card-premium group overflow-hidden h-full flex flex-col">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={room.image}
                    alt={room.type}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl mb-2">{room.type}</h3>
                  <div className="flex items-center gap-4 text-xs text-charcoal/55 mb-4">
                    <span className="inline-flex items-center gap-1.5">
                      <Users size={14} /> {room.occupancy}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <BedDouble size={14} /> {room.bedType}
                    </span>
                  </div>
                  <p className="text-sm text-charcoal/65 font-light leading-relaxed mb-6 flex-1">
                    {room.description}
                  </p>
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-champagne/25">
                    <button onClick={() => setActive(room)} className="btn-secondary !py-2.5 w-full">
                      View Details
                    </button>
                    <a
                      href={waLink(
                        `Hi, I'm interested in the ${room.type} at ${pg.name}. Please share availability, pricing and details.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !bg-rose-dark !py-2.5 w-full"
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <RoomDetailModal room={active} onClose={() => setActive(null)} />
    </section>
  )
}
