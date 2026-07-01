import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import ResourceForm from '../new/ResourceForm'

export default async function EditResourcePage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const supabase = await createServiceClient()

  const { data: link } = await supabase
    .from('external_links')
    .select('*')
    .eq('id', id)
    .single()

  if (!link) notFound()

  const defaultValues = {
    title: link.title ?? '',
    url: link.url ?? '',
    description: link.description ?? '',
    platform: link.platform ?? '',
    category: link.category ?? '',
    display_order: link.display_order ?? 0,
    status: link.status ?? 'published',
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Edit Resource</h1>
        <p className="text-da-text-muted text-sm">{link.title}</p>
      </div>
      <ResourceForm defaultValues={defaultValues as any} resourceId={id} />
    </div>
  )
}
