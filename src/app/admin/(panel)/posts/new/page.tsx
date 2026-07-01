import PostForm from './PostForm'

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-da-text mb-1">New Post</h1>
        <p className="text-da-text-muted text-sm">Write a new article, note, or vlog entry.</p>
      </div>
      <PostForm />
    </div>
  )
}
