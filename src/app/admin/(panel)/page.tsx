import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { ContentStatus } from '@/types'

function statusVariant(status: ContentStatus) {
  if (status === 'published') return 'success'
  if (status === 'archived') return 'muted'
  return 'default'
}

export default async function AdminDashboardPage() {
  const supabase = await createServiceClient()

  const [
    { count: projectCount },
    { count: postCount },
    { count: workshopCount },
    { count: teachingCount },
    { data: recentPosts },
    { data: recentProjects },
  ] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('workshops').select('*', { count: 'exact', head: true }),
    supabase.from('teaching_entries').select('*', { count: 'exact', head: true }),
    supabase
      .from('posts')
      .select('id, title, status, updated_at, post_type')
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('projects')
      .select('id, title, status, updated_at, project_type')
      .order('updated_at', { ascending: false })
      .limit(5),
  ])

  const stats = [
    { label: 'Projects', count: projectCount ?? 0, href: '/admin/projects' },
    { label: 'Posts', count: postCount ?? 0, href: '/admin/posts' },
    { label: 'Workshops', count: workshopCount ?? 0, href: '/admin/workshops' },
    { label: 'Teaching', count: teachingCount ?? 0, href: '/admin/teaching' },
  ]

  const quickActions = [
    { label: 'New Project', href: '/admin/projects/new' },
    { label: 'New Post', href: '/admin/posts/new' },
    { label: 'New Workshop', href: '/admin/workshops/new' },
    { label: 'New Teaching Entry', href: '/admin/teaching/new' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Admin Dashboard</h1>
        <p className="text-da-text-muted text-sm">Welcome back, Albert.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="da-card p-5 hover:border-da-border transition-colors group"
          >
            <p className="text-3xl font-semibold text-da-text group-hover:text-da-accent transition-colors">
              {s.count}
            </p>
            <p className="text-da-text-muted text-sm mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <p className="da-label mb-3">Quick Actions</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-da-surface-raised border border-da-border text-da-text hover:border-da-accent hover:text-da-accent transition-colors"
            >
              <span className="text-da-accent">+</span> {a.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent posts */}
        <div className="da-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="da-label">Recent Posts</p>
            <Link href="/admin/posts" className="text-xs text-da-text-muted hover:text-da-accent transition-colors">
              View all →
            </Link>
          </div>
          {!recentPosts || recentPosts.length === 0 ? (
            <p className="text-da-text-muted text-sm">No posts yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li key={post.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="text-sm text-da-text hover:text-da-accent transition-colors truncate block"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-da-text-muted mt-0.5">
                      {formatDate(post.updated_at)} · {post.post_type}
                    </p>
                  </div>
                  <Badge variant={statusVariant(post.status as ContentStatus)} className="shrink-0">
                    {post.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent projects */}
        <div className="da-card p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="da-label">Recent Projects</p>
            <Link href="/admin/projects" className="text-xs text-da-text-muted hover:text-da-accent transition-colors">
              View all →
            </Link>
          </div>
          {!recentProjects || recentProjects.length === 0 ? (
            <p className="text-da-text-muted text-sm">No projects yet.</p>
          ) : (
            <ul className="space-y-3">
              {recentProjects.map((proj) => (
                <li key={proj.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="text-sm text-da-text hover:text-da-accent transition-colors truncate block"
                    >
                      {proj.title}
                    </Link>
                    <p className="text-xs text-da-text-muted mt-0.5">
                      {formatDate(proj.updated_at)} · {proj.project_type}
                    </p>
                  </div>
                  <Badge variant={statusVariant(proj.status as ContentStatus)} className="shrink-0">
                    {proj.status}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
