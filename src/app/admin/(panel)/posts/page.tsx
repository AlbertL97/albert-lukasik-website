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

export default async function PostsListPage() {
  const supabase = await createServiceClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, post_type, status, published_at, updated_at')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-da-text">Blog / Vlog</h1>
        <Link href="/admin/posts/new">
          <Button size="sm">+ New Post</Button>
        </Link>
      </div>

      <div className="da-card overflow-hidden">
        {!posts || posts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-da-text-muted text-sm">No posts yet.</p>
            <Link href="/admin/posts/new" className="text-da-accent text-sm hover:underline mt-2 inline-block">
              Write your first post
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-da-border-subtle">
                <th className="text-left px-5 pb-3 pt-4 font-medium text-da-text-muted">Title</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden md:table-cell">Type</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted">Status</th>
                <th className="text-left px-4 pb-3 pt-4 font-medium text-da-text-muted hidden lg:table-cell">Published</th>
                <th className="px-5 pb-3 pt-4 font-medium text-da-text-muted text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-da-border-subtle">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-da-surface-raised transition-colors">
                  <td className="px-5 py-3 text-da-text font-medium">{post.title}</td>
                  <td className="px-4 py-3 text-da-text-muted hidden md:table-cell">{post.post_type}</td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(post.status as ContentStatus)}>{post.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-da-text-muted hidden lg:table-cell text-xs">
                    {post.published_at ? formatDate(post.published_at) : '—'}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link
                      href={`/admin/posts/${post.id}`}
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
