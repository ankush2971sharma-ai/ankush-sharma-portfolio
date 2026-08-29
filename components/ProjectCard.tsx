import { ExternalLink, Github, Star } from "lucide-react";

export type ProjectView = {
  id: string;
  title: string;
  slug: string;
  description: string;
  githubUrl: string | null;
  liveUrl: string | null;
  stars: number;
  forks: number;
  language: string | null;
  technologies: { technology: { name: string } }[];
};

export function ProjectCard({ project }: { project: ProjectView }) {
  return (
    <article className="glass group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30">
      <div className="mb-6 flex items-center justify-between">
        <div className="rounded-xl bg-white/5 p-3 text-violet-300">
          <Github size={20} />
        </div>
        <div className="flex gap-2">
          {project.githubUrl && <a aria-label="GitHub" href={project.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white"><Github size={18}/></a>}
          {project.liveUrl && <a aria-label="Live site" href={project.liveUrl} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white"><ExternalLink size={18}/></a>}
        </div>
      </div>
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="mt-2 min-h-16 text-sm leading-6 text-zinc-400">{project.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.language && <span className="rounded-full bg-violet-400/10 px-2.5 py-1 text-xs text-violet-200">{project.language}</span>}
        {project.technologies.slice(0, 4).map(({ technology }) => (
          <span key={technology.name} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-400">{technology.name}</span>
        ))}
      </div>
      <div className="mt-5 flex gap-4 text-xs text-zinc-500">
        <span className="inline-flex items-center gap-1"><Star size={13}/> {project.stars}</span>
        <span>{project.forks} forks</span>
      </div>
    </article>
  );
}
