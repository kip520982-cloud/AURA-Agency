import { ArrowRight, Check, Sparkles, Tag } from 'lucide-react'

/** Tiers and prices per BRAND_IDENTITY.md § Pricing Strategy (NZD). */
const tiers = [
  {
    name: 'Starter',
    price: '29',
    cadence: '/month',
    summary: 'For creators getting organised.',
    features: [
      'Up to 50 fans',
      'Complete audit trail',
      'Revenue tracking dashboard',
      'Data export anytime',
      'Email support',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    price: '79',
    cadence: '/month',
    summary: 'For creators scaling with AI.',
    features: [
      'Up to 500 fans',
      'AI chat automation',
      'Staff performance tracking',
      'Everything in Starter',
      'Priority email support',
    ],
    featured: true,
  },
  {
    name: 'Pro',
    price: '149',
    cadence: '/month',
    summary: 'For full-time creators.',
    features: [
      'Unlimited fans',
      'Real-time monitoring & VIP alerts',
      'Advanced chat analytics',
      'Everything in Growth',
      'Priority support',
    ],
    featured: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    summary: 'For agencies and large creators.',
    features: [
      'Multi-creator accounts',
      'Dedicated account manager',
      'Custom integrations',
      'Everything in Pro',
      'Onboarding and training',
    ],
    featured: false,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Tag className="h-3.5 w-3.5" aria-hidden="true" />
            Pricing
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Simple pricing, no hidden fees
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-body">
            The same transparency we give you on your fans, we give you on your bill. All prices in
            NZD, GST inclusive.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-50 px-4 py-2 text-sm font-medium text-accent-700">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Free trial for our first 100 NZ creators
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              style={{ animationDelay: `${Math.min(index, 3) * 60}ms` }}
              className={
                tier.featured
                  ? 'reveal relative rounded-2xl border-2 border-primary bg-white p-6 shadow-lift lg:-mt-3 lg:pb-8'
                  : 'reveal card card-hover'
              }
            >
              {tier.featured && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-glow">
                  Most popular
                </span>
              )}

              <h3 className="font-display text-lg font-bold text-ink">{tier.name}</h3>
              <p className="mt-1 text-sm text-ink-muted">{tier.summary}</p>

              <p className="mt-5 flex min-h-[2.75rem] items-baseline">
                {tier.price === 'Custom' ? (
                  <span className="font-display text-4xl font-extrabold text-ink">Custom</span>
                ) : (
                  <>
                    <span className="mr-0.5 text-xl font-semibold text-ink-muted">$</span>
                    <span className="tabular font-display text-4xl font-extrabold text-ink">
                      {tier.price}
                    </span>
                    <span className="ml-1 text-sm text-ink-muted">{tier.cadence}</span>
                  </>
                )}
              </p>

              <a
                href="#waitlist"
                className={
                  tier.featured
                    ? 'btn-primary mt-6 w-full text-sm'
                    : 'btn-secondary mt-6 w-full text-sm'
                }
              >
                <span>{tier.price === 'Custom' ? 'Talk to us' : 'Join the waitlist'}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <ul className="mt-6 space-y-3 border-t border-secondary-100 pt-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        tier.featured ? 'text-primary' : 'text-accent-600'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-ink-body">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-muted">
          Prices are indicative for our beta launch and may change before general availability.
        </p>
      </div>
    </section>
  )
}
