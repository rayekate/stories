import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const PROTECTED = ['/content/dashboard', '/blog/new']

export async function proxy(req: NextRequest) {
  const isProtected = PROTECTED.some((p) => req.nextUrl.pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const token = req.cookies.get('auth_token')?.value
  if (!token) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  try {
    const decoded = await verifyToken(token)
    if (!decoded) throw new Error('Invalid token')
    return NextResponse.next()
  } catch (error) {
    console.error("Auth verification failed in proxy:", error)
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }
}

export const config = { 
  matcher: ['/content/dashboard/:path*', '/blog/new/:path*'] 
}


