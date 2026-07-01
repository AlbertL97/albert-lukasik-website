'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const schema = z.object({
  course_title: z.string().min(1, 'Course title is required'),
  description: z.string().min(1, 'Description is required'),
  institution: z.string().min(1, 'Institution is required'),
  academic_year: z.string().min(1, 'Academic year is required'),
  level: z.enum(['undergraduate', 'graduate', 'workshop', 'open']),
  topics: z.string(),
  materials_url: z.string(),
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

interface TeachingFormProps {
  defaultValues?: Partial<FormData>
  entryId?: string
}

export default function TeachingForm({ defaultValues, entryId }: TeachingFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      level: 'undergraduate',
      status: 'draft',
      display_order: 0,
      topics: '',
      materials_url: '',
      ...defaultValues,
    },
  })

  async function onSubmit(data: FormData) {
    setError(null)
    const payload = {
      ...data,
      topics: data.topics ? data.topics.split(',').map((s) => s.trim()).filter(Boolean) : [],
      materials_url: data.materials_url || null,
    }

    const res = await fetch(entryId ? `/api/teaching/${entryId}` : '/api/teaching', {
      method: entryId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setError(json.error ?? 'Failed to save')
      return
    }
    router.push('/admin/teaching')
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm('Delete this teaching entry permanently?')) return
    setDeleting(true)
    const res = await fetch(`/api/teaching/${entryId}`, { method: 'DELETE' })
    if (!res.ok) {
      setError('Failed to delete')
      setDeleting(false)
      return
    }
    router.push('/admin/teaching')
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
          <label className={labelClass}>Course Title *</label>
          <input {...register('course_title')} className={inputClass} placeholder="e.g. Introduction to Cognitive Psychology" />
          {errors.course_title && <p className={errorClass}>{errors.course_title.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description *</label>
          <textarea {...register('description')} className={textareaClass} placeholder="Course descriptionâ€¦" />
          {errors.description && <p className={errorClass}>{errors.description.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Institution *</label>
          <input {...register('institution')} className={inputClass} placeholder="University name" />
          {errors.institution && <p className={errorClass}>{errors.institution.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Academic Year *</label>
          <input {...register('academic_year')} className={inputClass} placeholder="2024/2025" />
          {errors.academic_year && <p className={errorClass}>{errors.academic_year.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Level</label>
          <select {...register('level')} className={selectClass}>
            <option value="undergraduate">Undergraduate</option>
            <option value="graduate">Graduate</option>
            <option value="workshop">Workshop</option>
            <option value="open">Open</option>
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

        <div className="md:col-span-2">
          <label className={labelClass}>Topics (comma-separated)</label>
          <input {...register('topics')} className={inputClass} placeholder="perception, memory, attention" />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Materials URL</label>
          <input {...register('materials_url')} className={inputClass} placeholder="https://â€¦" />
        </div>

        <div>
          <label className={labelClass}>Display Order</label>
          <input {...register('display_order', { valueAsNumber: true })} type="number" className={inputClass} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          <Button type="submit" loading={isSubmitting}>
            {entryId ? 'Save Changes' : 'Create Entry'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/teaching')}>
            Cancel
          </Button>
        </div>
        {entryId && (
          <Button type="button" variant="danger" loading={deleting} onClick={handleDelete}>
            Delete Entry
          </Button>
        )}
      </div>
    </form>
  )
}

