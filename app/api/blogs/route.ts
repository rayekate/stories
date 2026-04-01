import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import { verifySession } from '@/lib/auth'

// GET all blogs
export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const publishedOnly = searchParams.get('published') === 'true'
    
    let query: Record<string, unknown> = {}
    if (publishedOnly) {
      query = { published: true }
      // Optional genre filter (public, no auth needed)
      const genre = searchParams.get('genre')
      if (genre) {
        query = { ...query, genre }
      }
    } else {
      // If not publishedOnly, it's an admin request. Verify session.
      const token = req.cookies.get('session')?.value
      if (!token || !(await verifySession(token))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 })
    return NextResponse.json(blogs)
  } catch (error) {
    console.error('Error in GET /api/blogs:', error)
    return NextResponse.json({ error: 'Internal Server Error', details: (error as Error).message }, { status: 500 })
  }
}

// POST create blog
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('session')?.value
    if (!token || !(await verifySession(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const data = await req.json()

    // Auto-generate excerpt if not provided
    if (!data.excerpt && data.content) {
      const plainText = data.content.replace(/<[^>]*>/g, '')
      data.excerpt = plainText.substring(0, 160)
    }

    // Auto-generate slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    }

    const newBlog = await Blog.create(data)
    return NextResponse.json(newBlog, { status: 201 })
  } catch (error) {
    console.error('Error creating blog:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
