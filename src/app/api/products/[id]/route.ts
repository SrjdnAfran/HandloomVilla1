// app/api/products/[id]/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

// DELETE product
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    await sql`DELETE FROM products WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

// UPDATE product
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const updates = await request.json();
    
    await sql`
      UPDATE products 
      SET 
        name = COALESCE(${updates.name}, name),
        sku_prefix = COALESCE(${updates.skuPrefix}, sku_prefix),
        category = COALESCE(${updates.category}, category),
        sub_category = COALESCE(${updates.subCategory}, sub_category),
        description = COALESCE(${updates.description}, description),
        base_price = COALESCE(${updates.basePrice}, base_price),
        materials = COALESCE(${updates.materials}, materials),
        care_instructions = COALESCE(${updates.careInstructions}, care_instructions)
      WHERE id = ${id}
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}