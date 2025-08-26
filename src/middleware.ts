import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Bypass Vercel image optimization
  if (pathname.includes('/_next/image') || pathname.includes('/api/og')) {
    // Redirect to original image source
    const url = new URL(request.url)
    const originalUrl = url.searchParams.get('url') || url.searchParams.get('src')
    
    if (originalUrl) {
      return NextResponse.redirect(originalUrl)
    }
  }

  // Handle image requests directly
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
    // Allow direct access to image files
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 