import { BookOpen, Users, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPublishedTeachingEntries } from '@/lib/supabase/queries'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import type { TeachingEntry } from '@/types'

export const metadata = {
  title: 'Teaching — Albert Łukasik',
  description: 'Courses taught by Albert Łukasik at Nicolaus Copernicus University, Toruń.',
}

const STATIC_ENTRIES: TeachingEntry[] = [
  {
    id: '1',
    course_title: 'Neuroscience of Higher Cognitive Processes',
    description:
      'Advanced undergraduate course examining the neural underpinnings of executive function, decision-making, language, and consciousness. Combines lectures with data interpretation workshops using published neuroimaging datasets.',
    institution: 'Nicolaus Copernicus University (NCU), Toruń',
    academic_year: '2024/2025 & 2025/2026',
    level: 'undergraduate',
    topics: ['Executive function', 'Prefrontal cortex', 'Decision-making', 'Language & Broca', 'Consciousness', 'Neuroimaging'],
    status: 'published',
    display_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    course_title: 'Neuroscience of Attentional and Perceptual Processes',
    description:
      'Second-year course covering the neural mechanisms of attention, visual and auditory perception, and multisensory integration. Includes practical EEG demonstrations and analysis of event-related potentials (ERPs).',
    institution: 'Nicolaus Copernicus University (NCU), Toruń',
    academic_year: '2024/2025',
    level: 'undergraduate',
    topics: ['Selective attention', 'Visual cortex', 'Auditory pathways', 'ERP / EEG', 'Multisensory integration', 'Top-down vs bottom-up'],
    status: 'published',
    display_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    course_title: 'Introduction to Cognitive Science',
    description:
      'Co-taught with Prof. Włodzisław Duch. Interdisciplinary survey of cognitive science spanning philosophy of mind, computational neuroscience, cognitive psychology, linguistics, and artificial intelligence. Designed for first-year students.',
    institution: 'Nicolaus Copernicus University (NCU), Toruń',
    academic_year: '2023/2024',
    level: 'undergraduate',
    topics: ['Philosophy of mind', 'Computational models', 'Cognitive psychology', 'Linguistics & NLP', 'AI & cognition', 'Embodied cognition'],
    status: 'published',
    display_order: 3,
    created_at: '',
    updated_at: '',
  },
]

const levelLabels: Record<string, string> = {
  undergraduate: 'Undergraduate',
  graduate: 'Graduate',
  workshop: 'Workshop',
  open: 'Open',
}

const levelVariants: Record<string, 'accent' | 'success' | 'default' | 'muted'> = {
  undergraduate: 'accent',
  graduate: 'success',
  workshop: 'default',
  open: 'muted',
}

export default async function TeachingPage() {
  let entries: TeachingEntry[] = []
  try {
    const supabase = await createClient()
    entries = await getPublishedTeachingEntries(supabase)
  } catch {
    // static fallback
  }

  const displayEntries = entries.length > 0 ? entries : STATIC_ENTRIES

  // Group by academic year
  const byYear = displayEntries.reduce<Record<string, TeachingEntry[]>>((acc, entry) => {
    const key = entry.academic_year
    if (!acc[key]) acc[key] = []
    acc[key].push(entry)
    return acc
  }, {})

  const sortedYears = Object.keys(byYear).sort((a, b) => b.localeCompare(a))

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
            label="Teaching"
            title="Teaching"
            description="Courses delivered at Nicolaus Copernicus University, Toruń, covering neuroscience, cognitive science, and human–technology interaction."
          />
        </div>
      </section>

      {/* ── Courses ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {displayEntries.length === 0 ? (
            <div className="text-center py-24">
              <BookOpen size={40} className="text-da-text-faint mx-auto mb-4" />
              <p className="text-da-text-muted">No teaching entries published yet.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {sortedYears.map((year) => (
                <div key={year}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-serif text-xl font-semibold text-da-accent whitespace-nowrap">
                      {year}
                    </h2>
                    <div className="flex-1 h-px bg-da-border-subtle" />
                  </div>

                  <div className="space-y-5">
                    {byYear[year].map((entry) => (
                      <div key={entry.id} className="da-card p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <Badge variant={levelVariants[entry.level] ?? 'default'}>
                                {levelLabels[entry.level] ?? entry.level}
                              </Badge>
                            </div>

                            <h3 className="font-serif text-xl font-semibold text-da-text leading-snug">
                              {entry.course_title}
                            </h3>

                            <div className="flex items-center gap-1.5 mt-2 mb-4">
                              <Users size={13} className="text-da-accent" />
                              <span className="text-sm text-da-text-muted">{entry.institution}</span>
                            </div>

                            <p className="text-sm text-da-text-muted leading-relaxed">
                              {entry.description}
                            </p>

                            {entry.topics && entry.topics.length > 0 && (
                              <div className="mt-4">
                                <p className="da-label mb-2">Topics covered</p>
                                <div className="flex flex-wrap gap-1.5">
                                  {entry.topics.map((topic) => (
                                    <Badge key={topic} variant="muted">{topic}</Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {entry.materials_url && (
                          <div className="mt-5 pt-4 border-t border-da-border-subtle">
                            <a
                              href={entry.materials_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-da-accent hover:text-da-accent-hover transition-colors"
                            >
                              <ExternalLink size={12} />
                              Course materials
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Teaching philosophy note */}
          <div className="mt-16 da-card p-8 text-center">
            <BookOpen size={28} className="text-da-accent mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold text-da-text mb-3">
              Teaching Philosophy
            </h3>
            <p className="text-da-text-muted text-sm leading-relaxed max-w-2xl mx-auto">
              I believe in active, inquiry-driven learning. My courses blend theoretical foundations with
              hands-on data exploration, encouraging students to question assumptions, critically evaluate
              evidence, and connect neuroscience to real-world technology and design challenges.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
