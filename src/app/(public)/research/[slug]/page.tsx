import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, GitBranch, ExternalLink, FileText, Monitor, Presentation, Calendar, User, FlaskConical } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getProjectBySlug, getPublishedProjects } from '@/lib/supabase/queries'
import Badge from '@/components/ui/Badge'
import type { Project, ProjectLink } from '@/types'
import { formatDateShort } from '@/lib/utils'
import type { Metadata } from 'next'

/* Static fallback projects */
const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ArtificialBond — Human–AI Relationship Discourse Analyzer',
    slug: 'artificial-bond',
    summary: 'NLP-powered tool analyzing Reddit discourse around human–AI romantic and social relationships.',
    description: `ArtificialBond is a computational discourse analysis tool built to study how people discuss relationships with artificial intelligence on Reddit. Using NLP techniques including topic modelling (LDA), sentiment analysis, and named-entity recognition, the tool surfaces themes, emotional valence, and community narratives around parasocial bonds with AI systems.

The project was motivated by the rapid rise of AI companions (character.ai, Replika, etc.) and the lack of systematic empirical data on how people frame and experience these relationships in online communities. By analyzing large corpora of Reddit posts across multiple subreddits, we identified recurring discourse patterns including anthropomorphization, emotional dependency, and ethical concerns.

Key findings highlighted that users predominantly framed AI relationships as supplementary rather than replacements for human connection, though a significant minority expressed strong emotional bonds. The tool is fully open-sourced on GitHub.`,
    project_type: 'AI Research',
    role: 'Lead Developer & Researcher',
    methods: ['NLP', 'Discourse Analysis', 'Computational Linguistics', 'Topic Modelling', 'Sentiment Analysis'],
    technologies: ['Python', 'Reddit API (PRAW)', 'NLTK', 'spaCy', 'gensim', 'matplotlib'],
    collaborators: 'Independent project with academic supervision',
    start_date: '2023-01-01',
    end_date: '2023-12-01',
    project_status: 'completed',
    links: [
      { label: 'GitHub', url: 'https://github.com/AlbertL97/artificialbond', type: 'github' },
    ],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: 'Biosignal Cockpit — Quantified Self Dashboard',
    slug: 'biosignal-cockpit',
    summary: 'Personal health intelligence dashboard integrating Apple Health, genome VCF files, and 379 Nebula reports.',
    description: `Biosignal Cockpit is an open-source quantified-self platform that aggregates multi-modal personal health data into a single interactive dashboard. The system integrates three primary data sources: Apple Health exports (activity, sleep, HRV, ECG), genome VCF files from Nebula Genomics (379 reports across polygenic risk scores, traits, and pharmacogenomics), and manually logged biometric entries.

The frontend is a React/TypeScript SPA with data visualisations using Recharts, organized across 9 body-system domains (cardiovascular, metabolic, neurological, etc.). The backend is a FastAPI service that pre-processes raw health exports, normalises genome data, and serves a RESTful API.

The project was built with a multi-agent AI pipeline (Claude Code) and represents a prototype for personalized health intelligence interfaces. It is publicly deployed on GitHub Pages.`,
    project_type: 'UX Research',
    role: 'Designer & Developer',
    methods: ['Data Visualization', 'UX Design', 'Multi-agent Development', 'Information Architecture'],
    technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'Recharts', 'Tailwind CSS'],
    start_date: '2024-01-01',
    project_status: 'ongoing',
    links: [
      { label: 'Demo', url: 'https://albertl97.github.io/biosignal-cockpit/', type: 'demo' },
      { label: 'GitHub', url: 'https://github.com/AlbertL97/biosignal-cockpit', type: 'github' },
    ],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    title: 'Depth Perception in Augmented Reality',
    slug: 'ar-depth-perception',
    summary: 'Experimental study examining how virtual object properties affect depth judgement in mixed-reality environments.',
    description: `This experimental study investigated how perceptual properties of virtual objects — specifically size, luminance, stereoscopic disparity, and motion parallax — affect depth judgement accuracy in an AR headset environment.

Participants performed depth-matching tasks using a Microsoft HoloLens 2, comparing virtual target objects at varying depths with physical reference objects. Manipulating the perceptual cues independently revealed that stereoscopic disparity was the dominant cue, but luminance and texture gradient cues provided significant supplementary information.

The findings were presented at CogniVerse 2023 in Toruń and HumanTech Summit 2023 in Warsaw, contributing to guidelines for designing spatial AR interfaces where depth accuracy matters (surgical training, architectural visualization, navigation).`,
    project_type: 'Academic Research',
    role: 'Principal Investigator',
    methods: ['Experimental Design', 'AR Headset Studies', 'Within-subjects Design', 'ANOVA', 'Mixed-effects Models'],
    technologies: ['Unity', 'HoloLens 2', 'R', 'SPSS', 'OpenSesame'],
    start_date: '2022-09-01',
    end_date: '2023-06-01',
    project_status: 'completed',
    links: [],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    title: 'Intentionality & Emotion Attribution in Artificial Agents',
    slug: 'intentionality-artificial-agents',
    summary: 'PhD thesis research examining how perceptual cues shape mental-state attribution to artificial agents.',
    description: `My PhD research investigates a central question in the philosophy of mind and cognitive science: what perceptual features of an artificial agent cause observers to attribute intentionality and emotional states to it?

Building on Heider & Simmel (1944) and contemporary research on the "uncanny valley," the project employs a series of controlled experiments using animated geometric shapes and humanoid avatars as stimuli, manipulating features such as motion kinematics, vocal prosody, and morphological complexity.

Participants rate agents on scales of intentionality (purposefulness, goal-directedness) and emotionality (valence, arousal, empathy), while EEG measures neural correlates of social perception (N200/P300 components linked to biological motion detection and theory of mind). The work contributes to design principles for AI agents in education, healthcare, and social robotics.`,
    project_type: 'Academic Research',
    role: 'PhD Researcher',
    methods: ['Experimental Psychology', 'Psychophysics', 'EEG', 'Bayesian Analysis', 'Questionnaire Design'],
    technologies: ['PsychoPy', 'OpenBCI', 'R', 'Python', 'EEGLAB', 'MNE-Python'],
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
    description: `This project developed and evaluated a virtual reality biofeedback training system designed to support cognitive self-regulation in clinical and wellness contexts. The system combined real-time EEG-derived neurofeedback with heart-rate variability (HRV) feedback, visualised within immersive VR environments.

Three VR "mindscapes" were designed — a forest, an ocean scene, and an abstract geometric space — each adapting visual complexity and ambient sound dynamically to the user's physiological state. A randomised controlled pilot study (N=24) found significant improvements in alpha band power and HRV metrics after 6 sessions.

The system was later incorporated into MindEasy's regenerative retreat programme. Results were presented at the 7th Summer School of Cognitive Science in Kazimierz Dolny (2023).`,
    project_type: 'VR Education',
    role: 'UX Researcher & Designer',
    methods: ['User Testing', 'Biofeedback', 'VR Design', 'HRV Analysis', 'EEG'],
    technologies: ['Unity', 'OpenBCI', 'Oculus Quest 2', 'C#', 'Python'],
    start_date: '2021-06-01',
    end_date: '2022-12-01',
    project_status: 'completed',
    links: [],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
]

const linkIcons: Record<string, typeof GitBranch> = {
  github: GitBranch,
  publication: FileText,
  report: FileText,
  demo: Monitor,
  slides: Presentation,
  external: ExternalLink,
}

function statusVariant(status: string): 'success' | 'accent' | 'muted' | 'error' | 'default' {
  if (status === 'ongoing') return 'success'
  if (status === 'planned') return 'accent'
  if (status === 'archived') return 'error'
  return 'muted'
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  let project: Project | null = null

  try {
    const supabase = await createClient()
    project = await getProjectBySlug(supabase, slug)
  } catch {
    project = STATIC_PROJECTS.find((p) => p.slug === slug) ?? null
  }

  if (!project) {
    return { title: 'Project not found — Albert Łukasik' }
  }

  return {
    title: `${project.title} — Albert Łukasik`,
    description: project.summary,
  }
}

export default async function ResearchProjectPage({ params }: Props) {
  const { slug } = await params
  let project: Project | null = null

  try {
    const supabase = await createClient()
    project = await getProjectBySlug(supabase, slug)
    if (!project) {
      project = STATIC_PROJECTS.find((p) => p.slug === slug) ?? null
    }
  } catch {
    project = STATIC_PROJECTS.find((p) => p.slug === slug) ?? null
  }

  if (!project) {
    notFound()
  }

  return (
    <main>
      {/* ── Back link ── */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/research"
          className="inline-flex items-center gap-1.5 text-sm text-da-text-muted hover:text-da-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Research
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-5">
              <Badge variant="accent">{project.project_type}</Badge>
              <Badge variant={statusVariant(project.project_status)}>{project.project_status}</Badge>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-da-text leading-tight">
              {project.title}
            </h1>

            <p className="mt-5 text-lg text-da-text-muted leading-relaxed">
              {project.summary}
            </p>

            {/* Meta row */}
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-da-text-muted">
              {project.role && (
                <span className="flex items-center gap-1.5">
                  <User size={14} className="text-da-accent" />
                  {project.role}
                </span>
              )}
              {project.start_date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-da-accent" />
                  {formatDateShort(project.start_date)}
                  {project.end_date
                    ? ` – ${formatDateShort(project.end_date)}`
                    : ' – present'}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover Image ── */}
      {project.cover_image_url && (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-10">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-da-border">
            <Image
              src={project.cover_image_url}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Description */}
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-semibold text-da-text mb-6">Overview</h2>
              <div className="prose prose-sm max-w-none text-da-text-muted leading-relaxed">
                {project.description
                  ? project.description.split('\n\n').map((para, i) => (
                      <p key={i} className="mb-4">
                        {para}
                      </p>
                    ))
                  : <p>{project.summary}</p>}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Methods */}
              {project.methods && project.methods.length > 0 && (
                <div className="da-card p-5">
                  <p className="da-label mb-3">Methods</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.methods.map((m) => (
                      <Badge key={m} variant="muted">{m}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="da-card p-5">
                  <p className="da-label mb-3">Technologies</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t) => (
                      <Badge key={t} variant="default">{t}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Collaborators */}
              {project.collaborators && (
                <div className="da-card p-5">
                  <p className="da-label mb-3">Collaborators</p>
                  <p className="text-sm text-da-text-muted">{project.collaborators}</p>
                </div>
              )}

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="da-card p-5">
                  <p className="da-label mb-3">Links</p>
                  <div className="space-y-2">
                    {project.links.map((link: ProjectLink) => {
                      const Icon = linkIcons[link.type] ?? ExternalLink
                      return (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-da-text-muted hover:text-da-accent transition-colors"
                        >
                          <Icon size={14} className="text-da-accent flex-shrink-0" />
                          {link.label}
                          <ExternalLink size={10} className="ml-auto opacity-50" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Status detail */}
              <div className="da-card p-5">
                <p className="da-label mb-3">Project info</p>
                <dl className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-da-text-faint">Type</dt>
                    <dd className="text-da-text-muted">{project.project_type}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-da-text-faint">Status</dt>
                    <dd>
                      <Badge variant={statusVariant(project.project_status)} className="text-xs">
                        {project.project_status}
                      </Badge>
                    </dd>
                  </div>
                  {project.start_date && (
                    <div className="flex justify-between">
                      <dt className="text-da-text-faint">Started</dt>
                      <dd className="text-da-text-muted">{formatDateShort(project.start_date)}</dd>
                    </div>
                  )}
                  {project.end_date && (
                    <div className="flex justify-between">
                      <dt className="text-da-text-faint">Ended</dt>
                      <dd className="text-da-text-muted">{formatDateShort(project.end_date)}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
