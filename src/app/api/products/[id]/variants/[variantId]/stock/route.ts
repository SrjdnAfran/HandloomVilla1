import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; variantId: string }> }
) {
  try {
    const { id, variantId } = await params;
    
    // Verify variant belongs to product
    const result = await sql`
      SELECT stock FROM variants 
      WHERE id = ${variantId} AND product_id = ${parseInt(id)}
    `;
    
    if (result.length === 0) {
      return NextResponse.json({ error: 'Variant not found' }, { status: 404 });
    }
    
    return NextResponse.json({ stock: result[0].stock });
  } catch (error) {
    console.error('Stock fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch stock' }, { status: 500 });
  }
}