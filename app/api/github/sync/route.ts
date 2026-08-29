import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGitHubRepos, generatedDescription } from "@/lib/github";
import { isAdmin } from "@/lib/auth";

export async function POST() {
  if (!(await isAdmin())) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    const repos = await getGitHubRepos();
    for (const repo of repos) {
      const techNames = [...new Set([repo.language, ...repo.topics].filter(Boolean) as string[])];
      const project = await prisma.project.upsert({
        where: { githubId: repo.id },
        update: {
          title: repo.name,
          description: generatedDescription(repo),
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || null,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          githubUpdatedAt: new Date(repo.updated_at)
        },
        create: {
          githubId: repo.id,
          title: repo.name,
          slug: `${repo.name}-${repo.id}`.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
          description: generatedDescription(repo),
          githubUrl: repo.html_url,
          liveUrl: repo.homepage || null,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          githubUpdatedAt: new Date(repo.updated_at)
        }
      });

      for (const name of techNames) {
        const tech = await prisma.technology.upsert({ where: { name }, update: {}, create: { name } });
        await prisma.projectTechnology.upsert({
          where: { projectId_technologyId: { projectId: project.id, technologyId: tech.id } },
          update: {},
          create: { projectId: project.id, technologyId: tech.id }
        });
      }
    }
    await prisma.gitHubSync.create({ data: { username: process.env.GITHUB_USERNAME || "ankush2971sharma-ai", repoCount: repos.length } });
    return NextResponse.json({ message: `Synced ${repos.length} repositories.` });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "GitHub sync failed. Check your username/token and API limits." }, { status: 500 });
  }
}
