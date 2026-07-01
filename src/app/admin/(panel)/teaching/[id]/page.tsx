import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import TeachingForm from '../new/TeachingForm'

export default async function EditTeachingPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const supabase = await createServiceClient()

  const { data: entry } = await supabase
    .from('teaching_entries')
    .select('*')
    .eq('id', id)
    .single()

  if (!entry) notFound()

  const defaultValues = {
    course_title: entry.course_title ?? '',
    description: entry.description ?? '',
    institution: entry.institution ?? '',
    academic_year: entry.academic_year ?? '',
    level: entry.level ?? 'undergraduate',
    topics: (entry.topics ?? []).join(', '),
    materials_url: entry.materials_url ?? '',
    status: entry.status ?? 'draft',
    display_order: entry.display_order ?? 0,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Edit Teaching Entry</h1>
        <p className="text-da-text-muted text-sm">{entry.course_title}</p>
      </div>
      <TeachingForm defaultValues={defaultValues as any} entryId={id} />
    </div>
  )
}
