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
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[GET /api/posts/[id]]', err)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
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
      'title', 'slug', 'excerpt', 'content', 'post_type',
      'cover_image_url', 'tags', 'categories', 'video_url',
      'status', 'seo_title', 'seo_description', 'published_at',
    ]
    for (const field of allowedFields) {
      if (field in body) updates[field] = body[field]
    }
    if (updates.title && !body.slug) {
      updates.slug = slugify(updates.title)
    }

    // Set published_at when publishing for the first time
    if (updates.status === 'published') {
      const { data: existing } = await supabase
        .from('posts')
        .select('published_at')
        .eq('id', id)
        .single()
      if (existing && !existing.published_at && !updates.published_at) {
        updates.published_at = new Date().toISOString()
      }
    }

    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error || !data) {
      if (error?.code === '23505') {
        return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 })
      }
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    return NextResponse.json(data)
  } catch (err) {
    console.error('[PUT /api/posts/[id]]', err)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = await createServiceClient()
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/posts/[id]]', err)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
