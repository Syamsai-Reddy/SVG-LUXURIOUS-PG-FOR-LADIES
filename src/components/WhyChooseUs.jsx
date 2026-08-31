import { ShieldCheck, Sparkles, Home, MapPinned, Sparkle, Users } from 'lucide-react'
import Reveal from './Reveal'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    text: 'A residence exclusively for women, with an owner who is attentive and quick to respond.',
  },
  {
    icon: Sparkles,
    title: 'Premium Living',
    text: 'Thoughtfully furnished rooms finished with warm wood-tone furniture and soft interiors.',
  },
  {
    icon: Home,
    title: 'Comfort',
    text: 'Well-appointed rooms and shared spaces designed to feel like home from day one.',
  },
  {
    icon: MapPinned,
    title: 'Convenience',
    text: 'Positioned right next to PES College, with everyday essentials close by.',
  },
  {
    icon: Sparkle,
    title: 'Clean & Maintained',
    text: 'Daily housekeeping keeps rooms and common areas consistently spotless.',
  },
  {
    icon: Users,
    title: 'Community',
    text: 'A warm, familiar environment where residents feel genuinely cared for.',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-cream">
      <div className="container-px max-w-content mx-auto py-24 md:py-32">
        <Reveal className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <p className="eyebrow mb-4">Why Choose Us</p>
          <h2 className="section-heading">The Details That Make It Feel Like Home</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <div className="card-premium p-8 md:p-9 h-full">
                <div className="h-12 w-12 rounded-full bg-rose/10 flex items-center justify-center mb-6">
                  <f.icon className="text-rose-dark" size={22} strokeWidth={1.4} />
                </div>
                <h3 className="font-serif text-xl mb-2 text-charcoal">{f.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed font-light">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
