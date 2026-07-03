import Link from 'next/link'
import { ArrowRight, BookOpen, Microscope, Brain, Monitor, Cpu, FlaskConical, Headphones, BarChart3, Mail } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPublishedProjects, getCurrentActivities, getPublishedPosts, getSiteProfile } from '@/lib/supabase/queries'
import Badge from '@/components/ui/Badge'
import type { Project, CurrentActivity, Post } from '@/types'
import { formatDate, truncate } from '@/lib/utils'

const RESEARCH_INTERESTS = [
  { label: 'Cognitive Science', icon: Brain },
  { label: 'Neuroscience', icon: Microscope },
  { label: 'Human-Computer Interaction', icon: Monitor },
  { label: 'VR / AR Learning', icon: Headphones },
  { label: 'AI–Human Interaction', icon: Cpu },
  { label: 'UX Research', icon: BarChart3 },
  { label: 'Neurotechnology', icon: FlaskConical },
  { label: 'EEG', icon: Brain },
]

const STATIC_ACTIVITIES: CurrentActivity[] = [
  {
    id: '1',
    category: 'PhD',
    title: 'PhD Candidate',
    description: 'Academia Rerum Socialium, Toruń — researching perception of intentionality & emotion in artificial agents',
    display_order: 1,
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    category: 'Research',
    title: 'Embodied Cognition Lab',
    description: 'Research stay — Lisbon, Portugal. Exploring embodied approaches to AI-human interaction',
    display_order: 2,
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '3',
    category: 'Research',
    title: 'Klaes Lab, Ruhr University Bochum',
    description: 'Research collaboration — Bochum, Germany. Focus on neuroprosthetics and motor cognition',
    display_order: 3,
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '4',
    category: 'Startup',
    title: 'MindEasy Co-Founder',
    description: 'Neurotechnology startup offering VR-enhanced regenerative retreats and biofeedback training',
    display_order: 4,
    status: 'published',
    created_at: '',
    updated_at: '',
  },
]

const STATIC_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ArtificialBond — Human–AI Relationship Discourse Analyzer',
    slug: 'artificial-bond',
    summary: 'NLP-powered tool analyzing Reddit discourse around human–AI romantic and social relationships, built with Python and deployed publicly.',
    description: '',
    project_type: 'AI Research',
    role: 'Lead Developer & Researcher',
    methods: ['NLP', 'Discourse Analysis', 'Python'],
    technologies: ['Python', 'Reddit API', 'NLP'],
    start_date: '2023-01-01',
    project_status: 'completed',
    links: [{ label: 'GitHub', url: 'https://github.com/AlbertL97/artificialbond', type: 'github' }],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
  {
    id: '2',
    title: 'Biosignal Cockpit — Quantified Self Dashboard',
    slug: 'biosignal-cockpit',
    summary: 'Personal health intelligence dashboard integrating Apple Health data, genome VCF files, and 379 Nebula reports across 9 body-system domains.',
    description: '',
    project_type: 'UX Research',
    role: 'Designer & Developer',
    methods: ['Data Visualization', 'UX Design', 'Multi-agent Build'],
    technologies: ['React', 'TypeScript', 'FastAPI', 'Python'],
    start_date: '2024-01-01',
    project_status: 'ongoing',
    links: [{ label: 'Demo', url: 'https://albertl97.github.io/biosignal-cockpit/', type: 'demo' }],
    status: 'published',
    created_at: '',
    updated_at: '',
  },
]

export default async function HomePage() {
  let projects: Project[] = []
  let activities: CurrentActivity[] = []
  let posts: Post[] = []

  try {
    const supabase = await createClient()
    const [dbProjects, dbActivities, dbPosts] = await Promise.all([
      getPublishedProjects(supabase),
      getCurrentActivities(supabase),
      getPublishedPosts(supabase),
    ])
    projects = dbProjects
    activities = dbActivities
    posts = dbPosts
  } catch {
    // Supabase not connected — use static fallback
  }

  const displayProjects = projects.length > 0 ? projects.slice(0, 3) : STATIC_PROJECTS
  const displayActivities = activities.length > 0 ? activities : STATIC_ACTIVITIES
  const displayPosts = posts.slice(0, 2)

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        {/* Background decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% -20%, color-mix(in srgb, #c9a86c 8%, transparent), transparent)',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="da-label mb-5">Welcome</p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-da-text leading-tight">
              Albert&nbsp;Łukasik
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-da-accent font-serif font-medium">
              PhD Researcher · VR Educator · UX Researcher
            </p>
            <p className="mt-6 text-base sm:text-lg text-da-text-muted max-w-2xl leading-relaxed">
              Cognitive scientist exploring how humans perceive minds in machines. I design experiments, build
              VR learning environments, and research the intersection of neuroscience, technology, and human
              experience — based in Toruń.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-da-accent text-[#0c0b10] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-da-accent-hover transition-colors"
              >
                About me
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 border border-da-border text-da-text px-6 py-3 rounded-lg font-medium text-sm hover:border-da-text-muted hover:text-da-text transition-colors bg-da-surface"
              >
                View research
              </Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

      {/* ── Current Roles ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="da-label mb-6">Currently</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayActivities.map((activity) => (
              <div key={activity.id} className="da-card p-5">
                <span className="da-label text-da-text-faint">{activity.category}</span>
                <h3 className="mt-2 font-serif text-base font-semibold text-da-text leading-snug">
                  {activity.title}
                </h3>
                <p className="mt-2 text-xs text-da-text-muted leading-relaxed line-clamp-3">
                  {activity.description}
                </p>
                {activity.link && (
                  <a
                    href={activity.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-da-accent hover:text-da-accent-hover transition-colors"
                  >
                    Learn more <ArrowRight size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

      {/* ── Featured Projects ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <p className="da-label mb-2">Selected Work</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-da-text">
                Featured Projects
              </h2>
            </div>
            <Link
              href="/research"
              className="flex-shrink-0 inline-flex items-center gap-1 text-sm text-da-accent hover:text-da-accent-hover transition-colors"
            >
              View all research <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <Link key={project.id} href={`/research/${project.slug}`} className="group da-card p-6 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge variant="accent">{project.project_type}</Badge>
                  <Badge variant={project.project_status === 'ongoing' ? 'success' : 'muted'}>
                    {project.project_status}
                  </Badge>
                </div>
                <h3 className="font-serif text-lg font-semibold text-da-text leading-snug group-hover:text-da-accent transition-colors">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-da-text-muted leading-relaxed flex-1">
                  {truncate(project.summary, 140)}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.methods.slice(0, 3).map((m) => (
                    <Badge key={m} variant="muted">{m}</Badge>
                  ))}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs text-da-accent group-hover:gap-2 transition-all">
                  Read more <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

      {/* ── Research Interests ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="da-label mb-2">Expertise</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-da-text mb-8">
            Research Interests
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {RESEARCH_INTERESTS.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="da-card p-4 flex items-center gap-3 group hover:border-da-accent/30 transition-colors"
              >
                <Icon size={18} className="text-da-accent flex-shrink-0" />
                <span className="text-sm text-da-text-muted group-hover:text-da-text transition-colors">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Blog ── */}
      {displayPosts.length > 0 && (
        <>
          <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />
          <section className="py-16">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-8 gap-4">
                <div>
                  <p className="da-label mb-2">Writing</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-da-text">
                    Latest from the Blog
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="flex-shrink-0 inline-flex items-center gap-1 text-sm text-da-accent hover:text-da-accent-hover transition-colors"
                >
                  All posts <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group da-card p-6 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="accent">{post.post_type}</Badge>
                      {post.published_at && (
                        <span className="text-xs text-da-text-faint">
                          {formatDate(post.published_at)}
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-da-text leading-snug group-hover:text-da-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-da-text-muted leading-relaxed flex-1">
                      {truncate(post.excerpt, 130)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

      {/* ── Contact CTA ── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="da-label mb-4">Get in touch</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-da-text">
            Let&apos;s connect
          </h2>
          <p className="mt-4 text-base text-da-text-muted max-w-xl mx-auto leading-relaxed">
            Whether you&apos;re interested in collaboration, research discussions, or just want to say hello —
            I&apos;m always happy to hear from you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-da-accent text-[#0c0b10] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-da-accent-hover transition-colors"
            >
              <Mail size={16} />
              Contact me
            </Link>
            <a
              href="https://www.linkedin.com/in/albert-lukasik/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-da-border text-da-text-muted px-6 py-3 rounded-lg font-medium text-sm hover:border-da-text-muted hover:text-da-text transition-colors bg-da-surface"
            >
              <BookOpen size={16} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
