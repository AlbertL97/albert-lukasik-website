import type { Project, Post, Workshop, TeachingEntry, GalleryItem, ExternalLink, CurrentActivity, SiteProfile } from '@/types'

/* ── helpers ── */
function assertClient(client: ReturnType<typeof import('./server').createClient> extends Promise<infer T> ? T : never) {
  return client
}

/* ── Site profile ── */
export async function getSiteProfile(supabase: any): Promise<SiteProfile | null> {
  const { data } = await supabase.from('site_profile').select('*').single()
  return data
}

/* ── Current activities ── */
export async function getCurrentActivities(supabase: any): Promise<CurrentActivity[]> {
  const { data } = await supabase
    .from('current_activities')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getAllCurrentActivities(supabase: any): Promise<CurrentActivity[]> {
  const { data } = await supabase
    .from('current_activities')
    .select('*')
    .order('display_order', { ascending: true })
  return data ?? []
}

/* ── Projects ── */
export async function getPublishedProjects(supabase: any): Promise<Project[]> {
  const { data } = await supabase
    .from('projects')
    .select('*, project_links(*)')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
  return (data ?? []).map(mapProject)
}

export async function getProjectBySlug(supabase: any, slug: string): Promise<Project | null> {
  const { data } = await supabase
    .from('projects')
    .select('*, project_links(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data ? mapProject(data) : null
}

export async function getAllProjects(supabase: any): Promise<Project[]> {
  const { data } = await supabase
    .from('projects')
    .select('*, project_links(*)')
    .order('display_order', { ascending: true })
  return (data ?? []).map(mapProject)
}

function mapProject(row: any): Project {
  const { project_links, ...rest } = row
  return { ...rest, links: project_links ?? [] }
}

/* ── Teaching ── */
export async function getPublishedTeachingEntries(supabase: any): Promise<TeachingEntry[]> {
  const { data } = await supabase
    .from('teaching_entries')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getAllTeachingEntries(supabase: any): Promise<TeachingEntry[]> {
  const { data } = await supabase
    .from('teaching_entries')
    .select('*')
    .order('display_order', { ascending: true })
  return data ?? []
}

/* ── Workshops ── */
export async function getPublishedWorkshops(supabase: any): Promise<Workshop[]> {
  const { data } = await supabase
    .from('workshops')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getAllWorkshops(supabase: any): Promise<Workshop[]> {
  const { data } = await supabase
    .from('workshops')
    .select('*')
    .order('display_order', { ascending: true })
  return data ?? []
}

/* ── Posts ── */
export async function getPublishedPosts(supabase: any): Promise<Post[]> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
  return data ?? []
}

export async function getPostBySlug(supabase: any, slug: string): Promise<Post | null> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()
  return data
}

export async function getAllPosts(supabase: any): Promise<Post[]> {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

/* ── Gallery ── */
export async function getPublishedGalleryItems(supabase: any): Promise<GalleryItem[]> {
  const { data } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getAllGalleryItems(supabase: any): Promise<GalleryItem[]> {
  const { data } = await supabase
    .from('gallery_items')
    .select('*')
    .order('display_order', { ascending: true })
  return data ?? []
}

/* ── External links ── */
export async function getPublishedExternalLinks(supabase: any): Promise<ExternalLink[]> {
  const { data } = await supabase
    .from('external_links')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
  return data ?? []
}

export async function getAllExternalLinks(supabase: any): Promise<ExternalLink[]> {
  const { data } = await supabase
    .from('external_links')
    .select('*')
    .order('display_order', { ascending: true })
  return data ?? []
}
