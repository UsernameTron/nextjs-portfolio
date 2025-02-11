import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import slugify from 'slugify';

export async function POST(request: Request) {
  try {
    // For development, allow all requests
    if (process.env.NODE_ENV === 'development') {
      // Continue with the request
    } else {
      return NextResponse.json(
        { message: 'Unauthorized - Please sign in' },
        { status: 401 }
      );
    }

    const json = await request.json();
    console.log('Request body:', json); // Debug log
    
    const { type, title, content } = json;
    const status = json.status || 'DRAFT';
    const scheduledFor = json.scheduledFor || null;
    const bannerImage = json.bannerImage || null;

    // Validate required fields
    if (!type || !title || !content) {
      return NextResponse.json(
        { message: 'Missing required fields: type, title, and content are required' },
        { status: 400 }
      );
    }

    // In development, use a default admin user
    let user = await prisma.user.findFirst({
      where: { email: 'admin@local' },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: 'admin@local',
          name: 'Admin User',
        },
      });
    }

    console.log('User:', user); // Debug log

    // Create the slug from the title
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Keep checking until we find a unique slug
    while (true) {
      const existing = await prisma.post.findUnique({
        where: { slug },
      });

      if (!existing) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create the post
    const post = await prisma.post.create({
      data: {
        type: type as 'TECHNICAL' | 'EDITORIAL',
        title,
        slug,
        content,
        status: status as 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        coverImage: bannerImage,
        author: {
          connect: { id: user.id },
        },
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    });

    console.log('Created post:', post); // Debug log
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Error creating post' },
      { status: 500 }
    );
  }
}
