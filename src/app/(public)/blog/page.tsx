import Link from 'next/link'
import Image from 'next/image'
import { Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPublishedPosts } from '@/lib/supabase/queries'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import type { Post } from '@/types'
import { formatDate, truncate } from '@/lib/utils'

export const metadata = {
  title: 'Blog — Albert Łukasik',
  description: 'Articles, vlogs, and notes on cognitive science, neurotechnology, VR, and AI research.',
}

const POST_TYPE_LABELS: Record<string, string> = {
  article: 'Article',
  vlog: 'Vlog',
  note: 'Note',
  resource_list: 'Resource List',
}

function postTypeVariant(type: string): 'accent' | 'success' | 'muted' | 'default' {
  if (type === 'article') return 'accent'
  if (type === 'vlog') return 'success'
  if (type === 'resource_list') return 'default'
  return 'muted'
}

export default async function BlogPage() {
  let posts: Post[] = []
  try {
    const supabase = await createClient()
    posts = await getPublishedPosts(supabase)
  } catch {
    // empty state
  }

  const postTypes = Array.from(new Set(posts.map((p) => p.post_type)))

  return (
    <main>
      {/* ── Hero ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, #c9a86c 6%, transparent), transparent)',
          }}
        />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Writing"
            title="Blog & Notes"
            description="Thoughts, experiments, and resources on cognitive science, neurotechnology, AI, and the future of learning."
          />
        </div>
      </section>

      {/* ── Posts ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Type filter pills (static display — full filtering would require a client component) */}
          {postTypes.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="px-3 py-1 rounded-full text-xs font-medium border bg-da-accent-dim text-da-accent border-da-accent/30 cursor-default">
                All
              </span>
              {postTypes.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 rounded-full text-xs font-medium border bg-da-surface border-da-border text-da-text-muted cursor-default"
                >
                  {POST_TYPE_LABELS[type] ?? type}
                </span>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-32">
              <Newspaper size={40} className="text-da-text-faint mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-da-text mb-2">No posts yet</h3>
              <p className="text-da-text-muted">Check back soon — writing is coming.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group da-card flex flex-col overflow-hidden">
                  {/* Cover image */}
                  {post.cover_image_url && (
                    <div className="relative aspect-video w-full overflow-hidden bg-da-surface-raised">
                      <Image
                        src={post.cover_image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant={postTypeVariant(post.post_type)}>
                        {POST_TYPE_LABELS[post.post_type] ?? post.post_type}
                      </Badge>
                      {post.published_at && (
                        <span className="text-xs text-da-text-faint">
                          {formatDate(post.published_at)}
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif text-lg font-semibold text-da-text leading-snug mb-3 group-hover:text-da-accent transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-sm text-da-text-muted leading-relaxed flex-1">
                      {truncate(post.excerpt, 140)}
                    </p>

                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="muted">{tag}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
