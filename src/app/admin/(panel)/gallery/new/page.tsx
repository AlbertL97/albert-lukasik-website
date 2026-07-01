import GalleryForm from './GalleryForm'

export default function NewGalleryItemPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Add Gallery Image</h1>
        <p className="text-da-text-muted text-sm">Upload a photo to the gallery.</p>
      </div>
      <GalleryForm />
    </div>
  )
}
