// src/app/api/add-pet/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  try {
    if (!userId) throw new Error('User ID required');
    // Execute SQL query to fetch all pets from the database
    const follows = await query('SELECT * FROM Follows WHERE user_id = $1', [
      userId,
    ]);
    return NextResponse.json({ follows: follows.rows }, { status: 200 });
  } catch (error: unknown) {
    // Explicitly specify the type of 'error'
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
