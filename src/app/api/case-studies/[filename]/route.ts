import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Next.js route handler with the most basic, canonical form
export function GET(
  _request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    // Notice we directly use params.filename - this is the canonical way
    const filename = params.filename;
    
    // Our security whitelist remains the same
    const allowedFiles = [
      'Accent Neutralization Case Study.pdf',
      'Advaced Logistical Reasoning.pdf',
      'BPO Analysis With Incomplete Data.pdf',
      'EHR and CRM Continuity Case Study.pdf',
      'EOS.pdf',
      'Social Media Predictive Analytics.pdf'
    ];

    // Check against our whitelist first
    if (!allowedFiles.includes(filename)) {
      return NextResponse.json(
        { error: 'File not found or access denied' },
        { status: 404 }
      );
    }

    const filePath = path.join(process.cwd(), 'public', 'case-studies', filename);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${encodeURIComponent(filename)}"`,
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  } catch (error) {
    console.error('Error serving case study PDF:', error);
    return NextResponse.json(
      { error: 'Failed to read file' },
      { status: 500 }
    );
  }
}