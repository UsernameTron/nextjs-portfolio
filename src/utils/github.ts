import { Octokit } from '@octokit/rest';
import { GitHubRepo } from '@/types';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 100,
    });

    return data.map(repo => ({
      name: repo.name,
      description: repo.description || '',
      url: repo.html_url,
      stars: repo.stargazers_count || 0,
      language: repo.language || 'Not specified',
      updatedAt: repo.updated_at || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}
