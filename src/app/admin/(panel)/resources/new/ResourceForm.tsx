'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Must be a valid URL'),
  description: z.string(),
  platform: z.string(),
  category: z.string().min(1, 'Category is required'),
  display_order: z.number().int(),
  status: z.enum(['draft', 'published', 'private', 'archived']),
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

interface ResourceFormProps {
  defaultValues?: Partial<FormData>
  resourceId?: string
}

export default function ResourceForm({ defaultValues, resourceId }: ResourceFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      status: 'published',
      display_order: 0,
      description: '',
      platform: '',
      ...defaultValues,
    },
  })

  async function onSubmit(data: FormData) {
    setError(null)
    const payload = {
      ...data,
      description: data.description || null,
      platform: data.platform || null,
    }

    const res = await fetch(resourceId ? `/api/resources/${resourceId}` : '/api/resources', {
      method: resourceId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setError(json.error ?? 'Failed to save')
      return
    }
    router.push('/admin/resources')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this resource permanently?')) return
    setDeleting(true)
    const res = await fetch(`/api/resources/${resourceId}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Failed to delete')
      setDeleting(false)
      return
    }
    router.push('/admin/resources')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-950/40 border border-red-900/40 rounded-lg px-4 py-3">
          <p className="text-da-error text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Title *</label>
          <input {...register('title')} className={inputClass} placeholder="Resource title" />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>URL *</label>
          <input {...register('url')} type="url" className={inputClass} placeholder="https://â€¦" />
          {errors.url && <p className={errorClass}>{errors.url.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea {...register('description')} className={textareaClass} placeholder="Brief description of this linkâ€¦" />
        </div>

        <div>
          <label className={labelClass}>Platform</label>
          <input {...register('platform')} className={inputClass} placeholder="GitHub, ResearchGate, YouTubeâ€¦" />
        </div>

        <div>
          <label className={labelClass}>Category *</label>
          <input {...register('category')} className={inputClass} placeholder="code, publications, talksâ€¦" />
          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Display Order</label>
          <input {...register('display_order', { valueAsNumber: true })} type="number" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Visibility</label>
          <select {...register('status')} className={selectClass}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="private">Private</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <Button type="submit" loading={isSubmitting}>
            {resourceId ? 'Save Changes' : 'Create Resource'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/resources')}>
            Cancel
          </Button>
        </div>
        {resourceId && (
          <Button type="button" variant="danger" loading={deleting} onClick={handleDelete}>
            Delete Resource
          </Button>
        )}
      </div>
    </form>
  )
}


