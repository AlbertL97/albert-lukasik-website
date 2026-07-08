import { MapPin, Mail, ExternalLink, GraduationCap, Briefcase, FlaskConical, Globe } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getSiteProfile } from '@/lib/supabase/queries'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'

export const metadata = {
  title: 'About — Albert Łukasik',
  description: 'Cognitive scientist, UX researcher, and VR educator based in Toruń, Poland.',
}

const TIMELINE = [
  {
    year: '2016',
    title: 'B.A. in Cognitive Science',
    org: 'MCSU Lublin',
    icon: GraduationCap,
    type: 'education',
  },
  {
    year: '2019–2021',
    title: 'M.A. in Cognitive Science',
    org: 'NCU Toruń',
    icon: GraduationCap,
    type: 'education',
  },
  {
    year: '2021',
    title: 'BrainAttach — Neurofeedback Game Research',
    org: 'Independent project',
    description: 'EEG-based neurofeedback gaming research',
    icon: FlaskConical,
    type: 'research',
  },
  {
    year: '2021',
    title: 'Biometric Data Analyst',
    org: 'ASM Centrum',
    description: 'Biometric data analysis for market research applications',
    icon: Briefcase,
    type: 'work',
  },
  {
    year: '2022–2024',
    title: 'UX / AR / VR Specialist',
    org: 'VOBACOM',
    description: 'Designed and evaluated immersive AR/VR experiences for training and education',
    icon: Briefcase,
    type: 'work',
  },
  {
    year: '2023–2024',
    title: 'Grants4NCUStudents — Team Leader',
    org: 'NCU Toruń',
    description: 'Led grant-funded student research initiative',
    icon: Briefcase,
    type: 'work',
  },
  {
    year: '2023–now',
    title: 'PhD Candidate',
    org: 'Academia Rerum Socialium, Toruń',
    description: '"Effects of manipulating perceptual dimensions of the mind on perceived intentionality and emotion in artificial agents"',
    icon: GraduationCap,
    type: 'education',
    current: true,
  },
  {
    year: '2024–now',
    title: 'Research Visit — Embodied Cognition Lab',
    org: 'Universidade de Lisboa, Portugal',
    description: 'Exploring embodied approaches to AI–human perception',
    icon: Globe,
    type: 'research',
    current: true,
  },
  {
    year: '2025–now',
    title: 'Research Visit — Klaes Lab',
    org: 'Ruhr University Bochum, Germany',
    description: 'Focus on neuroprosthetics and motor cognition',
    icon: Globe,
    type: 'research',
    current: true,
  },
  {
    year: '2025–now',
    title: 'MindEasy — Co-Founder',
    org: 'MindEasy',
    description: 'Neurotechnology startup: VR-enhanced regenerative retreats and biofeedback training',
    icon: FlaskConical,
    type: 'work',
    current: true,
  },
]

const SKILLS = [
  {
    category: 'Research & Experimental Design',
    items: ['Experimental psychology', 'Within/between-subjects design', 'EEG / biofeedback', 'AR & VR user studies', 'Questionnaire design'],
  },
  {
    category: 'Data Analysis',
    items: ['Python (pandas, NumPy, scipy)', 'R (ggplot2, lme4)', 'Statistical modelling', 'Machine learning basics', 'Data visualisation'],
  },
  {
    category: 'Design & Visualisation',
    items: ['UX Research', 'Figma', 'Unity (AR/VR)'],
  },
  {
    category: 'Research Tools',
    items: ['OpenBCI / EEG toolkits', 'SPSS', 'jamovi', 'AI-based tools'],
  },
  {
    category: 'Languages',
    items: ['Polish — native', 'English — C1/C2'],
  },
]

const EDUCATION = [
  {
    degree: 'PhD in Cognitive Science',
    institution: 'Academia Rerum Socialium, Toruń',
    years: '2023–present',
    thesis: 'Effects of manipulating perceptual dimensions of the mind on perceived intentionality and emotion in artificial agents',
    supervisor: 'Prof. Włodzisław Duch',
  },
  {
    degree: 'M.A. in Cognitive Science',
    institution: 'Nicolaus Copernicus University (NCU), Toruń',
    years: '2019–2021',
    thesis: 'Cognitive and neural correlates of social perception of human vs. artificial agents',
  },
  {
    degree: 'B.A. in Cognitive Science',
    institution: 'Maria Curie-Skłodowska University (MCSU), Lublin',
    years: '2013–2016',
    thesis: 'Attention and perception in interactive digital environments',
  },
]

const typeColors: Record<string, string> = {
  education: 'bg-da-accent',
  research: 'bg-da-accent',
  work: 'bg-da-accent',
}

export default async function AboutPage() {
  let bio = ''
  try {
    const supabase = await createClient()
    const profile = await getSiteProfile(supabase)
    bio = profile?.bio ?? ''
  } catch {
    // static fallback
  }

  const displayBio = bio || [
    'Cognitive scientist and UX researcher with a strong background in experimental design, data analysis, and human–technology interaction. PhD candidate at Academia Rerum Socialium, Toruń.',
    'My thesis investigates how manipulating perceptual features of artificial agents shapes the observer\'s attribution of intentionality and emotion — a question at the crossroads of cognitive science, philosophy of mind, and human–robot interaction.',
    'Alongside academic work, I co-founded MindEasy, a neurotechnology startup developing educational and clinical VR applications integrating AI and BCI technology. Previously I worked as a UX/AR/VR specialist at VOBACOM and as a biometric data analyst at ASM Centrum.',
  ].join('\n')

  return (
    <main>
      {/* ── Page Hero ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 70% 0%, color-mix(in srgb, #c9a86c 6%, transparent), transparent)',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="da-label mb-4">About</p>
          <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-da-text">
            About me
          </h1>
          <p className="mt-5 text-lg text-da-text-muted max-w-2xl leading-relaxed">
            Cognitive scientist · UX researcher · VR educator
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-da-text-muted">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-da-accent" />
              Toruń, Poland
            </span>
            <a
              href="mailto:lukasik.albert@proton.me"
              className="flex items-center gap-1.5 hover:text-da-accent transition-colors"
            >
              <Mail size={14} className="text-da-accent" />
              lukasik.albert@proton.me
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/albert-lukasik/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-da-surface border border-da-border rounded-lg text-xs text-da-text-muted hover:text-da-accent hover:border-da-accent/40 transition-colors"
            >
              LinkedIn <ExternalLink size={12} />
            </a>
            <a
              href="https://scholar.google.com/citations?user=wNO8LmUAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-da-surface border border-da-border rounded-lg text-xs text-da-text-muted hover:text-da-accent hover:border-da-accent/40 transition-colors"
            >
              Google Scholar <ExternalLink size={12} />
            </a>
            <a
              href="https://github.com/AlbertL97"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-da-surface border border-da-border rounded-lg text-xs text-da-text-muted hover:text-da-accent hover:border-da-accent/40 transition-colors"
            >
              GitHub <ExternalLink size={12} />
            </a>
          </div>
        </div>
      </section>

      <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

      {/* ── Biography ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionHeader label="Biography" title="My Story" className="mb-6" />
              <div className="space-y-4 text-da-text-muted leading-relaxed">
                {displayBio.split('\n').filter(Boolean).map((paragraph, i) => (
                  <p key={i}>{paragraph.trim()}</p>
                ))}
              </div>
            </div>

            {/* Current positions card */}
            <div className="space-y-4">
              <p className="da-label">Currently</p>
              {TIMELINE.filter((t) => t.current).map((item) => (
                <div key={item.title} className="da-card p-4">
                  <span className="da-label text-da-text-faint">{item.year}</span>
                  <p className="mt-1 font-serif text-sm font-semibold text-da-text">{item.title}</p>
                  <p className="mt-0.5 text-xs text-da-text-muted">{item.org}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

      {/* ── Career Timeline ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Journey" title="Career Timeline" className="mb-12" />

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--color-da-border), transparent)' }}
            />

            <ol className="space-y-6">
              {[...TIMELINE].reverse().map((item, i) => {
                const Icon = item.icon
                const dotColor = typeColors[item.type] ?? 'bg-da-text-muted'
                return (
                  <li key={i} className="relative flex gap-6 pl-14">
                    {/* Dot */}
                    <div
                      className={`absolute left-4 top-3 w-4 h-4 rounded-full border-2 border-da-bg ${dotColor} flex items-center justify-center -translate-x-1/2`}
                    />
                    <div className="da-card p-5 flex-1">
                      <div className="flex items-start gap-3">
                        <Icon size={16} className="text-da-accent mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="flex flex-wrap items-baseline gap-2 mb-1">
                            <span className="font-serif text-base font-semibold text-da-text">
                              {item.title}
                            </span>
                            {item.current && (
                              <Badge variant="success">Current</Badge>
                            )}
                          </div>
                          <p className="text-xs text-da-accent mb-1">{item.org}</p>
                          <p className="text-xs text-da-text-faint mb-1">{item.year}</p>
                          {item.description && (
                            <p className="text-xs text-da-text-muted leading-relaxed mt-1">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </section>

      <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

      {/* ── Skills ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Expertise" title="Skills" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((group) => (
              <div key={group.category} className="da-card p-6">
                <h3 className="font-serif text-sm font-semibold text-da-accent mb-4">
                  {group.category}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-da-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-da-accent flex-shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="da-divider mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" />

      {/* ── Education ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Academic background" title="Education" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="da-card p-6">
                <GraduationCap size={20} className="text-da-accent mb-3" />
                <p className="font-serif text-base font-semibold text-da-text">{edu.degree}</p>
                <p className="text-sm text-da-accent mt-1">{edu.institution}</p>
                <p className="text-xs text-da-text-faint mt-1 mb-3">{edu.years}</p>
                {edu.thesis && (
                  <p className="text-xs text-da-text-muted leading-relaxed italic">
                    &ldquo;{edu.thesis}&rdquo;
                  </p>
                )}
                {edu.supervisor && (
                  <p className="text-xs text-da-text-faint mt-2">
                    Supervisor: {edu.supervisor}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-da-text-muted mb-6">
            Interested in collaborating or just want to connect?
          </p>
          <Link
            href="/contact"
            style={{ color: '#0c0b10' }}
            className="inline-flex items-center gap-2 bg-da-accent px-6 py-3 rounded-lg font-semibold text-sm hover:bg-da-accent-hover transition-colors"
          >
            <Mail size={16} />
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  )
}
