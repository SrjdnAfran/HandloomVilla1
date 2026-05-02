import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

// POST add subcategory
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name } = await request.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    const result = await sql`
      INSERT INTO sub_categories (category_id, name)
      VALUES (${parseInt(id)}, ${name.trim()})
      RETURNING id, name
    `;
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add subcategory' }, { status: 500 });
  }
}