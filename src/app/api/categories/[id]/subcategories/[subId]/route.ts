import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

const sql = neon(process.env.POSTGRES_URL!);

// DELETE subcategory
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; subId: string }> }
) {
  try {
    const { subId } = await params;
    await sql`DELETE FROM sub_categories WHERE id = ${parseInt(subId)}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
}