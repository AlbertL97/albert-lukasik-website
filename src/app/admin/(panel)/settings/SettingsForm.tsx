'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  tagline: z.string().min(1, 'Tagline is required'),
  bio: z.string().min(1, 'Bio is required'),
  location: z.string(),
  email: z.string().email('Must be a valid email'),
  avatar_url: z.string(),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted'
const textareaClass =
  'w-full bg-da-surface-raised border border-da-border rounded-lg px-3 py-2 text-da-text text-sm focus:outline-none focus:border-da-accent placeholder:text-da-text-muted resize-y min-h-[120px]'
const labelClass = 'block text-sm text-da-text-muted mb-1'
const errorClass = 'text-da-error text-xs mt-1'

export default function SettingsForm({ profile }: { profile: any }) {
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: profile?.name ?? '',
      tagline: profile?.tagline ?? '',
      bio: profile?.bio ?? '',
      location: profile?.location ?? '',
      email: profile?.email ?? '',
      avatar_url: profile?.avatar_url ?? '',
    },
  })

  async function onSubmit(data: FormData) {
    setError(null)
    setSaved(false)

    const payload = {
      ...data,
      location: data.location || null,
      avatar_url: data.avatar_url || null,
    }

    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const json = await res.json()
      setError(json.error ?? 'Failed to save settings')
      return
    }

    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-950/40 border border-red-900/40 rounded-lg px-4 py-3">
          <p className="text-da-error text-sm">{error}</p>
        </div>
      )}

      {saved && (
        <div className="bg-green-950/40 border border-green-900/40 rounded-lg px-4 py-3">
          <p className="text-da-success text-sm">Settings saved successfully.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className={labelClass}>Full Name *</label>
          <input {...register('name')} className={inputClass} placeholder="Albert Łukasik" />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Tagline *</label>
          <input
            {...register('tagline')}
            className={inputClass}
            placeholder="Researcher · Cognitive Scientist · Educator"
          />
          {errors.tagline && <p className={errorClass}>{errors.tagline.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Bio *</label>
          <textarea
            {...register('bio')}
            className={textareaClass}
            style={{ minHeight: '180px' }}
            placeholder="About you — shown on the homepage…"
          />
          {errors.bio && <p className={errorClass}>{errors.bio.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input {...register('location')} className={inputClass} placeholder="Warsaw, Poland" />
        </div>

        <div>
          <label className={labelClass}>Email *</label>
          <input {...register('email')} type="email" className={inputClass} placeholder="albert@example.com" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label className={labelClass}>Avatar URL</label>
          <input {...register('avatar_url')} className={inputClass} placeholder="https://… (profile photo)" />
          {errors.avatar_url && <p className={errorClass}>{errors.avatar_url.message}</p>}
        </div>
      </div>

      <div className="pt-2">
        <Button type="submit" loading={isSubmitting}>Save Settings</Button>
      </div>
    </form>
  )
}
