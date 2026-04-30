// app/api/products/sync/route.ts
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL!);

export async function POST(request: Request) {
  try {
    const { products } = await request.json();
    
    // Clear existing data
    await sql`DELETE FROM variants`;
    await sql`DELETE FROM products`;
    
    for (const product of products) {
      // Insert product
      const result = await sql`
        INSERT INTO products (name, sku_prefix, category, sub_category, description, base_price, materials, care_instructions)
        VALUES (${product.name}, ${product.skuPrefix}, ${product.category}, ${product.subCategory}, ${product.description}, ${product.basePrice}, ${product.materials}, ${product.careInstructions})
        RETURNING id
      `;
      
      const productId = result.rows[0].id;
      
      // Insert variants
      for (const variant of product.variants) {
        await sql`
          INSERT INTO variants (id, product_id, color, color_code, image_url, stock, serial_number, sku, slug, is_default)
          VALUES (${variant.id}, ${productId}, ${variant.color}, ${variant.colorCode}, ${variant.image}, ${variant.stock}, ${variant.serialNumber}, ${variant.sku}, ${variant.slug}, ${variant.isDefault})
        `;
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Save Error:', error);
    return NextResponse.json({ error: 'Failed to save products' }, { status: 500 });
  }
}