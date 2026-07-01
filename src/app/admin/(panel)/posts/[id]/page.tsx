import { notFound } from 'next/navigation'
import { createServiceClient } from '@/lib/supabase/server'
import EditPostForm from './EditPostForm'

export default async function EditPostPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params
  const supabase = await createServiceClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">Edit Post</h1>
        <p className="text-da-text-muted text-sm">{post.title}</p>
      </div>
      <EditPostForm post={post} postId={id} />
    </div>
  )
}
