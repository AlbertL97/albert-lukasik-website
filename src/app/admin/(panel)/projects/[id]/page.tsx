import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import EditProjectForm from './EditProjectForm'

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const supabase = await createServiceClient()

  const { data: project } = await supabase
    .from('projects')
    .select('*, project_links(*)')
    .eq('id', id)
    .single()

  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Edit Project</h1>
        <p className="text-da-text-muted text-sm">{project.title}</p>
      </div>
      <EditProjectForm project={project} projectId={id} />
    </div>
  )
}
