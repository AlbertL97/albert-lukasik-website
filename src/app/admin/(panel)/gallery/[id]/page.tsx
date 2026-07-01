import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import GalleryForm from '../new/GalleryForm'

export default async function EditGalleryItemPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const supabase = await createServiceClient()

  const { data: item } = await supabase
    .from('gallery_items')
    .select('*')
    .eq('id', id)
    .single()

  if (!item) notFound()

  const defaultValues = {
    title: item.title ?? '',
    description: item.description ?? '',
    image_url: item.image_url ?? '',
    alt_text: item.alt_text ?? '',
    date: item.date ?? '',
    location: item.location ?? '',
    category: item.category ?? '',
    status: item.status ?? 'draft',
    display_order: item.display_order ?? 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Edit Gallery Item</h1>
        <p className="text-da-text-muted text-sm">{item.title}</p>
      </div>
      <GalleryForm defaultValues={defaultValues as any} itemId={id} />
    </div>
  )
}
