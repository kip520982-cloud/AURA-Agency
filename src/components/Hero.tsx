import { ArrowRight, Eye, ShieldCheck, TrendingUp, Users } from 'lucide-react'

const stats = [
  { value: '100%', label: 'Transparent' },
  { value: '25%', label: 'Higher engagement' },
  { value: '10hrs', label: 'Saved per week' },
]

const teaserCards = [
  {
    icon: Users,
    title: 'Smart Fan Management',
    description: 'Automatic VIP whale detection and fan segmentation',
    tint: 'bg-primary-50 text-primary-700',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Tracking',
    description: 'Complete financial transparency and real-time analytics',
    tint: 'bg-accent-50 text-accent-700',
  },
  {
    icon: Eye,
    title: 'Full Audit Trail',
    description: 'Every action logged and available for export',
    tint: 'bg-secondary-100 text-secondary-700',
  },
]

/**
 * Entrance animations here are CSS-driven rather than framer-motion so the
 * headline paints on first frame instead of waiting for hydration.
 */
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
      {/* Background: soft brand glow over a fading grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 bg-grid-faint bg-grid mask-fade-b opacity-70" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div
            className="animate-slide-up chip border border-accent-200 bg-accent-50 text-accent-700 [animation-fill-mode:both]"
            style={{ animationDelay: '40ms' }}
          >
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>100% transparent creator management</span>
          </div>

          {/* Main heading */}
          <h1
            className="animate-slide-up mt-7 text-display-sm font-extrabold text-ink sm:text-display-md lg:text-display-lg [animation-fill-mode:both]"
            style={{ animationDelay: '110ms' }}
          >
            Smart Creator Management,
            <span className="block text-primary">Made in NZ</span>
          </h1>

          {/* Subheading */}
          <p
            className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-body sm:text-xl [animation-fill-mode:both]"
            style={{ animationDelay: '180ms' }}
          >
            The only creator platform that shows you everything. Complete transparency in fan
            management, revenue tracking, and AI-powered chat automation. Built for Kiwi creators by
            Kiwi creators.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-slide-up mt-9 flex flex-col justify-center gap-3 sm:flex-row [animation-fill-mode:both]"
            style={{ animationDelay: '250ms' }}
          >
            <a href="#waitlist" className="btn-primary px-7 py-3.5 text-base">
              <span>Join the waitlist</span>
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
            <a href="#features" className="btn-secondary px-7 py-3.5 text-base">
              <Eye className="h-5 w-5" aria-hidden="true" />
              <span>See how it works</span>
            </a>
          </div>

          {/* Stats */}
          <dl
            className="animate-slide-up mx-auto mt-12 grid max-w-2xl grid-cols-1 divide-y divide-secondary-100 overflow-hidden rounded-2xl border border-secondary-100 bg-white/70 shadow-soft backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0 [animation-fill-mode:both]"
            style={{ animationDelay: '320ms' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-4 py-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="tabular block text-3xl font-extrabold text-primary">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-sm text-ink-muted">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Product teaser cards */}
        <div
          className="animate-slide-up mt-16 [animation-fill-mode:both]"
          style={{ animationDelay: '400ms' }}
        >
          <div className="rounded-4xl border border-secondary-100 bg-gradient-to-br from-primary-50 via-white to-accent-50 p-4 shadow-soft sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {teaserCards.map((card) => (
                <div key={card.title} className="card card-hover">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.tint}`}
                  >
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold text-ink">{card.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
