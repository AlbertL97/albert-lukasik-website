import ResourceForm from './ResourceForm'

export default function NewResourcePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">New Resource</h1>
        <p className="text-da-text-muted text-sm">Add an external link or resource.</p>
      </div>
      <ResourceForm />
    </div>
  )
}
