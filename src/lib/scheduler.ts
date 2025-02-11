import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to publish scheduled posts
async function publishScheduledPosts() {
  const now = new Date();
  
  try {
    // Find all scheduled posts that should be published now
    const postsToPublish = await prisma.post.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledFor: {
          lte: now,
        },
      },
    });

    // Update each post to published status
    for (const post of postsToPublish) {
      await prisma.post.update({
        where: { id: post.id },
        data: {
          status: 'PUBLISHED',
          publishedAt: now,
        },
      });
      
      console.log(`Published scheduled post: ${post.title}`);
    }
  } catch (error) {
    console.error('Error publishing scheduled posts:', error);
  }
}

// Run the job every minute
export function startScheduler() {
  cron.schedule('* * * * *', publishScheduledPosts);
  console.log('Post scheduler started');
}
