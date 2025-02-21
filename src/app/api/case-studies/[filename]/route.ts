import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
// Import the Params type from Next.js' internal shared types.
// import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import type { NextApiRequest, NextApiResponse } from 'next'; // Import Next.js API types

// Define a generic route context which matches Next.js expectations.
type RouteContext = {
  params: Params;
};

// Define your own Params type
type Params = {
  filename: string | string[]; // Define the expected parameter
};

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string | string[] } }
) {
  try {
    // Ensure we have a single string value for filename.
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