export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  source: 'medium' | 'substack';
}

export interface LinkedInArticle {
  title: string;
  content: string;
  publishedDate: string;
  link?: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  updatedAt: string;
}

export interface MediaItem {
  type: 'image' | 'video';
  title: string;
  url: string;
  description?: string;
  thumbnailUrl?: string;
}
