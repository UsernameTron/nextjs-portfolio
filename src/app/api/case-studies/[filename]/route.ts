import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Props = {
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function GET(request: Request, props: Props) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'case-studies', props.params.filename);
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename=${props.params.filename}`
      }
    });
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
} 