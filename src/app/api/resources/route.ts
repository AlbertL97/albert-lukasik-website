import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('external_links')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('[GET /api/resources]', err)
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, url, category, status } = body

    if (!title || !url || !category || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: title, url, category, status' },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('external_links')
      .insert({
        title: title.trim(),
        url: url.trim(),
        description: body.description?.trim() || null,
        platform: body.platform?.trim() || null,
        category: category.trim(),
        display_order: body.display_order ?? 0,
        status,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('[POST /api/resources]', err)
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 })
  }
}
