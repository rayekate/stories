import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'
import { verifySession } from '@/lib/auth'

type Params = { id: string }

// GET one blog
export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    await connectDB()
    const { id } = await params
    const blog = await Blog.findById(id)
    if (!blog) return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    return NextResponse.json(blog)
  } catch (_error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// PUT update blog
export async function PUT(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token || !(await verifySession(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const data = await req.json()

    // Re-generate excerpt if content changes
    if (data.content && !data.excerpt) {
      const plainText = data.content.replace(/<[^>]*>/g, '')
      data.excerpt = plainText.substring(0, 160)
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true })
    if (!updatedBlog) return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    return NextResponse.json(updatedBlog)
  } catch (_error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// DELETE blog
export async function DELETE(req: NextRequest, { params }: { params: Promise<Params> }) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token || !(await verifySession(token))) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { id } = await params
    const deletedBlog = await Blog.findByIdAndDelete(id)
    if (!deletedBlog) return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (_error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
