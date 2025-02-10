import { fetchMediumPosts } from '@/utils/rss';

export const revalidate = 3600; // Revalidate every hour

export default async function MediumPosts() {
  const posts = await fetchMediumPosts(process.env.MEDIUM_RSS_URL || '');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Medium Posts</h1>
        <p className="text-gray-600 mt-2">My latest articles from Medium</p>
      </div>

      <div className="grid gap-6">
        {posts.map((post, index) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <div 
              className="text-gray-600 mb-4 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.split('</p>')[0] + '</p>' }}
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <time>{new Date(post.pubDate).toLocaleDateString()}</time>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                Read on Medium →
              </a>
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No Medium posts found. Make sure your RSS feed URL is configured correctly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
