import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('[GET /api/workshops]', err)
    return NextResponse.json({ error: 'Failed to fetch workshops' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, summary, description, target_audience, duration, format, status } = body

    if (!title || !summary || !description || !target_audience || !duration || !format || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: title, summary, description, target_audience, duration, format, status' },
        { status: 400 }
      )
    }

    const slug = body.slug?.trim() || slugify(title)
    const supabase = await createServiceClient()

    const { data, error } = await supabase
      .from('workshops')
      .insert({
        title: title.trim(),
        slug,
        summary: summary.trim(),
        description: description.trim(),
        target_audience: target_audience.trim(),
        duration: duration.trim(),
        format,
        topics: body.topics ?? [],
        learning_outcomes: body.learning_outcomes ?? [],
        required_tools: body.required_tools?.trim() || null,
        cover_image_url: body.cover_image_url?.trim() || null,
        workshop_status: body.workshop_status ?? 'planned',
        status,
        display_order: body.display_order ?? 0,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A workshop with this slug already exists' }, { status: 409 })
      }
      throw error
    }
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('[POST /api/workshops]', err)
    return NextResponse.json({ error: 'Failed to create workshop' }, { status: 500 })
  }
}
