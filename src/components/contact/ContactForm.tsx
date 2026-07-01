'use client'

import { useActionState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { submitContactForm, type ContactFormState } from '@/app/(public)/contact/actions'

const initialState: ContactFormState = { success: false }

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactForm, initialState)

  if (state.success) {
    return (
      <div className="da-card p-10 text-center">
        <CheckCircle2 size={40} className="text-da-success mx-auto mb-4" />
        <h3 className="font-serif text-2xl font-semibold text-da-text mb-3">
          Message sent!
        </h3>
        <p className="text-da-text-muted text-sm leading-relaxed max-w-sm mx-auto">
          Thank you for reaching out. I&apos;ll get back to you as soon as I can — usually within a few days.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {/* Honeypot — hidden from users, visible to bots */}
      <div aria-hidden="true" className="hidden" tabIndex={-1}>
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      {/* General error */}
      {state.error && (
        <p className="text-sm text-da-error bg-red-950/30 border border-red-900/30 rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-da-text mb-1.5">
          Name <span className="text-da-error">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Your full name"
          className={`w-full px-4 py-2.5 rounded-lg bg-da-surface-raised border text-da-text text-sm placeholder:text-da-text-faint focus:outline-none focus:ring-2 focus:ring-da-accent focus:border-transparent transition-colors ${
            state.fieldErrors?.name ? 'border-da-error' : 'border-da-border'
          }`}
        />
        {state.fieldErrors?.name && (
          <p className="mt-1 text-xs text-da-error">{state.fieldErrors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-da-text mb-1.5">
          Email <span className="text-da-error">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="your@email.com"
          className={`w-full px-4 py-2.5 rounded-lg bg-da-surface-raised border text-da-text text-sm placeholder:text-da-text-faint focus:outline-none focus:ring-2 focus:ring-da-accent focus:border-transparent transition-colors ${
            state.fieldErrors?.email ? 'border-da-error' : 'border-da-border'
          }`}
        />
        {state.fieldErrors?.email && (
          <p className="mt-1 text-xs text-da-error">{state.fieldErrors.email}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-da-text mb-1.5">
          Subject <span className="text-da-error">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="What is this about?"
          className={`w-full px-4 py-2.5 rounded-lg bg-da-surface-raised border text-da-text text-sm placeholder:text-da-text-faint focus:outline-none focus:ring-2 focus:ring-da-accent focus:border-transparent transition-colors ${
            state.fieldErrors?.subject ? 'border-da-error' : 'border-da-border'
          }`}
        />
        {state.fieldErrors?.subject && (
          <p className="mt-1 text-xs text-da-error">{state.fieldErrors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-da-text mb-1.5">
          Message <span className="text-da-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell me about your project, question, or idea..."
          className={`w-full px-4 py-2.5 rounded-lg bg-da-surface-raised border text-da-text text-sm placeholder:text-da-text-faint focus:outline-none focus:ring-2 focus:ring-da-accent focus:border-transparent transition-colors resize-y min-h-[120px] ${
            state.fieldErrors?.message ? 'border-da-error' : 'border-da-border'
          }`}
        />
        {state.fieldErrors?.message && (
          <p className="mt-1 text-xs text-da-error">{state.fieldErrors.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-da-accent text-da-bg px-6 py-3 rounded-lg font-semibold text-sm hover:bg-da-accent-hover transition-colors disabled:opacity-60 disabled:pointer-events-none"
      >
        {pending ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            <Send size={15} />
            Send message
          </>
        )}
      </button>
    </form>
  )
}
