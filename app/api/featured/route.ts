import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import Blog from '@/lib/models/Blog'

export async function GET() {
  try {
    await connectDB()
    const featuredBlogs = await Blog.find({ featuredOnWebsite: true, published: true })
      .sort({ featuredOrder: 1 })
      .select('title excerpt slug genre')
      .lean()
    
    return NextResponse.json(featuredBlogs)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
