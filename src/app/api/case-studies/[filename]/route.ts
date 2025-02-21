import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export function GET(
 request: NextRequest,
 { params }: { params: { filename: string } }
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
       'Content-Disposition': `inline; filename="${params.filename}"`
     }
   });
 } catch {
   return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
 }
}