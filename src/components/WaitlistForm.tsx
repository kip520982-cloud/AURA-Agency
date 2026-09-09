import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { ArrowRight, CheckCircle2, Loader2, Lock, Mail } from 'lucide-react'
import { supabase } from '../lib/supabase'

const emptyForm = {
  email: '',
  creator_name: '',
  platform: '',
  current_fans: '',
  monthly_revenue: '',
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState(emptyForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('waitlist_entries').insert([
        {
          email: formData.email.trim(),
          creator_name: formData.creator_name.trim() || null,
          platform: formData.platform || null,
          current_fans: formData.current_fans ? parseInt(formData.current_fans, 10) : null,
          monthly_revenue: formData.monthly_revenue ? parseFloat(formData.monthly_revenue) : null,
          referral_source: 'website_form',
        },
      ])

      if (error) throw error

      toast.success("You're on the waitlist! We'll be in touch soon.")
      setFormData(emptyForm)
      setIsDone(true)
    } catch (error: any) {
      console.error('Waitlist submission error:', error)
      // 23505 = unique violation, i.e. this email is already signed up
      if (error?.code === '23505') {
        toast.success("You're already on the waitlist — we'll be in touch.")
        setIsDone(true)
      } else {
        toast.error('Something went wrong. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 py-20 sm:py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid-faint bg-grid mask-fade-radial opacity-60" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center">
          <span className="eyebrow">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            Early access
          </span>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Join the Waitlist
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-body">
            Be the first to experience complete transparency in creator management. Limited spots
            available for our beta launch.
          </p>
        </div>

        <div
          className="reveal mt-12 rounded-4xl border border-secondary-100 bg-white p-6 shadow-lift sm:p-8"
          style={{ animationDelay: '80ms' }}
        >
          <div aria-live="polite">
            {isDone ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-700">
                  <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">You&rsquo;re on the list</h3>
                <p className="mx-auto mt-2 max-w-md leading-relaxed text-ink-body">
                  Thanks for signing up. We&rsquo;ll email you as soon as your beta spot is ready —
                  keep an eye on your inbox.
                </p>
                <button
                  type="button"
                  onClick={() => setIsDone(false)}
                  className="btn-ghost mt-5 text-sm"
                >
                  Add another creator
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="label">
                      Email address <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="input"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="creator_name" className="label">
                      Creator name
                    </label>
                    <input
                      type="text"
                      id="creator_name"
                      name="creator_name"
                      value={formData.creator_name}
                      onChange={handleChange}
                      autoComplete="nickname"
                      className="input"
                      placeholder="Your creator name"
                    />
                  </div>

                  <div>
                    <label htmlFor="platform" className="label">
                      Primary platform
                    </label>
                    <select
                      id="platform"
                      name="platform"
                      value={formData.platform}
                      onChange={handleChange}
                      className="input appearance-none bg-[length:18px] bg-[right_0.9rem_center] bg-no-repeat pr-10"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364788A' stroke-width='2.5' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                      }}
                    >
                      <option value="">Select a platform</option>
                      <option value="onlyfans">OnlyFans</option>
                      <option value="fansly">Fansly</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="current_fans" className="label">
                      Current fan count
                    </label>
                    <input
                      type="number"
                      id="current_fans"
                      name="current_fans"
                      value={formData.current_fans}
                      onChange={handleChange}
                      min="0"
                      step="1"
                      inputMode="numeric"
                      className="input tabular"
                      placeholder="e.g. 500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="monthly_revenue" className="label">
                      Monthly revenue (NZD)
                    </label>
                    <input
                      type="number"
                      id="monthly_revenue"
                      name="monthly_revenue"
                      value={formData.monthly_revenue}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                      inputMode="decimal"
                      className="input tabular"
                      placeholder="e.g. 2500.00"
                      aria-describedby="revenue-help"
                    />
                    <p id="revenue-help" className="mt-2 text-sm text-ink-muted">
                      Optional — it helps us match you to the right plan. Never shared.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 border-t border-secondary-100 pt-6">
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto sm:px-8">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                        <span>Joining…</span>
                      </>
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="flex items-center gap-1.5 text-sm text-ink-muted">
                    <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
