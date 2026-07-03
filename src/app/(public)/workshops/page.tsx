import { MapPin, Globe, Monitor, FolderOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPublishedWorkshops } from '@/lib/supabase/queries'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import type { Workshop } from '@/types'

export const metadata = {
  title: 'Workshops — Albert Łukasik',
  description: 'Past workshops and talks by Albert Łukasik on AI, VR, neurotechnology, and UX research.',
}

const STATIC_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title: 'Introduction to AI in Research & Education',
    slug: 'ai-in-research-education',
    summary:
      'A hands-on session for academics and educators on integrating AI tools into research workflows, teaching practices, and data analysis. Delivered at NCU Toruń.',
    description: '',
    target_audience: 'Academics, educators, PhD students',
    duration: '3 hours',
    format: 'hybrid',
    topics: ['Large language models', 'Prompt engineering', 'AI-assisted research', 'Ethical considerations'],
    learning_outcomes: [],
    workshop_status: 'past',
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: 'VR & Biofeedback for Wellbeing',
    slug: 'vr-biofeedback-wellbeing',
    summary:
      'Experiential session exploring how virtual reality and real-time biofeedback can be used for stress regulation, mindfulness, and cognitive training. Delivered in collaboration with MindEasy.',
    description: '',
    target_audience: 'Health professionals, psychology students, wellness practitioners',
    duration: '4 hours',
    format: 'onsite',
    topics: ['VR for wellbeing', 'EEG neurofeedback', 'HRV biofeedback', 'Stress regulation neuroscience'],
    learning_outcomes: [],
    workshop_status: 'past',
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    title: 'UX Research Methods for Technology Interfaces',
    slug: 'ux-research-methods',
    summary:
      'Practical training in UX research methods — from cognitive walkthroughs to eye-tracking — applied to digital and physical interfaces. Participants conducted a mini usability study in real time.',
    description: '',
    target_audience: 'UX designers, product managers, researchers',
    duration: '6 hours',
    format: 'onsite',
    topics: ['Usability testing', 'Think-aloud protocol', 'Eye-tracking basics', 'Survey design', 'Physiological UX measures'],
    learning_outcomes: [],
    workshop_status: 'past',
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    title: 'Cognitive Science of Games & Immersive Environments',
    slug: 'cognitive-science-games',
    summary:
      'Talk and workshop presented at the 7th Summer School of Cognitive Science (Kazimierz Dolny, 2023). Covered psychological principles underlying game design: flow states, variable reward, spatial cognition, and learning in VR.',
    description: '',
    target_audience: 'Cognitive science students, game designers, educators',
    duration: '2 hours',
    format: 'onsite',
    topics: ['Flow states', 'Variable reward', 'Spatial cognition in games', 'Learning in VR', 'Attention & engagement'],
    learning_outcomes: [],
    workshop_status: 'past',
    status: 'published',
    created_at: '',
    updated_at: '',
  },
]

const formatIcons = {
  onsite: MapPin,
  online: Globe,
  hybrid: Monitor,
}

const formatLabels = {
  onsite: 'On-site',
  online: 'Online',
  hybrid: 'Hybrid',
}

export default async function WorkshopsPage() {
  let workshops: Workshop[] = []
  try {
    const supabase = await createClient()
    workshops = await getPublishedWorkshops(supabase)
  } catch {
    // static fallback
  }

  const displayWorkshops = workshops.length > 0 ? workshops : STATIC_WORKSHOPS

  return (
    <main>
      {/* ── Hero ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 80% 0%, color-mix(in srgb, #c9a86c 6%, transparent), transparent)',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Workshops"
            title="Workshops & Talks"
            description="Past sessions and invited talks on AI, virtual reality, neurotechnology, and UX research — delivered at conferences, summer schools, and academic events."
          />
        </div>
      </section>

      {/* ── Workshop list ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {displayWorkshops.length === 0 ? (
            <div className="text-center py-24">
              <FolderOpen size={40} className="text-da-text-faint mx-auto mb-4" />
              <p className="text-da-text-muted">No workshops listed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayWorkshops.map((workshop) => {
                const FormatIcon = formatIcons[workshop.format] ?? Monitor
                return (
                  <div key={workshop.id} className="da-card p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-4 text-xs text-da-text-faint">
                      <FormatIcon size={12} className="text-da-accent" />
                      <span>{formatLabels[workshop.format]}</span>
                      {workshop.duration && (
                        <>
                          <span>·</span>
                          <span>{workshop.duration}</span>
                        </>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-semibold text-da-text leading-snug mb-3">
                      {workshop.title}
                    </h3>

                    <p className="text-sm text-da-text-muted leading-relaxed flex-1 mb-4">
                      {workshop.summary}
                    </p>

                    {workshop.topics && workshop.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {workshop.topics.slice(0, 4).map((topic) => (
                          <Badge key={topic} variant="muted">{topic}</Badge>
                        ))}
                        {workshop.topics.length > 4 && (
                          <Badge variant="muted">+{workshop.topics.length - 4} more</Badge>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
