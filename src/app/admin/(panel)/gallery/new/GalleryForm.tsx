'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import Button from '@/components/ui/Button'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  image_url: z.string().min(1, 'Image is required'),
  alt_text: z.string().min(1, 'Alt text is required'),
  date: z.string(),
  location: z.string(),
  category: z.string().min(1, 'Category is required'),
  status: z.enum(['draft', 'published', 'private', 'archived']),
  display_order: z.number().int(),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted'
const textareaClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted resize-y min-h-[80px]'
const selectClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent'
const labelClass = 'block text-sm text-da-text-muted mb-1'
const errorClass = 'text-da-error text-xs mt-1'

interface GalleryFormProps {
  defaultValues?: Partial<FormData>
  itemId?: string
}

export default function GalleryForm({ defaultValues, itemId }: GalleryFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>(defaultValues?.image_url ?? '')
  const fileRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'draft',
      display_order: 0,
      description: '',
      date: '',
      location: '',
      ...defaultValues,
    },
  })

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)

    const form = new FormData()
    form.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: form })
    setUploading(false)

    if (!res.ok) {
      const json = await res.json()
      setError(json.error ?? 'Upload failed')
      return
    }

    const { url } = await res.json()
    setValue('image_url', url)
    setPreview(url)
  }

  async function onSubmit(data: FormData) {
    setError(null)
    const payload = {
      ...data,
      description: data.description || null,
      date: data.date || null,
      location: data.location || null,
    }

    const res = await fetch(itemId ? `/api/gallery/${itemId}` : '/api/gallery', {
      method: itemId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setError(json.error ?? 'Failed to save')
      return
    }
    router.push('/admin/gallery')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this gallery item permanently?')) return
    setDeleting(true)
    const res = await fetch(`/api/gallery/${itemId}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Failed to delete')
      setDeleting(false)
      return
    }
    router.push('/admin/gallery')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-950/40 border border-red-900/40 rounded-lg px-4 py-3">
          <p className="text-da-error text-sm">{error}</p>
        </div>
      )}

      {/* Image upload */}
      <div>
        <label className={labelClass}>Image *</label>
        <div className="space-y-3">
          {preview && (
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-da-border">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={fileRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              loading={uploading}
              onClick={() => fileRef.current?.click()}
            >
              {uploading ? 'Uploadingâ€¦' : 'Upload Image'}
            </Button>
            <span className="text-xs text-da-text-muted">or paste a URL below</span>
          </div>
          <input
            {...register('image_url')}
            className={inputClass}
            placeholder="https://â€¦ (auto-filled after upload)"
            onChange={(e) => {
              setValue('image_url', e.target.value)
              setPreview(e.target.value)
            }}
          />
          {errors.image_url && <p className={errorClass}>{errors.image_url.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Title *</label>
          <input {...register('title')} className={inputClass} placeholder="Image title" />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Alt Text *</label>
          <input {...register('alt_text')} className={inputClass} placeholder="Descriptive text for screen readers" />
          {errors.alt_text && <p className={errorClass}>{errors.alt_text.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea {...register('description')} className={textareaClass} placeholder="Optional captionâ€¦" />
        </div>

        <div>
          <label className={labelClass}>Category *</label>
          <input {...register('category')} className={inputClass} placeholder="fieldwork, conference, labâ€¦" />
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Date</label>
          <input {...register('date')} type="date" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input {...register('location')} className={inputClass} placeholder="City, Country" />
        </div>

        <div>
          <label className={labelClass}>Visibility</label>
          <select {...register('status')} className={selectClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="private">Private</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Display Order</label>
          <input {...register('display_order', { valueAsNumber: true })} type="number" className={inputClass} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <Button type="submit" loading={isSubmitting}>
            {itemId ? 'Save Changes' : 'Add to Gallery'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/gallery')}>
            Cancel
          </Button>
        </div>
        {itemId && (
          <Button type="button" variant="danger" loading={deleting} onClick={handleDelete}>
            Delete Item
          </Button>
        )}
      </div>
    </form>
  )
}

