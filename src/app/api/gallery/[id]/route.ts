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
      .from('gallery_items')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/gallery/[id]]', err)
    return NextResponse.json({ error: 'Failed to fetch gallery item' }, { status: 500 })
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
      'title', 'description', 'image_url', 'alt_text', 'date',
      'location', 'category', 'status', 'display_order',
      'related_project_id', 'related_post_id',
    ]
    for (const field of allowedFields) {
      if (field in body) updates[field] = body[field]
    }

    const { data, error } = await supabase
      .from('gallery_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Gallery item not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[PUT /api/gallery/[id]]', err)
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = await createServiceClient()
    const { error } = await supabase.from('gallery_items').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/gallery/[id]]', err)
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 })
  }
}
