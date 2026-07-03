import { Mail, Globe, MapPin, Clock, ExternalLink } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import ContactForm from '@/components/contact/ContactForm'

export const metadata = {
  title: 'Contact — Albert Łukasik',
  description: 'Get in touch with Albert Łukasik — researcher, educator, and UX specialist.',
}

const CONTACT_METHODS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'lukasik.albert@proton.me',
    href: 'mailto:lukasik.albert@proton.me',
    description: 'Best for research enquiries and formal communication',
  },
  {
    icon: Globe,
    label: 'LinkedIn',
    value: 'albert-lukasik',
    href: 'https://www.linkedin.com/in/albert-lukasik/',
    description: 'Connect professionally or message me directly',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Toruń, Poland',
    href: null,
    description: 'Open to remote collaboration worldwide',
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Usually within 3–5 days',
    href: null,
    description: 'I aim to respond to all genuine enquiries',
  },
]

const TOPICS = [
  'Research collaboration',
  'VR / AR project consulting',
  'Workshop booking',
  'Media & press',
  'Academic questions',
  'UX research consulting',
]

export default function ContactPage() {
  return (
    <main>
      {/* ── Hero ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 40% 0%, color-mix(in srgb, #c9a86c 6%, transparent), transparent)',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Get in touch"
            title="Let's Connect"
            description="Whether you want to discuss research, book a workshop, collaborate on a project, or just say hello — I'd love to hear from you."
          />
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* ── Sidebar ── */}
            <aside className="lg:col-span-2 space-y-6">
              {/* Contact methods */}
              <div className="space-y-4">
                {CONTACT_METHODS.map((method) => {
                  const Icon = method.icon
                  const content = (
                    <div className="da-card p-4 flex items-start gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-da-accent-dim border border-da-accent/20 flex items-center justify-center">
                        <Icon size={16} className="text-da-accent" />
                      </div>
                      <div>
                        <p className="da-label">{method.label}</p>
                        <p className="text-sm font-medium text-da-text mt-0.5">{method.value}</p>
                        <p className="text-xs text-da-text-muted mt-1">{method.description}</p>
                      </div>
                      {method.external && (
                        <ExternalLink size={12} className="ml-auto text-da-text-faint flex-shrink-0" />
                      )}
                    </div>
                  )

                  if (method.href) {
                    return (
                      <a
                        key={method.label}
                        href={method.href}
                        target={method.external ? '_blank' : undefined}
                        rel={method.external ? 'noopener noreferrer' : undefined}
                        className="block hover:no-underline group"
                      >
                        <div className="da-card p-4 flex items-start gap-4 group-hover:border-da-accent/30 transition-colors">
                          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-da-accent-dim border border-da-accent/20 flex items-center justify-center">
                            <Icon size={16} className="text-da-accent" />
                          </div>
                          <div>
                            <p className="da-label">{method.label}</p>
                            <p className="text-sm font-medium text-da-text mt-0.5 group-hover:text-da-accent transition-colors">
                              {method.value}
                            </p>
                            <p className="text-xs text-da-text-muted mt-1">{method.description}</p>
                          </div>
                          {method.external && (
                            <ExternalLink size={12} className="ml-auto text-da-text-faint flex-shrink-0" />
                          )}
                        </div>
                      </a>
                    )
                  }

                  return (
                    <div key={method.label} className="da-card p-4 flex items-start gap-4">
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-da-surface-raised border border-da-border flex items-center justify-center">
                        <Icon size={16} className="text-da-accent" />
                      </div>
                      <div>
                        <p className="da-label">{method.label}</p>
                        <p className="text-sm font-medium text-da-text mt-0.5">{method.value}</p>
                        <p className="text-xs text-da-text-muted mt-1">{method.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* What I can help with */}
              <div className="da-card p-5">
                <p className="da-label mb-3">I can help with</p>
                <ul className="space-y-2">
                  {TOPICS.map((topic) => (
                    <li key={topic} className="flex items-center gap-2 text-sm text-da-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-da-accent flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* ── Form ── */}
            <div className="lg:col-span-3">
              <div className="da-card p-8">
                <h2 className="font-serif text-2xl font-semibold text-da-text mb-2">
                  Send a message
                </h2>
                <p className="text-sm text-da-text-muted mb-8 leading-relaxed">
                  Fill in the form below and I&apos;ll get back to you. All fields marked with{' '}
                  <span className="text-da-error">*</span> are required.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
