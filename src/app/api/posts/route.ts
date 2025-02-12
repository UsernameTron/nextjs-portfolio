import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { message: 'Posts functionality has been simplified and is currently disabled.' },
    { status: 404 }
  );
}
