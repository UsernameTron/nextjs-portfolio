import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
// Import the Params type from Next.js' internal shared types.
import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

// Define a generic route context which matches Next.js expectations.
type RouteContext = {
  params: Record<string, string | string[]>;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Params } // Now uses Next.js's built-in Params type.
) {
  try {
    // If the dynamic parameter may be an array, extract the first element.
    const filename = Array.isArray(params.filename)
      ? params.filename[0]
      : params.filename;
      
    const filePath = path.join(process.cwd(), 'public', 'case-studies', filename);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`
      }
    });
  } catch {
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
  }
}