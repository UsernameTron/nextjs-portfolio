import Parser from 'rss-parser';
import { BlogPost } from '@/types';

const parser = new Parser();

export async function fetchMediumPosts(feedUrl: string): Promise<BlogPost[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      content: item.content || '',
      source: 'medium' as const
    }));
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

export async function fetchSubstackPosts(feedUrl: string): Promise<BlogPost[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items.map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      content: item.content || '',
      source: 'substack' as const
    }));
  } catch (error) {
    console.error('Error fetching Substack posts:', error);
    return [];
  }
}
