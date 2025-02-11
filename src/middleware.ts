import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware handles security headers and will later handle authentication
export function middleware(request: NextRequest) {
  // Only apply middleware to API routes and admin pages
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  
  const response = NextResponse.next();
  
  // Add security headers for all routes
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // TODO: Add authentication checks for protected routes
  if (isApiRoute || isAdminRoute) {
    // Will implement auth checks here later
  }
  
  return response;
}
