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
      .from('projects')
      .select('*, project_links(*)')
      .eq('id', id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const { project_links, ...rest } = data as any
    return NextResponse.json({ ...rest, links: project_links ?? [] })
  } catch (err) {
    console.error('[GET /api/projects/[id]]', err)
    return NextResponse.json({ error: 'Failed to fetch project' }, { status: 500 })
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
      'title', 'slug', 'summary', 'description', 'project_type', 'role',
      'methods', 'technologies', 'collaborators', 'start_date', 'end_date',
      'project_status', 'cover_image_url', 'status', 'display_order',
    ]

    for (const field of allowedFields) {
      if (field in body) {
        updates[field] = body[field]
      }
    }

    if (updates.title && !body.slug) {
      updates.slug = slugify(updates.title)
    }

    updates.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select('*, project_links(*)')
      .single()

    if (error || !data) {
      if (error?.code === '23505') {
        return NextResponse.json({ error: 'A project with this slug already exists' }, { status: 409 })
      }
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const { project_links, ...rest } = data as any
    return NextResponse.json({ ...rest, links: project_links ?? [] })
  } catch (err) {
    console.error('[PUT /api/projects/[id]]', err)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const supabase = await createServiceClient()

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[DELETE /api/projects/[id]]', err)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}
