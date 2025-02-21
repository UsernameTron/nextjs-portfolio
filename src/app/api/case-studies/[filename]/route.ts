import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type RouteParams = {
  params: {
    filename: string;
  };
};

export async function GET(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'case-studies', context.params.filename);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=${encodeURIComponent(context.params.filename)}`
      }
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
} 