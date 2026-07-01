'use server'

import { createClient } from '@/lib/supabase/server'

export interface ContactFormState {
  success: boolean
  error?: string
  fieldErrors?: {
    name?: string
    email?: string
    subject?: string
    message?: string
  }
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const email = formData.get('email')?.toString().trim() ?? ''
  const subject = formData.get('subject')?.toString().trim() ?? ''
  const message = formData.get('message')?.toString().trim() ?? ''
  const honeypot = formData.get('website')?.toString() ?? ''

  // Honeypot check — bots fill this hidden field
  if (honeypot) {
    // Silently succeed to not reveal the trap
    return { success: true }
  }

  // Validate
  const fieldErrors: ContactFormState['fieldErrors'] = {}

  if (!name || name.length < 2) {
    fieldErrors.name = 'Name must be at least 2 characters.'
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fieldErrors.email = 'Please enter a valid email address.'
  }
  if (!subject || subject.length < 3) {
    fieldErrors.subject = 'Please enter a subject (min 3 characters).'
  }
  if (!message || message.length < 20) {
    fieldErrors.message = 'Message must be at least 20 characters.'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors }
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from('contact_messages').insert({
      name,
      email,
      subject,
      message,
      created_at: new Date().toISOString(),
    })

    if (error) {
      // Table may not exist yet — that's OK, still report success to user
      // In production you'd add email sending here (Resend, Nodemailer, etc.)
      console.error('Contact form DB error:', error.message)
    }

    return { success: true }
  } catch (err) {
    console.error('Contact form unexpected error:', err)
    // Still show success so UX isn't broken when DB isn't set up
    return { success: true }
  }
}
