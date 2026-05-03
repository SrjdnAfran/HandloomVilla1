import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

// GET all products with their variants (supports category and slug filtering)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const slug = searchParams.get('slug');
    
    let query = `
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
    `;
    
    const conditions = [];
    const params: any[] = [];
    
    if (category && category !== 'undefined' && category !== 'null') {
      conditions.push(`p.category = $${params.length + 1}`);
      params.push(category);
    }
    
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    query += ` GROUP BY p.id ORDER BY p.id DESC`;
    
    const products = await sql(query, params);
    
    // If slug is provided, filter to find the specific variant
    if (slug && slug !== 'undefined' && slug !== 'null') {
      const matchedProducts = products.filter((p: any) => 
        p.variants?.some((v: any) => v.slug === slug)
      );
      return NextResponse.json(matchedProducts);
    }
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST new product (without manually setting ID)
export async function POST(request: Request) {
  try {
    const { product } = await request.json();
    
    // Validate required fields
    if (!product.name || !product.skuPrefix || !product.category || !product.basePrice) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    // Insert product - let the database auto-generate the ID
    const result = await sql`
      INSERT INTO products (
        name, sku_prefix, category, sub_category, 
        description, base_price, materials, care_instructions
      )
      VALUES (
        ${product.name}, ${product.skuPrefix}, 
        ${product.category}, ${product.subCategory || null},
        ${product.description || null}, ${product.basePrice}, 
        ${product.materials || null}, ${product.careInstructions || null}
      )
      RETURNING id
    `;
    
    const productId = result[0].id;
    
    // Insert variants if any
    if (product.variants && product.variants.length > 0) {
      for (const variant of product.variants) {
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
      }
    }
    
    return NextResponse.json({ success: true, id: productId });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 });
  }
}