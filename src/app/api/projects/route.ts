import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { slugify } from '@/lib/utils'

export async function GET() {
  try {
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('projects')
      .select('*, project_links(*)')
      .order('display_order', { ascending: true })

    if (error) throw error

    const projects = (data ?? []).map((row: any) => {
      const { project_links, ...rest } = row
      return { ...rest, links: project_links ?? [] }
    })

    return NextResponse.json(projects)
  } catch (err) {
    console.error('[GET /api/projects]', err)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, summary, description, project_type, role, status } = body

    if (!title || !summary || !description || !project_type || !role || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: title, summary, description, project_type, role, status' },
        { status: 400 }
      )
    }

    const slug = body.slug?.trim() || slugify(title)

    const supabase = await createServiceClient()

    const { data, error } = await supabase
      .from('projects')
      .insert({
        title: title.trim(),
        slug,
        summary: summary.trim(),
        description: description.trim(),
        project_type: project_type.trim(),
        role: role.trim(),
        methods: body.methods ?? [],
        technologies: body.technologies ?? [],
        collaborators: body.collaborators?.trim() || null,
        start_date: body.start_date || null,
        end_date: body.end_date || null,
        project_status: body.project_status ?? 'ongoing',
        cover_image_url: body.cover_image_url?.trim() || null,
        status,
        display_order: body.display_order ?? 0,
      })
      .select('*, project_links(*)')
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A project with this slug already exists' }, { status: 409 })
      }
      throw error
    }

    const { project_links, ...rest } = data as any
    return NextResponse.json({ ...rest, links: project_links ?? [] }, { status: 201 })
  } catch (err) {
    console.error('[POST /api/projects]', err)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
