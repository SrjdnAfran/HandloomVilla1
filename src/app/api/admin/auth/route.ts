import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, setAdminAuthCookie } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    // Validate credentials
    const isValid = await verifyAdminCredentials(email, password);
    
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Create success response
    const response = NextResponse.json({ success: true });
    
    // Set auth cookie
    return setAdminAuthCookie(response);
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
}