-- Albert Łukasik Personal Website — Supabase Schema
-- Run this in the Supabase SQL editor (Project → SQL → New query)

-- ─── Extensions ────────────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Helpers ───────────────────────────────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ─── 1. site_profile ───────────────────────────────────────────────────────
create table if not exists site_profile (
  id          uuid primary key default uuid_generate_v4(),
  name        text not null default 'Albert Łukasik',
  tagline     text not null default 'PhD Researcher | VR Educator | UX Researcher',
  bio         text not null default '',
  location    text,
  email       text not null default 'lukasik.albert@proton.me',
  avatar_url  text,
  updated_at  timestamptz not null default now()
);

create trigger site_profile_updated_at
  before update on site_profile
  for each row execute function set_updated_at();

-- Seed with initial profile (only one row needed)
insert into site_profile (name, tagline, bio, location, email)
values (
  'Albert Łukasik',
  'PhD Researcher | VR Educator | UX Researcher',
  'Cognitive scientist and UX researcher with a strong background in experimental design, data analysis, and human–technology interaction. Experienced in designing and evaluating user experiences using VR/AR systems, biometric sensors, and behavioral data. Co-founder of MindEasy, a neurotechnology startup developing educational and clinical VR applications integrating AI and BCI technology.',
  'Toruń, Poland',
  'lukasik.albert@proton.me'
) on conflict do nothing;

-- ─── 2. current_activities ─────────────────────────────────────────────────
create table if not exists current_activities (
  id            uuid primary key default uuid_generate_v4(),
  category      text not null,                 -- e.g. 'role', 'research', 'project'
  title         text not null,
  description   text not null default '',
  link          text,
  display_order int not null default 0,
  status        text not null default 'published'
                check (status in ('draft','published','private','archived')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger current_activities_updated_at
  before update on current_activities
  for each row execute function set_updated_at();

-- ─── 3. projects ───────────────────────────────────────────────────────────
create table if not exists projects (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text not null unique,
  summary         text not null default '',
  description     text not null default '',
  project_type    text not null default '',       -- 'academic research', 'UX research', etc.
  role            text not null default '',
  methods         text[] not null default '{}',
  technologies    text[] not null default '{}',
  collaborators   text,
  start_date      date,
  end_date        date,
  project_status  text not null default 'ongoing'
                  check (project_status in ('planned','ongoing','completed','archived')),
  cover_image_url text,
  status          text not null default 'draft'
                  check (status in ('draft','published','private','archived')),
  display_order   int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger projects_updated_at
  before update on projects
  for each row execute function set_updated_at();

create index if not exists projects_slug_idx on projects(slug);
create index if not exists projects_status_idx on projects(status);

-- ─── 4. project_links ──────────────────────────────────────────────────────
create table if not exists project_links (
  id         uuid primary key default uuid_generate_v4(),
  project_id uuid not null references projects(id) on delete cascade,
  label      text not null,
  url        text not null,
  link_type  text not null default 'external'
             check (link_type in ('github','publication','report','demo','slides','external'))
);

create index if not exists project_links_project_idx on project_links(project_id);

-- ─── 5. teaching_entries ───────────────────────────────────────────────────
create table if not exists teaching_entries (
  id            uuid primary key default uuid_generate_v4(),
  course_title  text not null,
  description   text not null default '',
  institution   text not null default '',
  academic_year text not null default '',
  level         text not null default 'undergraduate'
                check (level in ('undergraduate','graduate','workshop','open')),
  topics        text[] not null default '{}',
  materials_url text,
  status        text not null default 'published'
                check (status in ('draft','published','private','archived')),
  display_order int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create trigger teaching_entries_updated_at
  before update on teaching_entries
  for each row execute function set_updated_at();

-- ─── 6. workshops ──────────────────────────────────────────────────────────
create table if not exists workshops (
  id                uuid primary key default uuid_generate_v4(),
  title             text not null,
  slug              text not null unique,
  summary           text not null default '',
  description       text not null default '',
  target_audience   text not null default '',
  duration          text not null default '',
  format            text not null default 'onsite'
                    check (format in ('onsite','online','hybrid')),
  topics            text[] not null default '{}',
  learning_outcomes text[] not null default '{}',
  required_tools    text,
  cover_image_url   text,
  workshop_status   text not null default 'available'
                    check (workshop_status in ('available','planned','past','archived')),
  status            text not null default 'draft'
                    check (status in ('draft','published','private','archived')),
  display_order     int not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create trigger workshops_updated_at
  before update on workshops
  for each row execute function set_updated_at();

create index if not exists workshops_slug_idx on workshops(slug);

-- ─── 7. posts (blog / vlog) ────────────────────────────────────────────────
create table if not exists posts (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text not null unique,
  excerpt         text not null default '',
  content         text not null default '',
  post_type       text not null default 'article'
                  check (post_type in ('article','vlog','note','resource_list')),
  cover_image_url text,
  tags            text[] not null default '{}',
  categories      text[] not null default '{}',
  video_url       text,
  status          text not null default 'draft'
                  check (status in ('draft','published','private','archived')),
  seo_title       text,
  seo_description text,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create trigger posts_updated_at
  before update on posts
  for each row execute function set_updated_at();

create index if not exists posts_slug_idx on posts(slug);
create index if not exists posts_status_idx on posts(status);
create index if not exists posts_published_at_idx on posts(published_at desc);

-- ─── 8. gallery_items ──────────────────────────────────────────────────────
create table if not exists gallery_items (
  id                 uuid primary key default uuid_generate_v4(),
  title              text not null,
  description        text,
  image_url          text not null,
  alt_text           text not null default '',
  date               date,
  location           text,
  category           text not null default 'other',
  status             text not null default 'published'
                     check (status in ('draft','published','private','archived')),
  display_order      int not null default 0,
  related_project_id uuid references projects(id) on delete set null,
  related_post_id    uuid references posts(id) on delete set null,
  created_at         timestamptz not null default now()
);

create index if not exists gallery_items_status_idx on gallery_items(status);

-- ─── 9. external_links ─────────────────────────────────────────────────────
create table if not exists external_links (
  id            uuid primary key default uuid_generate_v4(),
  title         text not null,
  url           text not null,
  description   text,
  platform      text,
  category      text not null default 'general',
  display_order int not null default 0,
  status        text not null default 'published'
                check (status in ('draft','published','private','archived')),
  created_at    timestamptz not null default now()
);

-- ─── Seed: external links ──────────────────────────────────────────────────
insert into external_links (title, url, description, platform, category, display_order, status)
values
  ('LinkedIn',        'https://www.linkedin.com/in/albert-lukasik/',   'Professional profile', 'linkedin',     'social', 1, 'published'),
  ('Google Scholar',  'https://scholar.google.com/citations?user=wNO8LmUAAAAJ', 'Academic publications', 'google_scholar', 'academic', 2, 'published'),
  ('Instagram',       'https://www.instagram.com/anythinghri/',        'Research & HRI content', 'instagram',  'social', 3, 'published'),
  ('Flipboard',       'https://flipboard.com/@Albertukasik',           'Curated articles',     'flipboard',    'social', 4, 'published'),
  ('Linktree',        'https://linktr.ee/albertlukas',                 'All links in one place', 'linktree',   'other',  5, 'published'),
  ('MindEasy',        'https://www.linkedin.com/company/tu-przestrze%C5%84/', 'Neurotechnology startup', 'linkedin', 'project', 6, 'published')
on conflict do nothing;

-- ─── Seed: teaching entries ────────────────────────────────────────────────
insert into teaching_entries (course_title, description, institution, academic_year, level, topics, display_order, status)
values
  (
    'Neuroscience of Higher Cognitive Processes',
    'A course covering advanced topics in cognitive neuroscience including memory, attention, executive functions, language, and consciousness for 3rd-year undergraduate students.',
    'Nicolaus Copernicus University, Toruń',
    '2024/2025 & 2025/2026',
    'undergraduate',
    array['cognitive neuroscience','memory','attention','executive functions','consciousness'],
    1,
    'published'
  ),
  (
    'Neuroscience of Attentional and Perceptual Processes',
    'An introduction to the neural basis of attention and perception for 2nd-year undergraduate students of Cognitive Science.',
    'Nicolaus Copernicus University, Toruń',
    '2024/2025',
    'undergraduate',
    array['perception','attention','sensory neuroscience','EEG'],
    2,
    'published'
  ),
  (
    'Introduction to Cognitive Science (co-teaching)',
    'Assessment and co-teaching of 1st-year undergraduate students in Introduction to Cognitive Science, with Prof. Włodzisław Duch.',
    'Nicolaus Copernicus University, Toruń',
    '2023/2024',
    'undergraduate',
    array['cognitive science','philosophy of mind','artificial intelligence','neuroscience'],
    3,
    'published'
  )
on conflict do nothing;

-- ─── Seed: current activities ─────────────────────────────────────────────
insert into current_activities (category, title, description, display_order, status)
values
  ('role',     'Co-Founder & UX Researcher at MindEasy',         'Developing educational and clinical VR applications integrating AI and BCI technology. Leading UX research and user testing processes for cognitive training and rehabilitation tools.', 1, 'published'),
  ('role',     'Research Assistant – Klaes Lab, Ruhr University Bochum', 'Designing and analyzing VR-based experiments integrating EEG and behavioral data.', 2, 'published'),
  ('role',     'Research Assistant – Embodied Cognition Lab, Lisbon',    'Coordinating replication studies and conducting data analysis for human–robot interaction experiments.', 3, 'published'),
  ('research', 'PhD Thesis',                                     'Effects of manipulating perceptual dimensions of the mind on perceived intentionality and emotion in artificial agents.', 4, 'published'),
  ('teaching', 'Neuroscience of Higher Cognitive Processes',     'Conducting the course for 3rd-year undergraduate students of Cognitive Science (Feb–Jun 2026).', 5, 'published')
on conflict do nothing;

-- ─── Row Level Security ────────────────────────────────────────────────────
-- Enable RLS on all tables
alter table site_profile        enable row level security;
alter table current_activities  enable row level security;
alter table projects            enable row level security;
alter table project_links       enable row level security;
alter table teaching_entries    enable row level security;
alter table workshops           enable row level security;
alter table posts               enable row level security;
alter table gallery_items       enable row level security;
alter table external_links      enable row level security;

-- Public read policies (anon key can read published content only)
create policy "Public can read site_profile"
  on site_profile for select using (true);

create policy "Public can read published activities"
  on current_activities for select using (status = 'published');

create policy "Public can read published projects"
  on projects for select using (status = 'published');

create policy "Public can read project_links of published projects"
  on project_links for select using (
    exists (select 1 from projects p where p.id = project_links.project_id and p.status = 'published')
  );

create policy "Public can read published teaching entries"
  on teaching_entries for select using (status = 'published');

create policy "Public can read published workshops"
  on workshops for select using (status = 'published');

create policy "Public can read published posts"
  on posts for select using (status = 'published');

create policy "Public can read published gallery items"
  on gallery_items for select using (status = 'published');

create policy "Public can read published external links"
  on external_links for select using (status = 'published');

-- Service role (admin API routes) bypasses RLS automatically in Supabase.
-- No additional policies needed for admin writes — they use the service key.

-- ─── Storage ───────────────────────────────────────────────────────────────
-- Run these separately in the Supabase dashboard if needed:
-- 1. Create a bucket named "media" (public bucket for images)
-- 2. Enable public access for the bucket
-- SQL for storage policies (only if creating via SQL):
-- insert into storage.buckets (id, name, public) values ('media', 'media', true);
