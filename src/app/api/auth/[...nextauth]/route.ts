import { NextResponse } from 'next/server';

// Temporarily disable auth for development
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

export async function POST() {
  return NextResponse.json({ status: 'ok' });
}
