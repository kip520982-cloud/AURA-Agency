import { Plus } from 'lucide-react'

/**
 * Platform brand colours are taken from each platform's own published assets:
 *  - OnlyFans  #00AFF0  (primary brand blue)
 *  - Fansly    #1976d2  (theme_color in fansly.com/manifest.webmanifest)
 *
 * These are wordmarks set in the platforms' brand colours rather than copies of
 * their logo artwork — swap in official press-kit assets if we ever get licence
 * to use them. See the trademark note in the footer.
 */

function OnlyFansMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold lowercase text-white"
      style={{ backgroundColor: '#00AFF0' }}
    >
      of
    </span>
  )
}

function FanslyMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] text-[15px] font-bold lowercase text-white"
      style={{ backgroundColor: '#1976d2' }}
    >
      f
    </span>
  )
}

const platforms = [
  { name: 'OnlyFans', mark: OnlyFansMark, color: '#008CCF' },
  { name: 'Fansly', mark: FanslyMark, color: '#1565c0' },
]

export default function PlatformStrip() {
  return (
    <section aria-labelledby="platforms-heading" className="border-y border-secondary-100 bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="platforms-heading"
          className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted"
        >
          Built for creators on
        </h2>

        <ul className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {platforms.map((platform) => (
            <li key={platform.name}>
              <div className="flex items-center gap-2.5 rounded-full border border-secondary-100 bg-white px-4 py-2.5 shadow-soft transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:shadow-card">
                <platform.mark />
                <span
                  className="font-display text-base font-bold tracking-tight"
                  style={{ color: platform.color }}
                >
                  {platform.name}
                </span>
              </div>
            </li>
          ))}

          <li>
            <div className="flex items-center gap-2 rounded-full border border-dashed border-secondary-200 bg-secondary-50 px-4 py-2.5">
              <Plus className="h-4 w-4 text-ink-muted" aria-hidden="true" />
              <span className="text-sm font-medium text-ink-muted">More platforms coming</span>
            </div>
          </li>
        </ul>

        <p className="mt-5 text-center text-sm text-ink-muted">
          Bring your fans, revenue and chat history into one transparent dashboard.
        </p>
      </div>
    </section>
  )
}
