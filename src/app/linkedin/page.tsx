import { LinkedInArticle } from '@/types';

// This would typically come from your database or storage
const SAMPLE_ARTICLES: LinkedInArticle[] = [
  {
    title: 'Sample LinkedIn Article',
    content: 'This is a sample LinkedIn article content...',
    publishedDate: '2025-02-10',
    link: 'https://linkedin.com/post/sample'
  }
];

export default function LinkedInArticles() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">LinkedIn Articles</h1>
        <p className="text-gray-600 mt-2">My professional insights and experiences</p>
      </div>

      <div className="grid gap-6">
        {SAMPLE_ARTICLES.map((article, index) => (
          <article
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <time>{article.publishedDate}</time>
              {article.link && (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Read on LinkedIn →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
