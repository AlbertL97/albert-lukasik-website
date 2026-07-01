import { ExternalLink, Globe, AtSign, BookOpen, Rss, Link2, GitBranch } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPublishedExternalLinks } from '@/lib/supabase/queries'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import type { ExternalLink as ExternalLinkType } from '@/types'

export const metadata = {
  title: 'Resources — Albert Łukasik',
  description: 'External profiles, academic links, and resources from Albert Łukasik.',
}

const STATIC_LINKS: ExternalLinkType[] = [
  {
    id: '1',
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/albert-lukasik/',
    description: 'Professional profile, publications, and career updates',
    platform: 'linkedin',
    category: 'social',
    display_order: 1,
    status: 'published',
    created_at: '',
  },
  {
    id: '2',
    title: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=wNO8LmUAAAAJ',
    description: 'Academic citations, publications, and research metrics',
    platform: 'scholar',
    category: 'academic',
    display_order: 2,
    status: 'published',
    created_at: '',
  },
  {
    id: '3',
    title: 'Instagram',
    url: 'https://www.instagram.com/anythinghri/',
    description: 'Visual updates from research, travel, and everyday life',
    platform: 'instagram',
    category: 'social',
    display_order: 3,
    status: 'published',
    created_at: '',
  },
  {
    id: '4',
    title: 'Flipboard',
    url: 'https://flipboard.com/@Albertukasik',
    description: 'Curated articles on cognitive science, AI, and neurotechnology',
    platform: 'flipboard',
    category: 'social',
    display_order: 4,
    status: 'published',
    created_at: '',
  },
  {
    id: '5',
    title: 'GitHub — AlbertL97',
    url: 'https://github.com/AlbertL97',
    description: 'Open-source projects including ArtificialBond and Biosignal Cockpit',
    platform: 'github',
    category: 'project',
    display_order: 5,
    status: 'published',
    created_at: '',
  },
  {
    id: '6',
    title: 'MindEasy',
    url: 'https://mindeasy.pl',
    description: 'Neurotechnology startup co-founded — VR regenerative retreats and biofeedback training',
    platform: 'website',
    category: 'project',
    display_order: 6,
    status: 'published',
    created_at: '',
  },
]

const PLATFORM_ICONS: Record<string, React.ElementType> = {
  linkedin: Globe,
  instagram: AtSign,
  scholar: BookOpen,
  flipboard: Rss,
  github: GitBranch,
  linktree: Link2,
  website: Globe,
}

const CATEGORY_LABELS: Record<string, string> = {
  social: 'Social Media',
  academic: 'Academic Profiles',
  project: 'Projects & Startups',
  other: 'Other Resources',
}

const CATEGORY_ORDER = ['academic', 'social', 'project', 'other']

export default async function ResourcesPage() {
  let links: ExternalLinkType[] = []
  try {
    const supabase = await createClient()
    links = await getPublishedExternalLinks(supabase)
  } catch {
    // static fallback
  }

  const displayLinks = links.length > 0 ? links : STATIC_LINKS

  const byCategory = displayLinks.reduce<Record<string, ExternalLinkType[]>>((acc, link) => {
    const cat = link.category || 'other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(link)
    return acc
  }, {})

  const sortedCategories = CATEGORY_ORDER.filter((c) => byCategory[c])
  const remainingCategories = Object.keys(byCategory).filter(
    (c) => !CATEGORY_ORDER.includes(c)
  )
  const allCategories = [...sortedCategories, ...remainingCategories]

  return (
    <main>
      {/* ── Hero ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 60% 0%, color-mix(in srgb, #c9a86c 6%, transparent), transparent)',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Links"
            title="External Resources"
            description="Academic profiles, social media, and project links — all in one place."
          />
        </div>
      </section>

      {/* ── Links by category ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-14">
          {allCategories.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-serif text-xl font-semibold text-da-text whitespace-nowrap">
                  {CATEGORY_LABELS[category] ?? category}
                </h2>
                <div className="flex-1 h-px bg-da-border-subtle" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {byCategory[category].map((link) => {
                  const Icon = PLATFORM_ICONS[link.platform ?? ''] ?? Globe
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group da-card p-5 flex items-start gap-4 hover:border-da-accent/30 transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-da-surface-raised border border-da-border flex items-center justify-center group-hover:border-da-accent/30 group-hover:bg-da-accent-dim transition-colors">
                        <Icon size={18} className="text-da-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm text-da-text group-hover:text-da-accent transition-colors">
                            {link.title}
                          </p>
                          <ExternalLink
                            size={11}
                            className="text-da-text-faint flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        {link.description && (
                          <p className="text-xs text-da-text-muted mt-1 leading-relaxed">
                            {link.description}
                          </p>
                        )}
                        <p className="text-xs text-da-text-faint mt-1 truncate">
                          {link.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
