import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('site_profile')
      .select('*')
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Site profile not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/settings]', err)
    return NextResponse.json({ error: 'Failed to fetch site profile' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const supabase = await createServiceClient()

    const updates: Record<string, any> = {}
    const allowedFields = ['name', 'tagline', 'bio', 'location', 'email', 'avatar_url']
    for (const field of allowedFields) {
      if (field in body) updates[field] = body[field]
    }
    updates.updated_at = new Date().toISOString()

    // site_profile is a single-row table — update the first (only) row
    const { data: existing } = await supabase.from('site_profile').select('id').single()

    if (!existing) {
      return NextResponse.json({ error: 'Site profile not found' }, { status: 404 })
    }

    const { data, error } = await supabase
      .from('site_profile')
      .update(updates)
      .eq('id', existing.id)
      .select()
      .single()

    if (error || !data) throw error
    return NextResponse.json(data)
  } catch (err) {
    console.error('[PUT /api/settings]', err)
    return NextResponse.json({ error: 'Failed to update site profile' }, { status: 500 })
  }
}
