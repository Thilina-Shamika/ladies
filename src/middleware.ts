import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Completely block Vercel image optimization
  if (pathname.includes('/_next/image')) {
    // Extract original URL from query parameters
    const url = new URL(request.url)
    const originalUrl = url.searchParams.get('url') || url.searchParams.get('src')
    
    if (originalUrl) {
      // Redirect to the original image URL
      return NextResponse.redirect(originalUrl)
    } else {
      // If no original URL, return a 404 to prevent 402 errors
      return new NextResponse('Image optimization disabled', { status: 404 })
    }
  }

  // Block Open Graph image generation that might use optimization
  if (pathname.includes('/api/og')) {
    return new NextResponse('Open Graph generation disabled', { status: 404 })
  }

  // Handle direct image requests
  if (pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
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
} 