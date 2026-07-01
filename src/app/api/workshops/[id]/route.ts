import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Workshop not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/workshops/[id]]', err)
    return NextResponse.json({ error: 'Failed to fetch workshop' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await req.json()
    const supabase = await createServiceClient()

    const updates: Record<string, any> = {}
    const allowedFields = [
      'title', 'slug', 'summary', 'description', 'target_audience', 'duration',
      'format', 'topics', 'learning_outcomes', 'required_tools', 'cover_image_url',
      'workshop_status', 'status', 'display_order',
    ]
    for (const field of allowedFields) {
      if (field in body) updates[field] = body[field]
    }
    if (updates.title && !body.slug) {
      updates.slug = slugify(updates.title)
    }
    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('workshops')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      if (error?.code === '23505') {
        return NextResponse.json({ error: 'A workshop with this slug already exists' }, { status: 409 })
      }
      return NextResponse.json({ error: 'Workshop not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[PUT /api/workshops/[id]]', err)
    return NextResponse.json({ error: 'Failed to update workshop' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = await createServiceClient()
    const { error } = await supabase.from('workshops').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/workshops/[id]]', err)
    return NextResponse.json({ error: 'Failed to delete workshop' }, { status: 500 })
  }
}
