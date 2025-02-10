import { GitHubRepo } from '@/types';

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch('http://localhost:3000/api/github', {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

export default async function Projects() {
  const repos = await getGitHubRepos();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-gray-600 mt-2">My open source contributions and personal projects</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {repos.map((repo) => (
          <article
            key={repo.name}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{repo.name}</h2>
            <p className="text-gray-600 mb-4">{repo.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                {repo.language}
              </span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                ⭐ {repo.stars}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <time className="text-gray-500">
                Updated: {new Date(repo.updatedAt).toLocaleDateString()}
              </time>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                View on GitHub →
              </a>
            </div>
          </article>
        ))}
        {repos.length === 0 && (
          <div className="text-center text-gray-500 py-8 col-span-2">
            <p>No repositories found. Make sure your GitHub token is configured correctly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
