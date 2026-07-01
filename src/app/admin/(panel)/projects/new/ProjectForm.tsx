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
  project_type: z.string().min(1, 'Project type is required'),
  role: z.string().min(1, 'Role is required'),
  methods: z.string(),
  technologies: z.string(),
  collaborators: z.string(),
  start_date: z.string(),
  end_date: z.string(),
  project_status: z.enum(['planned', 'ongoing', 'completed', 'archived']),
  cover_image_url: z.string(),
  status: z.enum(['draft', 'published', 'private', 'archived']),
  display_order: z.number().int(),
})

type FormData = z.infer<typeof schema>

interface ProjectFormProps {
  defaultValues?: Partial<FormData>
  projectId?: string
}

const inputClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted'
const textareaClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted resize-y min-h-[120px]'
const selectClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent'
const labelClass = 'block text-sm text-da-text-muted mb-1'
const errorClass = 'text-da-error text-xs mt-1'

export default function ProjectForm({ defaultValues, projectId }: ProjectFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [slugManual, setSlugManual] = useState(!!projectId)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      project_status: 'ongoing',
      status: 'draft',
      display_order: 0,
      methods: '',
      technologies: '',
      collaborators: '',
      start_date: '',
      end_date: '',
      cover_image_url: '',
      ...defaultValues,
    },
  })

  const titleValue = watch('title')
  useEffect(() => {
    if (!slugManual) {
      setValue('slug', slugify(titleValue ?? ''))
    }
  }, [titleValue, slugManual, setValue])

  async function onSubmit(data: FormData) {
    setError(null)
    const payload = {
      ...data,
      methods: data.methods ? data.methods.split(',').map((s) => s.trim()).filter(Boolean) : [],
      technologies: data.technologies ? data.technologies.split(',').map((s) => s.trim()).filter(Boolean) : [],
      collaborators: data.collaborators || null,
      start_date: data.start_date || null,
      end_date: data.end_date || null,
      cover_image_url: data.cover_image_url || null,
    }

    const res = await fetch(projectId ? `/api/projects/${projectId}` : '/api/projects', {
      method: projectId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setError(json.error ?? 'Failed to save project')
      return
    }

    router.push('/admin/projects')
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
          <input {...register('title')} className={inputClass} placeholder="Project title" />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Slug *</label>
          <input
            {...register('slug')}
            className={inputClass}
            placeholder="project-slug"
            onChange={(e) => {
              setSlugManual(true)
              setValue('slug', e.target.value)
            }}
          />
          {errors.slug && <p className={errorClass}>{errors.slug.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Summary *</label>
          <input {...register('summary')} className={inputClass} placeholder="Short summary (1â€“2 sentences)" />
          {errors.summary && <p className={errorClass}>{errors.summary.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Description *</label>
          <textarea {...register('description')} className={textareaClass} placeholder="Full project descriptionâ€¦" />
          {errors.description && <p className={errorClass}>{errors.description.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Project Type *</label>
          <input {...register('project_type')} className={inputClass} placeholder="e.g. research, software" />
          {errors.project_type && <p className={errorClass}>{errors.project_type.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Your Role *</label>
          <input {...register('role')} className={inputClass} placeholder="e.g. Lead researcher" />
          {errors.role && <p className={errorClass}>{errors.role.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Methods (comma-separated)</label>
          <input {...register('methods')} className={inputClass} placeholder="surveys, interviews, â€¦" />
        </div>

        <div>
          <label className={labelClass}>Technologies (comma-separated)</label>
          <input {...register('technologies')} className={inputClass} placeholder="Python, R, â€¦" />
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Collaborators</label>
          <input {...register('collaborators')} className={inputClass} placeholder="Names or institutions" />
        </div>

        <div>
          <label className={labelClass}>Start Date</label>
          <input {...register('start_date')} type="date" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>End Date</label>
          <input {...register('end_date')} type="date" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Project Status</label>
          <select {...register('project_status')} className={selectClass}>
            <option value="planned">Planned</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
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

        <div className="md:col-span-2">
          <label className={labelClass}>Cover Image URL</label>
          <input {...register('cover_image_url')} className={inputClass} placeholder="https://â€¦" />
        </div>

        <div>
          <label className={labelClass}>Display Order</label>
          <input {...register('display_order', { valueAsNumber: true })} type="number" className={inputClass} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" loading={isSubmitting}>
          {projectId ? 'Save Changes' : 'Create Project'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/admin/projects')}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}


