// app/api/products/[id]/variants/[variantId]/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

// DELETE variant
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; variantId: string }> }
) {
  try {
    const { variantId } = await params; // 👈 AWAIT the params
    await sql`DELETE FROM variants WHERE id = ${variantId}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Variant Error:', error);
    return NextResponse.json({ error: 'Failed to delete variant' }, { status: 500 });
  }
}

// UPDATE variant
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; variantId: string }> }
) {
  try {
    const { variantId } = await params; // 👈 AWAIT the params
    const updates = await request.json();
    
    await sql`
      UPDATE variants 
      SET 
        color = COALESCE(${updates.color}, color),
        color_code = COALESCE(${updates.colorCode}, color_code),
        image_url = COALESCE(${updates.image}, image_url),
        stock = COALESCE(${updates.stock}, stock),
        serial_number = COALESCE(${updates.serialNumber}, serial_number),
        sku = COALESCE(${updates.sku}, sku),
        slug = COALESCE(${updates.slug}, slug),
        is_default = COALESCE(${updates.isDefault}, is_default)
      WHERE id = ${variantId}
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Variant Error:', error);
    return NextResponse.json({ error: 'Failed to update variant' }, { status: 500 });
  }
}