// src/app/projects/page.js
import React from 'react';

export default async function ProjectsPage() {
  let repositories = [];
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_REPO_API_URL);
    if (!res.ok) {
      console.error("Failed to fetch repositories. Status:", res.status);
      repositories = [];
    } else {
      repositories = await res.json();
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
    repositories = [];
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