import { Clock, Database, HeartHandshake, MapPin, Wallet } from 'lucide-react'

/** Per BRAND_IDENTITY.md § Competitive Advantages for NZ. */
const advantages = [
  {
    icon: HeartHandshake,
    title: 'Local support',
    description: 'NZ-based customer service, 9am–5pm NZT. Real people, same country.',
  },
  {
    icon: Database,
    title: 'Data sovereignty',
    description: 'Your data is stored in New Zealand and exportable at any time.',
  },
  {
    icon: Wallet,
    title: 'NZ payment methods',
    description: 'Built around how Kiwis actually pay — not a US checkout bolted on.',
  },
  {
    icon: Clock,
    title: 'Time zone alignment',
    description: 'Support in your working hours, so issues get solved the same day.',
  },
  {
    icon: MapPin,
    title: 'Cultural understanding',
    description: 'Kiwi communication style, built by creators who work here.',
  },
]

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-secondary-900 py-20 text-white sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0 opacity-[0.06]">
        <div className="absolute inset-0 bg-grid-faint bg-grid mask-fade-radial invert" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            About
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Built in Aotearoa, for Kiwi creators
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">
            FanFlow NZ is a New Zealand company. That means local support in your time zone, your
            data held here, and a platform that works the way Kiwi creators actually work.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, index) => (
            <div
              key={item.title}
              style={{ animationDelay: `${Math.min(index, 3) * 60}ms` }}
              className="reveal rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary-300">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
