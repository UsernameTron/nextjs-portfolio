import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  context: { params: { filename: string } }
) {
  try {
    const sanitizedFilename = context.params.filename;
    
    // Whitelist of allowed case study PDFs
    const allowedFiles = [
      'Accent Neutralization Case Study.pdf',
      'Advaced Logistical Reasoning.pdf',
      'BPO Analysis With Incomplete Data.pdf',
      'EHR and CRM Continuity Case Study.pdf',
      'EOS.pdf',
      'Social Media Predictive Analytics.pdf'
    ];

    if (!allowedFiles.includes(sanitizedFilename)) {
      return NextResponse.json({ error: 'File not found or access denied' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'public', 'case-studies', sanitizedFilename);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(sanitizedFilename)}"`,
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    console.error('Error serving case study PDF:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}