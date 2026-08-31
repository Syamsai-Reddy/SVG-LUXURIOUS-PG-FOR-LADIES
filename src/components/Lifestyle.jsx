import Reveal from './Reveal'

const MOMENTS = [
  {
    image: '/images/room-3.webp',
    title: 'Settle In',
    text: 'Furnished rooms ready from day one, so you can move in and feel at home immediately.',
  },
  {
    image: '/images/room-4.webp',
    title: 'Study & Unwind',
    text: 'A quiet corner of your own, with a dedicated study table in every room.',
  },
  {
    image: '/images/building.webp',
    title: 'Everyday Convenience',
    text: 'Steps from PES College, with everyday essentials close by.',
  },
]

export default function Lifestyle() {
  return (
    <section className="bg-cream">
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <p className="eyebrow mb-4">Everyday Life</p>
          <h2 className="section-heading">Live Comfortably. Live Confidently.</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {MOMENTS.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <div className="card-premium overflow-hidden h-full">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.title}
                    className={`h-full w-full object-cover ${
                      m.image.includes('building') ? 'object-[center_25%]' : ''
                    }`}
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl mb-2">{m.title}</h3>
                  <p className="text-sm text-charcoal/60 font-light leading-relaxed">{m.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
