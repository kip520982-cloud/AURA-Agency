import { Mail, MapPin } from 'lucide-react'
import Logo from './Logo'

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@fanflow.nz'

const productLinks = [
  { href: '#features', label: 'Features' },
  { href: '#transparency', label: 'Transparency' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#waitlist', label: 'Join waitlist' },
]

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                FanFlow <span className="text-primary-400">NZ</span>
              </span>
            </div>
            <p className="mt-4 max-w-md leading-relaxed text-white/70">
              Smart Creator Management, Made in NZ. The only platform that offers complete
              transparency in fan management, revenue tracking, and AI automation.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-white/60">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
              Auckland, New Zealand
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="rounded text-white/75 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/50">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a href="#about" className="rounded text-white/75 transition-colors hover:text-primary-400">
                  About
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2 rounded text-white/75 transition-colors hover:text-primary-400"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="text-sm text-white/55">
              © {new Date().getFullYear()} FanFlow NZ. All rights reserved.
            </p>
            <p className="text-sm text-white/55">Built with ❤️ in Auckland, New Zealand</p>
          </div>
          <p className="mt-6 text-center text-xs leading-relaxed text-white/40 sm:text-left">
            OnlyFans and Fansly are trademarks of their respective owners. FanFlow NZ is an
            independent tool and is not affiliated with, endorsed by, or sponsored by them.
          </p>
        </div>
      </div>
    </footer>
  )
}
