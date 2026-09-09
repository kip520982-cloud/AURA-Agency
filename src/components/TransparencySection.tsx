import {
  Activity,
  BarChart3,
  Bot,
  Check,
  DollarSign,
  Download,
  Eye,
  Gauge,
  Lock,
  Sliders,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react'

/** Each row is a like-for-like comparison, so the three columns align. */
const comparisonRows = [
  { bad: 'Hidden fees', good: 'Complete fee breakdown', benefit: 'Higher revenue', icon: TrendingUp },
  { bad: 'No audit trail', good: 'Full audit logging', benefit: 'Better insights', icon: BarChart3 },
  { bad: 'Black box operations', good: 'Transparent operations', benefit: 'Full control', icon: Sliders },
  { bad: 'Data lock-in', good: 'Data export anytime', benefit: 'Cost optimisation', icon: DollarSign },
  { bad: 'Manual processes', good: 'AI automation', benefit: 'Efficiency gains', icon: Zap },
  { bad: 'No performance metrics', good: 'Real-time metrics', benefit: 'Data-driven decisions', icon: Gauge },
]

const features = [
  {
    icon: Eye,
    title: 'Complete Audit Trail',
    description: 'Every action logged - who did what, when, and why. Track human staff vs AI responses.',
    tint: 'bg-primary-50 text-primary-700',
  },
  {
    icon: DollarSign,
    title: 'Financial Transparency',
    description:
      'Full revenue breakdown: Gross → Platform fees → Agency fees → Net amount. Real-time payout tracking.',
    tint: 'bg-accent-50 text-accent-700',
  },
  {
    icon: Users,
    title: 'Staff Performance',
    description: 'Track individual productivity, messages sent, revenue generated, and AI-calculated scores.',
    tint: 'bg-secondary-100 text-secondary-700',
  },
  {
    icon: Bot,
    title: 'Chat Analytics',
    description: 'See which messages were automated vs human, response times, engagement scoring.',
    tint: 'bg-primary-50 text-primary-700',
  },
  {
    icon: Download,
    title: 'Data Ownership',
    description: 'Export ALL your data anytime - fans, chats, finances, audit logs. No lock-in, ever.',
    tint: 'bg-accent-50 text-accent-700',
  },
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Live dashboard of staff activities, response times, VIP whale alerts as they happen.',
    tint: 'bg-secondary-100 text-secondary-700',
  },
]

export default function TransparencySection() {
  return (
    <section id="transparency" className="bg-secondary-50/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="reveal mx-auto max-w-3xl text-center">
          <span className="eyebrow">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
            Transparency
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            The Only Agency That Shows You Everything
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-body">
            Traditional agencies hide what they&rsquo;re doing with your fans and your money. FanFlow
            NZ believes in complete transparency.
          </p>
        </div>

        {/* Comparison table — scrolls inside its own container on small screens
            so the three columns never force the whole page wider than the viewport. */}
        <div
          className="reveal -mx-4 mt-14 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0"
          style={{ animationDelay: '80ms' }}
        >
          <div className="min-w-[38rem] overflow-hidden rounded-2xl border border-secondary-200 bg-white shadow-card">
          {/* Column headers */}
          <div className="grid grid-cols-3 border-b border-secondary-200">
            <div className="flex items-center gap-2 bg-secondary-50 px-4 py-4 sm:px-6">
              <Lock className="h-4 w-4 shrink-0 text-neutral-500" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-ink-body sm:text-base">
                Traditional agencies
              </h3>
            </div>
            <div className="relative flex items-center gap-2 border-x border-secondary-200 bg-primary-50 px-4 py-4 sm:px-6">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary to-accent"
              />
              <Logomark />
              <h3 className="text-sm font-semibold text-primary-700 sm:text-base">FanFlow NZ</h3>
            </div>
            <div className="flex items-center gap-2 bg-accent-50 px-4 py-4 sm:px-6">
              <TrendingUp className="h-4 w-4 shrink-0 text-accent-700" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-accent-700 sm:text-base">Your benefits</h3>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-secondary-100">
            {comparisonRows.map((row) => (
              <div key={row.bad} className="grid grid-cols-3">
                <div className="flex items-start gap-2 bg-secondary-50/50 px-4 py-3.5 sm:px-6">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" aria-hidden="true" />
                  <span className="text-sm text-ink-muted line-through decoration-neutral-300">
                    {row.bad}
                  </span>
                </div>
                <div className="flex items-start gap-2 border-x border-secondary-100 bg-primary-50/40 px-4 py-3.5 sm:px-6">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
                  <span className="text-sm font-medium text-ink">{row.good}</span>
                </div>
                <div className="flex items-start gap-2 bg-accent-50/40 px-4 py-3.5 sm:px-6">
                  <row.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent-700" aria-hidden="true" />
                  <span className="text-sm font-medium text-ink">{row.benefit}</span>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Feature grid */}
        <div id="features" className="mt-20 scroll-mt-24">
          <div className="reveal mx-auto max-w-3xl text-center">
            <span className="eyebrow">
              <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
              Features
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Everything you need, nothing hidden
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-body">
              Six ways FanFlow NZ keeps you in control of your fans, your revenue and your data.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="reveal card card-hover"
                style={{ animationDelay: `${Math.min(index, 3) * 60}ms` }}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.tint}`}>
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** Tiny inline mark used in the comparison header. */
function Logomark() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-4 w-4 shrink-0 text-primary-700"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.4"
      strokeLinecap="round"
    >
      <path d="M8 13c3.4-3.1 6.3-3.1 8.8 0 2.9 3.6 6.2 3.6 9.9 0" opacity="0.5" />
      <path d="M8 21c3.4-3.4 6.5-3.4 9.3 0 3.1 3.8 6.6 3.8 10.5 0" />
      <path d="M8 29c3.4-3.6 6.7-3.6 9.8 0 3.3 4 7 4 11.2 0" opacity="0.5" />
    </svg>
  )
}
