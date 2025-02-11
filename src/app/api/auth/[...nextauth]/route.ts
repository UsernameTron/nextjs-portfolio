import { NextResponse } from 'next/server';

// Auth disabled for development
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

export async function POST() {
  return NextResponse.json({ status: 'ok' });
}
