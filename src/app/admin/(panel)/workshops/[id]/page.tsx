import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import WorkshopForm from '../new/WorkshopForm'

export default async function EditWorkshopPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const supabase = await createServiceClient()

  const { data: ws } = await supabase
    .from('workshops')
    .select('*')
    .eq('id', id)
    .single()

  if (!ws) notFound()

  const defaultValues = {
    title: ws.title ?? '',
    slug: ws.slug ?? '',
    summary: ws.summary ?? '',
    description: ws.description ?? '',
    target_audience: ws.target_audience ?? '',
    duration: ws.duration ?? '',
    format: ws.format ?? 'onsite',
    topics: (ws.topics ?? []).join(', '),
    learning_outcomes: (ws.learning_outcomes ?? []).join('\n'),
    required_tools: ws.required_tools ?? '',
    cover_image_url: ws.cover_image_url ?? '',
    workshop_status: ws.workshop_status ?? 'planned',
    status: ws.status ?? 'draft',
    display_order: ws.display_order ?? 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Edit Workshop</h1>
        <p className="text-da-text-muted text-sm">{ws.title}</p>
      </div>
      <WorkshopForm defaultValues={defaultValues as any} workshopId={id} />
    </div>
  )
}
