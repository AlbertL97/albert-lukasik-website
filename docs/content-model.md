# Content Model

## Tables Overview

| Table | Description |
|-------|-------------|
| `site_profile` | Single-row site settings |
| `current_activities` | Current roles / active items |
| `projects` | Research and portfolio projects |
| `project_links` | Links attached to projects |
| `teaching_entries` | Academic courses taught |
| `workshops` | Workshop offerings |
| `posts` | Blog and vlog entries |
| `gallery_items` | Gallery photos |
| `external_links` | External resource links |

---

## site_profile

Single row. Update via Admin → Settings.

| Field | Type | Notes |
|-------|------|-------|
| `id` | uuid | Primary key |
| `name` | text | Display name |
| `tagline` | text | One-line professional title |
| `bio` | text | Full biography |
| `location` | text | City, country |
| `email` | text | Contact email |
| `avatar_url` | text | URL to profile photo |
| `updated_at` | timestamptz | Auto-updated |

---

## current_activities

Shown on homepage and "What I'm doing now" section.

| Field | Type | Values |
|-------|------|--------|
| `id` | uuid | |
| `category` | text | 'role', 'research', 'project', 'teaching', 'conference' |
| `title` | text | Short title of the activity |
| `description` | text | 1–3 sentence description |
| `link` | text | Optional URL |
| `display_order` | int | Sort order (ascending) |
| `status` | text | 'draft', 'published', 'private', 'archived' |

---

## projects

Core portfolio items. Each project has a public slug URL at `/research/[slug]`.

| Field | Type | Notes |
|-------|------|-------|
| `id` | uuid | |
| `title` | text | Required |
| `slug` | text | Unique, URL-safe |
| `summary` | text | 1–2 sentence card preview |
| `description` | text | Full description (may contain HTML) |
| `project_type` | text | 'academic research', 'UX research', 'VR education', etc. |
| `role` | text | Your role in the project |
| `methods` | text[] | Array of method strings |
| `technologies` | text[] | Array of technology strings |
| `collaborators` | text | Free-form collaborators text |
| `start_date` | date | |
| `end_date` | date | Null if ongoing |
| `project_status` | text | 'planned', 'ongoing', 'completed', 'archived' |
| `cover_image_url` | text | Optional cover image |
| `status` | text | Visibility: 'draft', 'published', 'private', 'archived' |
| `display_order` | int | Sort order |

**Related table:** `project_links`
| Field | Type | Values |
|-------|------|--------|
| `project_id` | uuid | FK → projects |
| `label` | text | Button label ("View on GitHub") |
| `url` | text | External URL |
| `link_type` | text | 'github', 'publication', 'report', 'demo', 'slides', 'external' |

---

## teaching_entries

Academic courses taught.

| Field | Type | Values |
|-------|------|--------|
| `course_title` | text | |
| `description` | text | |
| `institution` | text | |
| `academic_year` | text | e.g. "2024/2025" |
| `level` | text | 'undergraduate', 'graduate', 'workshop', 'open' |
| `topics` | text[] | Array of topic strings |
| `materials_url` | text | Optional external link |
| `display_order` | int | |
| `status` | text | Visibility |

---

## workshops

Workshop offerings (past and current).

| Field | Type | Notes |
|-------|------|-------|
| `title` | text | |
| `slug` | text | Unique URL |
| `summary` | text | Card preview |
| `description` | text | Full description |
| `target_audience` | text | |
| `duration` | text | e.g. "3 hours", "2 days" |
| `format` | text | 'onsite', 'online', 'hybrid' |
| `topics` | text[] | |
| `learning_outcomes` | text[] | |
| `required_tools` | text | |
| `workshop_status` | text | 'available', 'planned', 'past', 'archived' |
| `status` | text | Visibility |

---

## posts

Blog articles, vlogs, notes, and resource lists. Public URL: `/blog/[slug]`.

| Field | Type | Notes |
|-------|------|-------|
| `title` | text | |
| `slug` | text | Unique URL |
| `excerpt` | text | Short preview |
| `content` | text | Full content (HTML or markdown) |
| `post_type` | text | 'article', 'vlog', 'note', 'resource_list' |
| `cover_image_url` | text | |
| `tags` | text[] | |
| `categories` | text[] | |
| `video_url` | text | YouTube/Vimeo embed URL for vlogs |
| `seo_title` | text | Overrides title in `<title>` |
| `seo_description` | text | Meta description |
| `published_at` | timestamptz | Set when first published |
| `status` | text | Visibility ('draft' = hidden) |

---

## gallery_items

| Field | Type | Notes |
|-------|------|-------|
| `title` | text | |
| `description` | text | Optional |
| `image_url` | text | Supabase Storage URL |
| `alt_text` | text | Required for accessibility |
| `date` | date | When photo was taken |
| `location` | text | |
| `category` | text | 'conference', 'project', 'workshop', 'teaching', 'fieldwork', 'behind the scenes' |
| `display_order` | int | |
| `related_project_id` | uuid | Optional FK → projects |
| `related_post_id` | uuid | Optional FK → posts |
| `status` | text | Visibility |

---

## external_links

| Field | Type | Notes |
|-------|------|-------|
| `title` | text | Display name |
| `url` | text | Full URL |
| `description` | text | Optional subtitle |
| `platform` | text | 'linkedin', 'instagram', 'google_scholar', 'flipboard', etc. |
| `category` | text | 'social', 'academic', 'project', 'other' |
| `display_order` | int | |
| `status` | text | Visibility |

---

## Content Status Values

All tables with a `status` column use:

| Value | Public? | Use Case |
|-------|---------|---------|
| `draft` | No | Work in progress |
| `published` | Yes | Live on public site |
| `private` | No | Temporarily hidden |
| `archived` | No | Old content, preserved |
