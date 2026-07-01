import ProjectForm from './ProjectForm'

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">New Project</h1>
        <p className="text-da-text-muted text-sm">Add a new research project or work.</p>
      </div>
      <ProjectForm />
    </div>
  )
}
