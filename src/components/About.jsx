import Reveal from './Reveal'
import { waLink, pg } from '../data/config'

export default function About() {
  return (
    <section id="about" className="bg-ivory">
      <div className="container-px max-w-content mx-auto py-24 md:py-32 grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <Reveal className="order-2 md:order-1">
          <p className="eyebrow mb-4">About The Residence</p>
          <h2 className="section-heading mb-6">
            More Than a PG.
            <br />A Place to Call Home.
          </h2>
          <div className="space-y-5 text-charcoal/75 leading-relaxed font-light text-base md:text-lg">
            <p>
              Tucked beside PES College in Banashankari, {pg.name} is designed for women who want
              more than just a room — comfort, privacy and a community that feels like home.
            </p>
            <p>
              Residents consistently point to the same things: a spotlessly clean environment,
              genuinely good home-style food, and an owner who is quick to respond and resolve
              anything that comes up. It&rsquo;s this attentiveness, more than any amenity list, that
              sets the residence apart.
            </p>
            <p>
              Every room is thoughtfully furnished, common areas are cleaned daily, and the
              location keeps college and everyday essentials within easy reach.
            </p>
          </div>
          <a
            href={waLink(
              `Hi, I'd like to know more about ${pg.name} and see if it's the right fit for me.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-8"
          >
            Discover Your New Home
          </a>
        </Reveal>

        <Reveal delay={0.15} className="order-1 md:order-2">
          <div className="relative rounded-2xl overflow-hidden shadow-soft aspect-[4/5]">
            <img
              src="/images/room-2.webp"
              alt="Furnished room interior at SVG Luxurious PG for Ladies"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
