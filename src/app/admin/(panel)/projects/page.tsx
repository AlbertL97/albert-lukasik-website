import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'
import type { ContentStatus } from '@/types'

function statusVariant(status: ContentStatus) {
  if (status === 'published') return 'success'
  if (status === 'archived') return 'muted'
  return 'default'
}

export default async function ProjectsListPage() {
  const supabase = await createServiceClient()
  const { data: projects } = await supabase
    .from('projects')
    .select('id, title, project_type, project_status, status, updated_at, display_order')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-da-text">Research & Projects</h1>
        <Link href="/admin/projects/new">
          <Button size="sm">+ New Project</Button>
        </Link>
      </div>

      <div className="da-card overflow-hidden">
        {!projects || projects.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-da-text-muted text-sm">No projects yet.</p>
            <Link href="/admin/projects/new" className="text-da-accent text-sm hover:underline mt-2 inline-block">
              Create your first project
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-da-border-subtle">
                <th className="text-left px-5 pb-3 pt-4 font-medium text-da-text-muted">Title</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden md:table-cell">Type</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden lg:table-cell">Progress</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted">Status</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden lg:table-cell">Updated</th>
                <th className="px-5 pb-3 pt-4 font-medium text-da-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-da-border-subtle">
              {projects.map((proj) => (
                <tr key={proj.id} className="hover:bg-da-surface-raised transition-colors">
                  <td className="px-5 py-3 text-da-text font-medium">{proj.title}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden md:table-cell">{proj.project_type}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden lg:table-cell">{proj.project_status}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(proj.status as ContentStatus)}>{proj.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-da-text-muted hidden lg:table-cell text-xs">
                    {formatDate(proj.updated_at)}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="text-xs text-da-text-muted hover:text-da-accent transition-colors px-2 py-1 rounded hover:bg-da-surface-raised"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
