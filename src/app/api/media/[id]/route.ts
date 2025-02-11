import { NextResponse } from 'next/server';
import { unlink, readdir } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: Request) {
  const id = request.url.split('/').pop();
  if (!id) {
    return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
  }

  try {
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    const files = await readdir(uploadDir);
    
    // Find the file that matches our timestamp-random ID pattern
    const targetFile = files.find(file => {
      const matches = file.match(/-([\d]+-[\d]+)\.[^.]+$/);
      return matches && matches[1] === id;
    });
    
    if (!targetFile) {
      console.error('File not found:', id);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    // Delete the file
    const filePath = join(uploadDir, targetFile);
    console.log('Deleting file:', filePath);
    await unlink(filePath);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ 
      error: 'Error deleting file',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
