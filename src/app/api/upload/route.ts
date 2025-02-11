import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { auth } from '@/lib/auth';

// Ensure uploads directory exists
const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads');
try {
  await mkdir(UPLOAD_DIR, { recursive: true });
} catch (err) {
  // Directory already exists
}

export async function POST(request: Request) {
  // No auth check in development
  try {
    // Configure for larger file uploads
    const formData = await request.formData();
    const files = formData.getAll('files');
    
    // Create uploads directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Directory already exists
    }
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      // Validate file type
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        continue;
      }

      // Validate file size (50MB)
      if (file.size > 50 * 1024 * 1024) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Get file extension from mime type
      const ext = file.type.split('/')[1];
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const filename = file.name.replace(/\.[^/.]+$/, '') + '-' + uniqueSuffix + '.' + ext;
      
      // Save to public/uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filePath = join(uploadDir, filename);
      
      await writeFile(filePath, buffer);
      
      uploadedFiles.push({
        url: `/uploads/${filename}`,
        type: file.type,
        name: file.name
      });
    }
    
    return NextResponse.json({ 
      files: uploadedFiles,
      success: true 
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}
