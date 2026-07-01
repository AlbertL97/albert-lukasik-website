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
      .from('external_links')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/resources/[id]]', err)
    return NextResponse.json({ error: 'Failed to fetch resource' }, { status: 500 })
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
    const allowedFields = ['title', 'url', 'description', 'platform', 'category', 'display_order', 'status']
    for (const field of allowedFields) {
      if (field in body) updates[field] = body[field]
    }

    const { data, error } = await supabase
      .from('external_links')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[PUT /api/resources/[id]]', err)
    return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = await createServiceClient()
    const { error } = await supabase.from('external_links').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/resources/[id]]', err)
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 })
  }
}
