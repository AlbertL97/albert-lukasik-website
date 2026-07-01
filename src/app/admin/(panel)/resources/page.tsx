import Link from 'next/link'
import { createServiceClient } from '@/lib/supabase/server'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import type { ContentStatus } from '@/types'

function statusVariant(status: ContentStatus) {
  if (status === 'published') return 'success'
  if (status === 'archived') return 'muted'
  return 'default'
}

export default async function ResourcesListPage() {
  const supabase = await createServiceClient()
  const { data: links } = await supabase
    .from('external_links')
    .select('id, title, url, platform, category, status, display_order')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-da-text">Resources</h1>
        <Link href="/admin/resources/new">
          <Button size="sm">+ New Resource</Button>
        </Link>
      </div>

      <div className="da-card overflow-hidden">
        {!links || links.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-da-text-muted text-sm">No resources yet.</p>
            <Link href="/admin/resources/new" className="text-da-accent text-sm hover:underline mt-2 inline-block">
              Add your first link
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-da-border-subtle">
                <th className="text-left px-5 pb-3 pt-4 font-medium text-da-text-muted">#</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted">Title</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden md:table-cell">Platform</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden md:table-cell">Category</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted">Status</th>
                <th className="px-5 pb-3 pt-4 font-medium text-da-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-da-border-subtle">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-da-surface-raised transition-colors">
                  <td className="px-5 py-3 text-da-text-muted text-xs">{link.display_order}</td>
                  <td className="px-4 py-3">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-da-text hover:text-da-accent transition-colors"
                    >
                      {link.title}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-da-text-muted hidden md:table-cell">{link.platform ?? '—'}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden md:table-cell">{link.category}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(link.status as ContentStatus)}>{link.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/resources/${link.id}`}
                      className="text-xs text-da-text-muted hover:text-da-accent transition-colors px-2 py-1 rounded hover:bg-da-surface-raised"
                    >
                      Edit
                    </Link>
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
