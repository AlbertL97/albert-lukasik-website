import Image from 'next/image'
import { Camera } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getPublishedGalleryItems } from '@/lib/supabase/queries'
import SectionHeader from '@/components/ui/SectionHeader'
import type { GalleryItem } from '@/types'
import { formatDateShort } from '@/lib/utils'

export const metadata = {
  title: 'Gallery — Albert Łukasik',
  description: 'Photos and visual documentation from research, conferences, and field work.',
}

export default async function GalleryPage() {
  let items: GalleryItem[] = []
  try {
    const supabase = await createClient()
    items = await getPublishedGalleryItems(supabase)
  } catch {
    // empty state
  }

  const categories = Array.from(new Set(items.map((item) => item.category))).filter(Boolean)

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
            label="Gallery"
            title="Gallery"
            description="Visual documentation of research, conferences, lab work, and field experiences."
          />
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Category filter pills */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="px-3 py-1 rounded-full text-xs font-medium border bg-da-accent-dim text-da-accent border-da-accent/30 cursor-default">
                All
              </span>
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full text-xs font-medium border bg-da-surface border-da-border text-da-text-muted cursor-default capitalize"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center py-32">
              <Camera size={40} className="text-da-text-faint mx-auto mb-4" />
              <h3 className="font-serif text-xl font-semibold text-da-text mb-2">No photos yet</h3>
              <p className="text-da-text-muted">Gallery content will appear here soon.</p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {items.map((item) => (
                <GalleryCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="group relative break-inside-avoid da-card overflow-hidden">
      <div className="relative w-full">
        <Image
          src={item.image_url}
          alt={item.alt_text || item.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-da-bg/90 via-da-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="font-serif text-sm font-semibold text-da-text leading-snug">{item.title}</p>
        {(item.location || item.date) && (
          <p className="text-xs text-da-text-muted mt-1">
            {[item.location, item.date ? formatDateShort(item.date) : null].filter(Boolean).join(' · ')}
          </p>
        )}
        {item.description && (
          <p className="text-xs text-da-text-muted mt-1 line-clamp-2">{item.description}</p>
        )}
      </div>

      {/* Always-visible caption on mobile */}
      <div className="sm:hidden p-3 bg-da-surface border-t border-da-border-subtle">
        <p className="text-sm font-medium text-da-text">{item.title}</p>
        {item.location && (
          <p className="text-xs text-da-text-muted mt-0.5">{item.location}</p>
        )}
      </div>
    </div>
  )
}
