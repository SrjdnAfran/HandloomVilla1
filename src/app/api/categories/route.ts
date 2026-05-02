import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

// GET all categories with their subcategories
export async function GET() {
  try {
    const categories = await sql`
      SELECT 
        c.id,
        c.name,
        COALESCE(
          json_agg(
            json_build_object('id', s.id, 'name', s.name)
            ORDER BY s.id
          ) FILTER (WHERE s.id IS NOT NULL),
          '[]'::json
        ) as sub_categories
      FROM categories c
      LEFT JOIN sub_categories s ON c.id = s.category_id
      GROUP BY c.id
      ORDER BY c.id
    `;
    return NextResponse.json(categories);
  } catch (error) {
    console.error('GET categories error:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

// POST new category
export async function POST(request: Request) {
  try {
    const { name } = await request.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const result = await sql`
      INSERT INTO categories (name) VALUES (${name.trim()})
      RETURNING id, name
    `;
    return NextResponse.json(result[0]);
  } catch (error: any) {
    if (error.message?.includes('unique')) {
      return NextResponse.json({ error: 'Category already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}