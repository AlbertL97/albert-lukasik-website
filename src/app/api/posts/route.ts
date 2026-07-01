import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('[GET /api/posts]', err)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, excerpt, content, post_type, status } = body

    if (!title || !excerpt || !content || !post_type || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, content, post_type, status' },
        { status: 400 }
      )
    }

    const slug = body.slug?.trim() || slugify(title)
    const supabase = await createServiceClient()

    let published_at = body.published_at || null
    if (status === 'published' && !published_at) {
      published_at = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        title: title.trim(),
        slug,
        excerpt: excerpt.trim(),
        content: content.trim(),
        post_type,
        cover_image_url: body.cover_image_url?.trim() || null,
        tags: body.tags ?? [],
        categories: body.categories ?? [],
        video_url: body.video_url?.trim() || null,
        status,
        seo_title: body.seo_title?.trim() || null,
        seo_description: body.seo_description?.trim() || null,
        published_at,
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 })
      }
      throw error
    }
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('[POST /api/posts]', err)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
