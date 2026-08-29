const username = process.env.GITHUB_USERNAME || "ankush2971sharma-ai";
const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  homepage: string | null;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
};

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
    { headers, next: { revalidate: 900 } }
  );
  if (!res.ok) throw new Error(`GitHub repositories request failed: ${res.status}`);
  const data = (await res.json()) as GitHubRepo[];
  return data.filter((repo) => !repo.fork);
}

export async function getGitHubProfile() {
  const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers,
    next: { revalidate: 900 }
  });
  if (!res.ok) throw new Error(`GitHub profile request failed: ${res.status}`);
  return res.json();
}

export async function getGitHubLanguages(repo: GitHubRepo) {
  const res = await fetch(`https://api.github.com/repos/${repo.full_name}/languages`, {
    headers,
    next: { revalidate: 900 }
  });
  if (!res.ok) return {};
  return res.json();
}

export function generatedDescription(repo: GitHubRepo) {
  if (repo.description?.trim()) return repo.description.trim();
  const tech = [repo.language, ...repo.topics].filter(Boolean).slice(0, 3);
  return tech.length
    ? `${repo.name.replace(/[-_]/g, " ")} — a ${tech.join(", ")} project built as part of my full-stack development work.`
    : `${repo.name.replace(/[-_]/g, " ")} — a full-stack development project focused on practical, modern web engineering.`;
}
