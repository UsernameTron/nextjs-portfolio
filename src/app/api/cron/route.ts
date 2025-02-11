import { startScheduler } from '@/lib/scheduler';
import { NextResponse } from 'next/server';

// Start the scheduler when this endpoint is hit
export async function GET() {
  startScheduler();
  return NextResponse.json({ message: 'Scheduler started' });
}
