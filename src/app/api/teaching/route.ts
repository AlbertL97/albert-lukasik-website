import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('teaching_entries')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) throw error
    return NextResponse.json(data ?? [])
  } catch (err) {
    console.error('[GET /api/teaching]', err)
    return NextResponse.json({ error: 'Failed to fetch teaching entries' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { course_title, description, institution, academic_year, level, status } = body

    if (!course_title || !description || !institution || !academic_year || !level || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: course_title, description, institution, academic_year, level, status' },
        { status: 400 }
      )
    }

    const supabase = await createServiceClient()
    const { data, error } = await supabase
      .from('teaching_entries')
      .insert({
        course_title: course_title.trim(),
        description: description.trim(),
        institution: institution.trim(),
        academic_year: academic_year.trim(),
        level,
        topics: body.topics ?? [],
        materials_url: body.materials_url?.trim() || null,
        status,
        display_order: body.display_order ?? 0,
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (err) {
    console.error('[POST /api/teaching]', err)
    return NextResponse.json({ error: 'Failed to create teaching entry' }, { status: 500 })
  }
}
