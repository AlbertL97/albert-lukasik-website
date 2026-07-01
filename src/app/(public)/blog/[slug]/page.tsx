import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPostBySlug } from '@/lib/supabase/queries'
import Badge from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import type { Post } from '@/types'

type Props = { params: Promise<{ slug: string }> }

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

function getEmbedUrl(url: string): string {
  if (url.includes('youtube.com/watch?v=')) {
    const id = url.split('v=')[1]?.split('&')[0]
    return `https://www.youtube.com/embed/${id}`
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${id}`
  }
  if (url.includes('vimeo.com/')) {
    const id = url.split('vimeo.com/')[1]?.split('?')[0]
    return `https://player.vimeo.com/video/${id}`
  }
  return url
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  let post: Post | null = null

  try {
    const supabase = await createClient()
    post = await getPostBySlug(supabase, slug)
  } catch {
    // no post
  }

  if (!post) {
    return { title: 'Post not found — Albert Łukasik' }
  }

  return {
    title: post.seo_title ?? `${post.title} — Albert Łukasik`,
    description: post.seo_description ?? post.excerpt,
    openGraph: {
      title: post.seo_title ?? post.title,
      description: post.seo_description ?? post.excerpt,
      images: post.cover_image_url ? [{ url: post.cover_image_url }] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  let post: Post | null = null

  try {
    const supabase = await createClient()
    post = await getPostBySlug(supabase, slug)
  } catch {
    // post stays null
  }

  if (!post) {
    notFound()
  }

  const isYouTube = post.video_url?.includes('youtube.com') || post.video_url?.includes('youtu.be')
  const isVimeo = post.video_url?.includes('vimeo.com')

  return (
    <main>
      {/* ── Back link ── */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-da-text-muted hover:text-da-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>
      </div>

      {/* ── Header ── */}
      <header className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant={postTypeVariant(post.post_type)}>
              {POST_TYPE_LABELS[post.post_type] ?? post.post_type}
            </Badge>
            {post.published_at && (
              <span className="text-sm text-da-text-faint">
                {formatDate(post.published_at)}
              </span>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-da-text leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 text-lg text-da-text-muted leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="muted">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ── Cover image ── */}
      {post.cover_image_url && !post.video_url && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-10">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-da-border">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* ── Video embed ── */}
      {post.video_url && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-10">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-da-border bg-da-surface-raised">
            {isYouTube || isVimeo ? (
              <iframe
                src={getEmbedUrl(post.video_url)}
                title={post.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <video
                src={post.video_url}
                controls
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <article className="pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {post.content ? (
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="prose prose-lg max-w-none">
              <p className="text-da-text-muted">{post.excerpt}</p>
            </div>
          )}

          {/* Footer divider */}
          <hr className="da-divider mt-12 mb-8" />

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Badge key={tag} variant="muted">{tag}</Badge>
              ))}
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-da-accent hover:text-da-accent-hover transition-colors"
            >
              <ArrowLeft size={14} />
              All posts
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
