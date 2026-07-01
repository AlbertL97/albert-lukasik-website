import TeachingForm from './TeachingForm'

export default function NewTeachingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">New Teaching Entry</h1>
        <p className="text-da-text-muted text-sm">Add a course or teaching activity.</p>
      </div>
      <TeachingForm />
    </div>
  )
}
