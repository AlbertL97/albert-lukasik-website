import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('teaching_entries')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Teaching entry not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/teaching/[id]]', err)
    return NextResponse.json({ error: 'Failed to fetch teaching entry' }, { status: 500 })
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
      'course_title', 'description', 'institution', 'academic_year',
      'level', 'topics', 'materials_url', 'status', 'display_order',
    ]
    for (const field of allowedFields) {
      if (field in body) updates[field] = body[field]
    }
    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('teaching_entries')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Teaching entry not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[PUT /api/teaching/[id]]', err)
    return NextResponse.json({ error: 'Failed to update teaching entry' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = await createServiceClient()
    const { error } = await supabase.from('teaching_entries').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/teaching/[id]]', err)
    return NextResponse.json({ error: 'Failed to delete teaching entry' }, { status: 500 })
  }
}
