import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    
    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }
    
    const products = await sql`
      SELECT 
        p.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', v.id,
              'color', v.color,
              'colorCode', v.color_code,
              'image', v.image_url,
              'stock', v.stock,
              'serialNumber', v.serial_number,
              'sku', v.sku,
              'slug', v.slug,
              'isDefault', v.is_default
            )
          ) FILTER (WHERE v.id IS NOT NULL),
          '[]'::json
        ) as variants
      FROM products p
      LEFT JOIN variants v ON p.id = v.product_id
      WHERE p.id = ${productId}
      GROUP BY p.id
    `;
    
    if (products.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(products[0]);
  } catch (error) {
    console.error('GET Product Error:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
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
      WHERE id = ${productId}
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    await sql`DELETE FROM products WHERE id = ${productId}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}