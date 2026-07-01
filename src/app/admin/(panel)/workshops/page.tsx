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

export default async function WorkshopsListPage() {
  const supabase = await createServiceClient()
  const { data: workshops } = await supabase
    .from('workshops')
    .select('id, title, format, workshop_status, status, display_order')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-da-text">Workshops</h1>
        <Link href="/admin/workshops/new">
          <Button size="sm">+ New Workshop</Button>
        </Link>
      </div>

      <div className="da-card overflow-hidden">
        {!workshops || workshops.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-da-text-muted text-sm">No workshops yet.</p>
            <Link href="/admin/workshops/new" className="text-da-accent text-sm hover:underline mt-2 inline-block">
              Create your first workshop
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-da-border-subtle">
                <th className="text-left px-5 pb-3 pt-4 font-medium text-da-text-muted">Title</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden md:table-cell">Format</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden lg:table-cell">Availability</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted">Status</th>
                <th className="px-5 pb-3 pt-4 font-medium text-da-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-da-border-subtle">
              {workshops.map((ws) => (
                <tr key={ws.id} className="hover:bg-da-surface-raised transition-colors">
                  <td className="px-5 py-3 text-da-text font-medium">{ws.title}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden md:table-cell">{ws.format}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden lg:table-cell">{ws.workshop_status}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(ws.status as ContentStatus)}>{ws.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/workshops/${ws.id}`}
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
