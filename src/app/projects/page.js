import React from 'react';

export default async function ProjectsPage() {
  let repositories = [];
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_REPO_API_URL);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    repositories = await res.json();
  } catch (error) {
    console.error("Error fetching repositories:", error);
    repositories = []; // Fallback to an empty array
  }

  return (
    <div>
      <h1>Projects</h1>
      {repositories.length > 0 ? (
        <ul>
          {repositories.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      ) : (
        <p>No repositories available.</p>
      )}
    </div>
  );
}