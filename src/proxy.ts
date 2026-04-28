import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if this is an admin route
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname === '/admin-login';
  const isApiRoute = pathname.startsWith('/api/admin');
  
  // Skip API routes from middleware redirect
  if (isApiRoute) {
    return NextResponse.next();
  }
  
  // Get admin auth status from cookie
  const adminAuth = request.cookies.get('admin_auth');
  const isAuthenticated = adminAuth?.value === 'true';
  
  // If trying to access admin routes without auth, redirect to login
  if (isAdminRoute && !isAuthenticated && !isLoginRoute) {
    const loginUrl = new URL('/admin-login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  
  // If already authenticated and trying to access login page, redirect to admin
  if (isLoginRoute && isAuthenticated) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin-login'],
};