import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/lib/adminAuth';

export async function GET() {
  const isAuthenticated = await isAdminAuthenticated(); // Add await here
  
  return NextResponse.json({ 
    authenticated: isAuthenticated 
  });
}