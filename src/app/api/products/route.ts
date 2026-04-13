// app/api/products/route.ts
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

// GET all products with their variants
export async function GET() {
  try {
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
      GROUP BY p.id
      ORDER BY p.id DESC
    `;
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST new product
export async function POST(request: Request) {
  try {
    const { product } = await request.json();
    
    // Insert product
    const result = await sql`
      INSERT INTO products (
        id, name, sku_prefix, category, sub_category, 
        description, base_price, materials, care_instructions
      )
      VALUES (
        ${product.id}, ${product.name}, ${product.skuPrefix}, 
        ${product.category}, ${product.subCategory || null},
        ${product.description || null}, ${product.basePrice}, 
        ${product.materials || null}, ${product.careInstructions || null}
      )
      RETURNING id
    `;
    
    // Insert variants if any
    if (product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
        await sql`
          INSERT INTO variants (
            id, product_id, color, color_code, image_url, 
            stock, serial_number, sku, slug, is_default
          )
          VALUES (
            ${variant.id}, ${product.id}, ${variant.color}, 
            ${variant.colorCode || null}, ${variant.image},
            ${variant.stock}, ${variant.serialNumber}, 
            ${variant.sku}, ${variant.slug}, ${variant.isDefault || false}
          )
        `;
      }
    }
    
    return NextResponse.json({ success: true, id: product.id });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}