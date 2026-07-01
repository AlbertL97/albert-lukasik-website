import WorkshopForm from './WorkshopForm'

export default function NewWorkshopPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">New Workshop</h1>
        <p className="text-da-text-muted text-sm">Add a workshop you offer or have offered.</p>
      </div>
      <WorkshopForm />
    </div>
  )
}
