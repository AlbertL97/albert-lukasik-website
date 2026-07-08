import Link from 'next/link'
import { Globe, AtSign, BookOpen } from 'lucide-react'

function FlipboardMark({ size = 18 }: { size?: number }) {
  return (
    <span
      aria-hidden
      style={{
        fontSize: size,
        lineHeight: 1,
        fontWeight: 700,
        fontFamily: 'Georgia, "Playfair Display", serif',
      }}
      className="select-none"
    >
      F
    </span>
  )
}

const socialLinks = [
  {
    href: 'https://www.linkedin.com/in/albert-lukasik/',
    label: 'LinkedIn',
    icon: Globe,
  },
  {
    href: 'https://www.instagram.com/anythinghri/',
    label: 'Instagram',
    icon: AtSign,
  },
  {
    href: 'https://scholar.google.com/citations?user=wNO8LmUAAAAJ',
    label: 'Google Scholar',
    icon: BookOpen,
  },
  {
    href: 'https://flipboard.com/@Albertukasik',
    label: 'Flipboard',
    icon: FlipboardMark,
  },
]

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/teaching', label: 'Teaching' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-da-border-subtle bg-da-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg font-semibold text-da-text mb-2">
              Albert Łukasik
            </p>
            <p className="text-sm text-da-text-muted leading-relaxed">
              PhD Researcher · VR Educator · UX Researcher
            </p>
            <p className="text-sm text-da-text-faint mt-1">
              Toruń, Poland
            </p>
          </div>

          {/* Nav links */}
          <div>
            <p className="da-label mb-3">Sections</p>
            <ul className="space-y-1.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-da-text-muted hover:text-da-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="da-label mb-3">Connect</p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-md text-da-text-muted hover:text-da-accent hover:bg-da-surface-raised transition-colors"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-da-text-muted">
              <a href="mailto:lukasik.albert@proton.me" className="hover:text-da-accent transition-colors">
                lukasik.albert@proton.me
              </a>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-da-border-subtle flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-da-text-faint">
          <p>© {new Date().getFullYear()} Albert Łukasik. All rights reserved.</p>
          <p>
            <Link href="/resources" className="hover:text-da-text-muted transition-colors">
              External links & profiles →
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
