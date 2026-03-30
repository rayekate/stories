import { connectDB } from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import BlogForm from '@/components/editor/BlogForm'
import { notFound } from 'next/navigation'

type Params = { id: string }

export default async function EditBlogPage({ params }: { params: Promise<Params> }) {
  await connectDB()
  const { id } = await params
  
  const blog = await Blog.findById(id).lean()
  
  if (!blog) {
    notFound()
  }

  // Convert MongoDB object to plain JS object for the client component
  const plainBlog = JSON.parse(JSON.stringify(blog))

  return <BlogForm initialData={plainBlog} isEdit={true} />
}
