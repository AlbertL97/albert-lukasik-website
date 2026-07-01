export type ContentStatus = 'draft' | 'published' | 'private' | 'archived'
export type ProjectStatus = 'planned' | 'ongoing' | 'completed' | 'archived'
export type WorkshopFormat = 'onsite' | 'online' | 'hybrid'
export type PostType = 'article' | 'vlog' | 'note' | 'resource_list'
export type CourseLevel = 'undergraduate' | 'graduate' | 'workshop' | 'open'
export type WorkshopStatus = 'available' | 'planned' | 'past' | 'archived'

export interface SiteProfile {
  id: string
  name: string
  tagline: string
  bio: string
  location?: string
  email: string
  avatar_url?: string
  updated_at: string
}

export interface CurrentActivity {
  id: string
  category: string
  title: string
  description: string
  link?: string
  display_order: number
  status: ContentStatus
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  project_type: string
  role: string
  methods: string[]
  technologies: string[]
  collaborators?: string
  start_date: string
  end_date?: string
  project_status: ProjectStatus
  cover_image_url?: string
  links: ProjectLink[]
  status: ContentStatus
  created_at: string
  updated_at: string
}

export interface ProjectLink {
  label: string
  url: string
  type: 'github' | 'publication' | 'report' | 'demo' | 'slides' | 'external'
}

export interface TeachingEntry {
  id: string
  course_title: string
  description: string
  institution: string
  academic_year: string
  level: CourseLevel
  topics: string[]
  materials_url?: string
  status: ContentStatus
  display_order: number
  created_at: string
  updated_at: string
}

export interface Workshop {
  id: string
  title: string
  slug: string
  summary: string
  description: string
  target_audience: string
  duration: string
  format: WorkshopFormat
  topics: string[]
  learning_outcomes: string[]
  required_tools?: string
  cover_image_url?: string
  workshop_status: WorkshopStatus
  status: ContentStatus
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  post_type: PostType
  cover_image_url?: string
  tags: string[]
  categories: string[]
  video_url?: string
  status: ContentStatus
  seo_title?: string
  seo_description?: string
  published_at?: string
  created_at: string
  updated_at: string
}

export interface GalleryItem {
  id: string
  title: string
  description?: string
  image_url: string
  alt_text: string
  date?: string
  location?: string
  category: string
  status: ContentStatus
  display_order: number
  related_project_id?: string
  related_post_id?: string
  created_at: string
}

export interface ExternalLink {
  id: string
  title: string
  url: string
  description?: string
  platform?: string
  category: string
  display_order: number
  status: ContentStatus
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface AdminSession {
  userId: string
  email: string
  exp: number
}

/* ── API response helpers ── */
export type ApiSuccess<T> = { data: T; error: null }
export type ApiError = { data: null; error: string }
export type ApiResult<T> = ApiSuccess<T> | ApiError
