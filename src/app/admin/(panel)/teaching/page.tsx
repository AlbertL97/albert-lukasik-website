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

export default async function TeachingListPage() {
  const supabase = await createServiceClient()
  const { data: entries } = await supabase
    .from('teaching_entries')
    .select('id, course_title, institution, academic_year, level, status, display_order')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-da-text">Teaching</h1>
        <Link href="/admin/teaching/new">
          <Button size="sm">+ New Entry</Button>
        </Link>
      </div>

      <div className="da-card overflow-hidden">
        {!entries || entries.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-da-text-muted text-sm">No teaching entries yet.</p>
            <Link href="/admin/teaching/new" className="text-da-accent text-sm hover:underline mt-2 inline-block">
              Add your first course
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-da-border-subtle">
                <th className="text-left px-5 pb-3 pt-4 font-medium text-da-text-muted">Course</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden md:table-cell">Institution</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden lg:table-cell">Year</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden lg:table-cell">Level</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted">Status</th>
                <th className="px-5 pb-3 pt-4 font-medium text-da-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-da-border-subtle">
              {entries.map((entry) => (
                <tr key={entry.id} className="hover:bg-da-surface-raised transition-colors">
                  <td className="px-5 py-3 text-da-text font-medium">{entry.course_title}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden md:table-cell">{entry.institution}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden lg:table-cell">{entry.academic_year}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden lg:table-cell">{entry.level}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(entry.status as ContentStatus)}>{entry.status}</Badge>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/teaching/${entry.id}`}
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
