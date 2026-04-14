// app/api/products/[id]/variants/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // 👈 AWAIT the params
    const productId = parseInt(id);
    const { variant } = await request.json();
    
    await sql`
      INSERT INTO variants (
        id, product_id, color, color_code, image_url, 
        stock, serial_number, sku, slug, is_default
      )
      VALUES (
        ${variant.id}, ${productId}, ${variant.color}, 
        ${variant.colorCode || null}, ${variant.image},
        ${variant.stock}, ${variant.serialNumber}, 
        ${variant.sku}, ${variant.slug}, ${variant.isDefault || false}
      )
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST Variant Error:', error);
    return NextResponse.json({ error: 'Failed to add variant' }, { status: 500 });
  }
}