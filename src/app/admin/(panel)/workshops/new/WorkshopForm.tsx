'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { slugify } from '@/lib/utils'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  summary: z.string().min(1, 'Summary is required'),
  description: z.string().min(1, 'Description is required'),
  target_audience: z.string().min(1, 'Target audience is required'),
  duration: z.string().min(1, 'Duration is required'),
  format: z.enum(['onsite', 'online', 'hybrid']),
  topics: z.string(),
  learning_outcomes: z.string(),
  required_tools: z.string(),
  cover_image_url: z.string(),
  workshop_status: z.enum(['available', 'planned', 'past', 'archived']),
  status: z.enum(['draft', 'published', 'private', 'archived']),
  display_order: z.number().int(),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted'
const textareaClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted resize-y min-h-[120px]'
const selectClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent'
const labelClass = 'block text-sm text-da-text-muted mb-1'
const errorClass = 'text-da-error text-xs mt-1'

interface WorkshopFormProps {
  defaultValues?: Partial<FormData>
  workshopId?: string
}

export default function WorkshopForm({ defaultValues, workshopId }: WorkshopFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [slugManual, setSlugManual] = useState(!!workshopId)

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      format: 'onsite',
      workshop_status: 'planned',
      status: 'draft',
      display_order: 0,
      topics: '',
      learning_outcomes: '',
      required_tools: '',
      cover_image_url: '',
      ...defaultValues,
    },
  })

  const titleValue = watch('title')
  useEffect(() => {
    if (!slugManual) setValue('slug', slugify(titleValue ?? ''))
  }, [titleValue, slugManual, setValue])

  async function onSubmit(data: FormData) {
    setError(null)
    const payload = {
      ...data,
      topics: data.topics ? data.topics.split(',').map((s) => s.trim()).filter(Boolean) : [],
      learning_outcomes: data.learning_outcomes ? data.learning_outcomes.split('\n').map((s) => s.trim()).filter(Boolean) : [],
      required_tools: data.required_tools || null,
      cover_image_url: data.cover_image_url || null,
    }

    const res = await fetch(workshopId ? `/api/workshops/${workshopId}` : '/api/workshops', {
      method: workshopId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setError(json.error ?? 'Failed to save')
      return
    }
    router.push('/admin/workshops')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this workshop permanently?')) return
    setDeleting(true)
    const res = await fetch(`/api/workshops/${workshopId}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Failed to delete')
      setDeleting(false)
      return
    }
    router.push('/admin/workshops')
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
          <input {...register('title')} className={inputClass} placeholder="Workshop title" />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Slug *</label>
          <input
            {...register('slug')}
            className={inputClass}
            onChange={(e) => { setSlugManual(true); setValue('slug', e.target.value) }}
          />
          {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Summary *</label>
          <input {...register('summary')} className={inputClass} placeholder="Short description" />
          {errors.summary && <p className={errorClass}>{errors.summary.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description *</label>
          <textarea {...register('description')} className={textareaClass} placeholder="Full workshop descriptionâ€¦" />
          {errors.description && <p className={errorClass}>{errors.description.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Target Audience *</label>
          <input {...register('target_audience')} className={inputClass} placeholder="Researchers, studentsâ€¦" />
          {errors.target_audience && <p className={errorClass}>{errors.target_audience.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Duration *</label>
          <input {...register('duration')} className={inputClass} placeholder="3 hours, 2 daysâ€¦" />
          {errors.duration && <p className={errorClass}>{errors.duration.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Format</label>
          <select {...register('format')} className={selectClass}>
            <option value="onsite">On-site</option>
            <option value="online">Online</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Availability</label>
          <select {...register('workshop_status')} className={selectClass}>
            <option value="available">Available</option>
            <option value="planned">Planned</option>
            <option value="past">Past</option>
            <option value="archived">Archived</option>
          </select>
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

        <div className="md:col-span-2">
          <label className={labelClass}>Topics (comma-separated)</label>
          <input {...register('topics')} className={inputClass} placeholder="statistics, R, experimental design" />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Learning Outcomes (one per line)</label>
          <textarea {...register('learning_outcomes')} className={textareaClass} placeholder="Understandâ€¦&#10;Applyâ€¦&#10;Evaluateâ€¦" />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Required Tools</label>
          <input {...register('required_tools')} className={inputClass} placeholder="R, RStudio, laptop" />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Cover Image URL</label>
          <input {...register('cover_image_url')} className={inputClass} placeholder="https://â€¦" />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <Button type="submit" loading={isSubmitting}>
            {workshopId ? 'Save Changes' : 'Create Workshop'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/workshops')}>
            Cancel
          </Button>
        </div>
        {workshopId && (
          <Button type="button" variant="danger" loading={deleting} onClick={handleDelete}>
            Delete Workshop
          </Button>
        )}
      </div>
    </form>
  )
}


