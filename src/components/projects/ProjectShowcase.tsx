import { ExternalLink, GitBranch, Globe } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'

export interface ProjectShowcaseProps {
  label: string
  title: string
  tagline: string
  description: string[]
  liveUrl: string
  githubUrl: string
  features: string[]
  tags: string[]
  embedTitle: string
}

export default function ProjectShowcase({
  label,
  title,
  tagline,
  description,
  liveUrl,
  githubUrl,
  features,
  tags,
  embedTitle,
}: ProjectShowcaseProps) {
  const displayHost = liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <main>
      {/* ── Hero ── */}
      <section className="py-20 sm:py-24 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, color-mix(in srgb, #c9a86c 6%, transparent), transparent)',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label={label} title={title} description={tagline} />

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#0c0b10' }}
              className="inline-flex items-center gap-2 bg-da-accent px-6 py-3 rounded-lg font-semibold text-sm hover:bg-da-accent-hover transition-colors"
            >
              <Globe size={16} />
              Open live site
              <ExternalLink size={15} />
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-da-border text-da-text px-6 py-3 rounded-lg font-medium text-sm hover:border-da-text-muted transition-colors bg-da-surface"
            >
              <GitBranch size={16} />
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Live embed ── */}
      <section className="pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="da-card overflow-hidden">
            {/* Faux browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-da-border-subtle bg-da-surface-raised">
              <span className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-da-text-faint/50" />
                <span className="w-3 h-3 rounded-full bg-da-text-faint/50" />
                <span className="w-3 h-3 rounded-full bg-da-text-faint/50" />
              </span>
              <span className="ml-3 flex-1 truncate text-xs text-da-text-muted bg-da-bg rounded-md px-3 py-1 border border-da-border-subtle">
                {displayHost}
              </span>
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-da-accent hover:text-da-accent-hover inline-flex items-center gap-1"
              >
                Open <ExternalLink size={12} />
              </a>
            </div>
            <iframe
              src={liveUrl}
              title={embedTitle}
              loading="lazy"
              className="w-full h-[70vh] min-h-[520px] bg-white"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </div>
          <p className="mt-3 text-xs text-da-text-faint text-center">
            Live preview embedded from{' '}
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-da-accent">
              {displayHost}
            </a>
            . If it doesn&apos;t load, open the live site directly using the button above.
          </p>
        </div>
      </section>

      {/* ── About ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionHeader label="Overview" title="About this project" className="mb-6" />
              <div className="space-y-4 text-da-text-muted leading-relaxed">
                {description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <Badge key={t} variant="muted">{t}</Badge>
                  ))}
                </div>
              )}
            </div>

            {features.length > 0 && (
              <div className="da-card p-6 h-fit">
                <p className="da-label mb-4">Key features</p>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-da-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-da-accent flex-shrink-0 mt-2" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
