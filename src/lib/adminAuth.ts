import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Simple admin credentials (move to database in production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@handloomvilla.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin@123';

// Verify credentials
export async function verifyAdminCredentials(email: string, password: string): Promise<boolean> {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

// Set admin auth cookie
export function setAdminAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set('admin_auth', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });
  return response;
}

// Clear admin auth cookie
export function clearAdminAuthCookie(response: NextResponse): NextResponse {
  response.cookies.set('admin_auth', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
  return response;
}

// Check if admin is authenticated (server-side) - FIXED for Next.js 16
export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies(); // Add await here
  return cookieStore.get('admin_auth')?.value === 'true';
}