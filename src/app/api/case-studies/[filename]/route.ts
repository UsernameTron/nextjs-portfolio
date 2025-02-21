import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// The most basic form of a Next.js route handler for dynamic routes
export function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  // For debugging - remove in production
  console.log('Requested filename:', params.filename);

  try {
    // Create the file path - keeping it simple and direct
    const filePath = path.join(process.cwd(), 'public', 'case-studies', params.filename);

    // Basic file existence check
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Read and serve the file
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${params.filename}"`
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
  }
}