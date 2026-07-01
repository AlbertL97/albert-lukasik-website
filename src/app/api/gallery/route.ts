import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('[GET /api/gallery]', err)
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, image_url, alt_text, category, status } = body

    if (!title || !image_url || !alt_text || !category || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: title, image_url, alt_text, category, status' },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('gallery_items')
      .insert({
        title: title.trim(),
        description: body.description?.trim() || null,
        image_url: image_url.trim(),
        alt_text: alt_text.trim(),
        date: body.date || null,
        location: body.location?.trim() || null,
        category: category.trim(),
        status,
        display_order: body.display_order ?? 0,
        related_project_id: body.related_project_id || null,
        related_post_id: body.related_post_id || null,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('[POST /api/gallery]', err)
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 })
  }
}
