import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// This is how Next.js 13+ App Router expects the params to be typed
type Params = { filename: string }

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'case-studies', params.filename);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=${encodeURIComponent(params.filename)}`
      }
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}