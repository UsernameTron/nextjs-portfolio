import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const files = await readdir(uploadDir);
    
    const mediaItems = files.map(filename => {
      // Extract timestamp-random part as ID
      const matches = filename.match(/-(\d+-\d+)\.[^.]+$/);
      const id = matches ? matches[1] : filename;
      
      return {
        id,
        url: `/uploads/${filename}`,
        name: filename.split('-')[0], // Original filename
        type: filename.endsWith('.mp4') ? 'video' : 'image'
      };
    });
    
    return NextResponse.json({ 
      files: mediaItems,
      success: true 
    });
  } catch (error) {
    console.error('Error listing media:', error);
    return NextResponse.json({ error: 'Error listing media' }, { status: 500 });
  }
}
