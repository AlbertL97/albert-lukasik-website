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

export default async function GalleryListPage() {
  const supabase = await createServiceClient()
  const { data: items } = await supabase
    .from('gallery_items')
    .select('id, title, category, image_url, status, display_order')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl text-da-text">Gallery</h1>
        <Link href="/admin/gallery/new">
          <Button size="sm">+ Add Image</Button>
        </Link>
      </div>

      {!items || items.length === 0 ? (
        <div className="da-card p-8 text-center">
          <p className="text-da-text-muted text-sm">No gallery items yet.</p>
          <Link href="/admin/gallery/new" className="text-da-accent text-sm hover:underline mt-2 inline-block">
            Add your first image
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/admin/gallery/${item.id}`}
              className="group relative aspect-square rounded-lg overflow-hidden border border-da-border hover:border-da-accent transition-colors"
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-da-surface-raised flex items-center justify-center">
                  <span className="text-da-text-muted text-xs">No image</span>
                </div>
              )}
              <div className="absolute inset-0 bg-da-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                <p className="text-da-text text-xs font-medium text-center line-clamp-2">{item.title}</p>
                <Badge variant={statusVariant(item.status as ContentStatus)} className="mt-1 text-[10px]">
                  {item.status}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
