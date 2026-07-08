import Link from 'next/link'
import { ArrowRight, FolderOpen } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPublishedProjects } from '@/lib/supabase/queries'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import type { Project } from '@/types'
import { formatDateShort, truncate } from '@/lib/utils'

export const metadata = {
  title: 'Research — Albert Łukasik',
  description: 'Academic research, UX studies, VR education experiments, and AI workshop projects by Albert Łukasik.',
}

const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ArtificialBond — Human–AI Relationship Discourse Analyzer',
    slug: 'artificial-bond',
    summary: 'NLP-powered tool analyzing Reddit discourse around human–AI romantic and social relationships, built with Python and deployed publicly on GitHub.',
    description: '',
    project_type: 'AI Research',
    role: 'Lead Developer & Researcher',
    methods: ['NLP', 'Discourse Analysis', 'Computational Linguistics'],
    technologies: ['Python', 'Reddit API', 'NLP'],
    start_date: '2023-01-01',
    project_status: 'ongoing',
    links: [{ label: 'GitHub', url: 'https://github.com/AlbertL97/artificialbond', type: 'github' }],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    title: 'Intentionality & Emotion Attribution in Artificial Agents',
    slug: 'intentionality-artificial-agents',
    summary: 'PhD thesis research — examining how perceptual cues (motion, form, voice) affect how observers attribute mental states to artificial agents.',
    description: '',
    project_type: 'Academic Research',
    role: 'PhD Researcher',
    methods: ['Experimental Psychology', 'Psychophysics', 'EEG', 'Questionnaire design'],
    technologies: ['PsychoPy', 'OpenBCI', 'R', 'Python'],
    start_date: '2023-10-01',
    project_status: 'ongoing',
    links: [],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '5',
    title: 'VR Biofeedback for Cognitive Enhancement',
    slug: 'vr-biofeedback',
    summary: 'Design and evaluation of a VR-based biofeedback training environment for stress regulation and attentional control.',
    description: '',
    project_type: 'VR Education',
    role: 'UX Researcher & Designer',
    methods: ['User Testing', 'Biofeedback', 'VR Design'],
    technologies: ['Unity', 'OpenBCI', 'Oculus'],
    start_date: '2021-06-01',
    end_date: '2022-12-01',
    project_status: 'completed',
    links: [],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
]

const PROJECT_TYPES = ['All', 'Academic Research', 'UX Research', 'VR Education', 'AI Research', 'AI Workshop']

function statusVariant(status: string) {
  if (status === 'ongoing') return 'success'
  if (status === 'planned') return 'accent'
  if (status === 'archived') return 'error'
  return 'muted'
}

export default async function ResearchPage() {
  let projects: Project[] = []
  try {
    const supabase = await createClient()
    projects = await getPublishedProjects(supabase)
  } catch {
    // static fallback
  }

  const displayProjects = projects.length > 0 ? projects : STATIC_PROJECTS
  const types = Array.from(new Set(displayProjects.map((p) => p.project_type)))

  return (
    <main>
      {/* ── Hero ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 30% 0%, color-mix(in srgb, #c9a86c 6%, transparent), transparent)',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Research"
            title="Research & Projects"
            description="A collection of academic research, UX studies, VR experiments, and applied AI projects exploring the boundaries of human cognition and technology."
          />
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Filter hint (static labels — filter would need client component) */}
          <div className="flex flex-wrap gap-2 mb-10">
            {['All', ...types].map((type, i) => (
              <span
                key={type}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors cursor-default ${
                  i === 0
                    ? 'bg-da-accent-dim text-da-accent border-da-accent/30'
                    : 'bg-da-surface border-da-border text-da-text-muted'
                }`}
              >
                {type}
              </span>
            ))}
          </div>

          {displayProjects.length === 0 ? (
            <div className="text-center py-24">
              <FolderOpen size={40} className="text-da-text-faint mx-auto mb-4" />
              <p className="text-da-text-muted">No projects published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/research/${project.slug}`}
                  className="group da-card p-6 flex flex-col"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <Badge variant="accent">{project.project_type}</Badge>
                    <Badge variant={statusVariant(project.project_status)}>
                      {project.project_status}
                    </Badge>
                    {project.start_date && (
                      <span className="text-xs text-da-text-faint ml-auto">
                        {formatDateShort(project.start_date)}
                        {project.end_date ? ` – ${formatDateShort(project.end_date)}` : ' – present'}
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-xl font-semibold text-da-text leading-snug mb-3 group-hover:text-da-accent transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-sm text-da-text-muted leading-relaxed flex-1">
                    {truncate(project.summary, 180)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.methods.slice(0, 4).map((m) => (
                      <Badge key={m} variant="muted">{m}</Badge>
                    ))}
                  </div>

                  <span className="mt-4 inline-flex items-center gap-1 text-xs text-da-accent group-hover:gap-2 transition-all">
                    View details <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
