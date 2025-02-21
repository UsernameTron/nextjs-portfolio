import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  const filePath = path.join(process.cwd(), 'public', 'case-studies', params.filename);
  
  try {
    const fileBuffer = fs.readFileSync(filePath);
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=${params.filename}`
      }
    });
  } catch (_err) {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
} 