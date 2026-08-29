import { Navbar } from "@/components/Navbar";
import { ProjectCard, ProjectView } from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { visible: true },
    orderBy: { updatedAt: "desc" },
    include: { technologies: { include: { technology: true } } }
  });

  return (
    <>
      <Navbar />
      <main className="container pt-32 pb-24">
        <p className="text-sm font-semibold uppercase tracking-[.25em] text-violet-300">Project archive</p>
        <h1 className="mt-3 text-5xl font-bold tracking-tight md:text-7xl">Things I&apos;ve built.</h1>
        <p className="mt-5 max-w-2xl text-zinc-400">Projects are synchronized from GitHub and can be curated or edited from the private admin dashboard.</p>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{projects.map(p=><ProjectCard key={p.id} project={p as ProjectView}/>)}</div>
      </main>
    </>
  );
}
