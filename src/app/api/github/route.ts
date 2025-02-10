import { NextResponse } from 'next/server';
import { fetchGitHubRepos } from '@/utils/github';

export async function GET() {
  try {
    const repos = await fetchGitHubRepos('UsernameTron');
    return NextResponse.json(repos);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
}
