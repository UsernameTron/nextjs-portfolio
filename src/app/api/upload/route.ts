import { NextResponse } from 'next/server';
import { uploadToS3, getSignedImageUrl } from '@/lib/s3';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files');
    
    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles = [];

    for (const file of files) {
      if (!(file instanceof File)) continue;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue;
      }

      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.type.split('/')[1];
      const filename = `${file.name.replace(/\.[^/.]+$/, '')}-${uniqueSuffix}.${ext}`;
      
      // Upload to S3
      const key = await uploadToS3(buffer, filename);
      const url = await getSignedImageUrl(key);
      
      uploadedFiles.push({
        id: uniqueSuffix,
        url,
        key,
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
    return NextResponse.json({ 
      error: 'Error uploading file',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
