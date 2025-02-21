import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json({ files: [], success: false, error: 'Directory not found' });
    }

    const allFiles = fs.readdirSync(uploadsDir);
    const files = allFiles
      .filter(file => file !== '.gitkeep' && !file.startsWith('.'))
      .map(filename => ({
        filename,
        path: `/uploads/${filename}`,
        fullPath: path.join(uploadsDir, filename)
      }));

    return NextResponse.json({ 
      files,
      success: true,
      directory: uploadsDir,
      fileCount: files.length
    });
  } catch {
    return NextResponse.json({ 
      error: 'Failed to read uploads directory',
      success: false
    }, { status: 500 });
  }
}
