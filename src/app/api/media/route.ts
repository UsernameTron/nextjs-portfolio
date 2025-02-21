import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    console.log('🔍 Checking directory:', uploadsDir);
    
    if (!fs.existsSync(uploadsDir)) {
      console.log('❌ Directory does not exist');
      return NextResponse.json({ files: [], success: false, error: 'Directory not found' });
    }

    const allFiles = fs.readdirSync(uploadsDir);
    console.log('📁 All files found:', allFiles);

    const files = allFiles
      .filter(file => file !== '.gitkeep' && !file.startsWith('.'))
      .map(filename => ({
        filename,
        path: `/uploads/${filename}`,
        fullPath: path.join(uploadsDir, filename)
      }));

    console.log('🖼️ Files to display:', files);

    return NextResponse.json({ 
      files,
      success: true,
      directory: uploadsDir,
      fileCount: files.length
    });
  } catch (err) {
    // Type the error properly
    const error = err as Error;
    console.error('❌ Error:', error);
    return NextResponse.json({ 
      error: 'Failed to read uploads directory',
      details: error.message,
      success: false
    }, { status: 500 });
  }
}
