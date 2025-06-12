import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if maintenance mode is enabled
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';
  
  // Get the current path
  const pathname = request.nextUrl.pathname;

  // If maintenance mode is enabled and we're not on the maintenance page,
  // redirect to the maintenance page
  if (isMaintenanceMode && !pathname.startsWith('/maintenance')) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  // If maintenance mode is disabled and we're on the maintenance page,
  // redirect to the home page
  if (!isMaintenanceMode && pathname.startsWith('/maintenance')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
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
}; 