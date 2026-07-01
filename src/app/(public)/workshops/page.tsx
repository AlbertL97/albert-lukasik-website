import { Users, Clock, Monitor, MapPin, Globe, FolderOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPublishedWorkshops } from '@/lib/supabase/queries'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import type { Workshop } from '@/types'
import Link from 'next/link'

export const metadata = {
  title: 'Workshops — Albert Łukasik',
  description: 'Workshops by Albert Łukasik on AI, VR, neurotechnology, and UX research.',
}

const STATIC_WORKSHOPS: Workshop[] = [
  {
    id: '1',
    title: 'Introduction to AI in Research & Education',
    slug: 'ai-in-research-education',
    summary:
      'A hands-on workshop for academics and educators on integrating AI tools into research workflows, teaching practices, and data analysis.',
    description:
      'This workshop provides a practical introduction to large language models, prompt engineering, and AI-assisted research tools. Participants learn to leverage AI for literature synthesis, qualitative coding, statistical reasoning, and educational content design. No prior programming experience required.',
    target_audience: 'Academics, educators, PhD students',
    duration: '3 hours',
    format: 'hybrid',
    topics: ['Large language models', 'Prompt engineering', 'AI-assisted research', 'Academic writing support', 'Ethical considerations'],
    learning_outcomes: [
      'Understand core capabilities and limitations of current AI systems',
      'Apply prompt engineering techniques for research tasks',
      'Critically evaluate AI-generated content',
      'Integrate AI tools responsibly into academic workflows',
    ],
    workshop_status: 'available',
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: 'VR & Biofeedback for Wellbeing',
    slug: 'vr-biofeedback-wellbeing',
    summary:
      'An experiential workshop exploring how virtual reality and real-time biofeedback can be used for stress regulation, mindfulness, and cognitive training.',
    description:
      'Participants experience VR mindscapes calibrated to physiological state via EEG and HRV biofeedback. The workshop covers the neuroscience behind relaxation and attention, practical demonstrations with VR headsets and biosensors, and design principles for therapeutic XR environments. Delivered in collaboration with MindEasy.',
    target_audience: 'Health professionals, psychology students, wellness practitioners',
    duration: '4 hours',
    format: 'onsite',
    topics: ['VR for wellbeing', 'EEG neurofeedback', 'HRV biofeedback', 'Stress regulation neuroscience', 'XR design principles'],
    learning_outcomes: [
      'Experience biofeedback-adaptive VR environments firsthand',
      'Understand physiological markers of stress and relaxation',
      'Evaluate the evidence base for VR therapeutic applications',
      'Apply basic design principles for wellbeing-oriented XR',
    ],
    workshop_status: 'available',
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    title: 'UX Research Methods for Technology Interfaces',
    slug: 'ux-research-methods',
    summary:
      'Practical training in user experience research methods — from cognitive walkthroughs to eye-tracking — applied to digital and physical interfaces.',
    description:
      'This workshop introduces the core toolkit of UX research: usability testing, think-aloud protocols, eye-tracking, physiological measures, and survey design. Participants conduct a mini usability study in real time and interpret the data. Suitable for designers, product teams, and researchers entering UX.',
    target_audience: 'UX designers, product managers, researchers',
    duration: '6 hours (full day)',
    format: 'onsite',
    topics: ['Usability testing', 'Think-aloud protocol', 'Eye-tracking basics', 'Survey design', 'Physiological UX measures', 'Data analysis'],
    learning_outcomes: [
      'Plan and execute a basic usability study',
      'Collect and interpret qualitative UX data',
      'Apply physiological measurement in UX contexts',
      'Report findings effectively to stakeholders',
    ],
    workshop_status: 'available',
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    title: 'Cognitive Science of Games & Immersive Environments',
    slug: 'cognitive-science-games',
    summary:
      'A talk and workshop exploring what cognitive science tells us about attention, memory, motivation, and learning in game environments.',
    description:
      'Presented at the 7th Summer School of Cognitive Science (Kazimierz Dolny, 2023), this session covers the psychological principles underlying game design: flow states, variable reward schedules, spatial cognition in 3D environments, and the controversial question of whether video games improve cognition. Includes interactive demonstrations.',
    target_audience: 'Cognitive science students, game designers, educators',
    duration: '2 hours',
    format: 'onsite',
    topics: ['Flow states', 'Variable reward', 'Spatial cognition in games', 'Learning in VR', 'Attention & engagement'],
    learning_outcomes: [
      'Apply cognitive science concepts to game design critique',
      'Understand the neuroscience of immersive environments',
      'Evaluate claims about cognitive training games',
    ],
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

function statusVariant(status: string): 'success' | 'muted' | 'accent' | 'default' {
  if (status === 'available') return 'success'
  if (status === 'planned') return 'accent'
  return 'muted'
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

  const available = displayWorkshops.filter((w) => w.workshop_status === 'available')
  const past = displayWorkshops.filter((w) => w.workshop_status === 'past' || w.workshop_status === 'archived')
  const planned = displayWorkshops.filter((w) => w.workshop_status === 'planned')

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
            description="Practical sessions and invited talks on AI, virtual reality, neurotechnology, and UX research — for academics, students, and professionals."
          />
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-da-accent text-da-bg px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-da-accent-hover transition-colors"
            >
              Enquire about a workshop
            </Link>
          </div>
        </div>
      </section>

      {/* ── Available workshops ── */}
      {available.length > 0 && (
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-2xl font-semibold text-da-text whitespace-nowrap">
                Available Now
              </h2>
              <div className="flex-1 h-px bg-da-border-subtle" />
            </div>
            <WorkshopGrid workshops={available} />
          </div>
        </section>
      )}

      {/* ── Planned ── */}
      {planned.length > 0 && (
        <section className="pb-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-2xl font-semibold text-da-text whitespace-nowrap">
                Coming Soon
              </h2>
              <div className="flex-1 h-px bg-da-border-subtle" />
            </div>
            <WorkshopGrid workshops={planned} />
          </div>
        </section>
      )}

      {/* ── Past workshops ── */}
      {past.length > 0 && (
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-serif text-2xl font-semibold text-da-text-muted whitespace-nowrap">
                Past Sessions
              </h2>
              <div className="flex-1 h-px bg-da-border-subtle" />
            </div>
            <WorkshopGrid workshops={past} muted />
          </div>
        </section>
      )}

      {displayWorkshops.length === 0 && (
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center py-24">
            <FolderOpen size={40} className="text-da-text-faint mx-auto mb-4" />
            <p className="text-da-text-muted">No workshops listed yet. Check back soon.</p>
          </div>
        </section>
      )}
    </main>
  )
}

function WorkshopGrid({ workshops, muted = false }: { workshops: Workshop[]; muted?: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {workshops.map((workshop) => {
        const FormatIcon = formatIcons[workshop.format] ?? Monitor
        return (
          <div key={workshop.id} className={`da-card p-6 flex flex-col ${muted ? 'opacity-70' : ''}`}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant={statusVariant(workshop.workshop_status)}>
                {workshop.workshop_status}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-da-text-faint">
                <FormatIcon size={11} />
                {formatLabels[workshop.format]}
              </span>
            </div>

            <h3 className="font-serif text-xl font-semibold text-da-text leading-snug mb-3">
              {workshop.title}
            </h3>

            <p className="text-sm text-da-text-muted leading-relaxed flex-1 mb-4">
              {workshop.summary}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-xs text-da-text-faint mb-4">
              {workshop.duration && (
                <span className="flex items-center gap-1">
                  <Clock size={11} className="text-da-accent" />
                  {workshop.duration}
                </span>
              )}
              {workshop.target_audience && (
                <span className="flex items-center gap-1">
                  <Users size={11} className="text-da-accent" />
                  {workshop.target_audience}
                </span>
              )}
            </div>

            {/* Topics */}
            {workshop.topics && workshop.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {workshop.topics.slice(0, 4).map((topic) => (
                  <Badge key={topic} variant="muted">{topic}</Badge>
                ))}
                {workshop.topics.length > 4 && (
                  <Badge variant="muted">+{workshop.topics.length - 4} more</Badge>
                )}
              </div>
            )}

            {/* Learning outcomes */}
            {workshop.learning_outcomes && workshop.learning_outcomes.length > 0 && (
              <div className="mt-2 pt-4 border-t border-da-border-subtle">
                <p className="da-label mb-2">You will learn to</p>
                <ul className="space-y-1.5">
                  {workshop.learning_outcomes.slice(0, 3).map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-xs text-da-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-da-accent flex-shrink-0 mt-1.5" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
