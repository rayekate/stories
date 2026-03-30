import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const SECRET = new TextEncoder().encode(process.env.SESSION_SECRET!)
const PROTECTED = ['/content/dashboard']

export async function proxy(req: NextRequest) {
  const isProtected = PROTECTED.some((p) => req.nextUrl.pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  const token = req.cookies.get('session')?.value
  if (!token) return NextResponse.redirect(new URL('/content', req.url))

  try {
    await jwtVerify(token, SECRET)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/content', req.url))
  }
}

export const config = { matcher: ['/content/dashboard/:path*'] }
