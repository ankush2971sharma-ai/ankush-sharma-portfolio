import { ArrowDownRight, Github, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard, ProjectView } from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";
import { getGitHubProfile } from "@/lib/github";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, profile] = await Promise.all([
    prisma.project.findMany({
      where: { visible: true, featured: true },
      orderBy: { updatedAt: "desc" },
      take: 3,
      include: { technologies: { include: { technology: true } } }
    }),
    getGitHubProfile().catch(() => null)
  ]);

  return (
    <>
      <Navbar />
      <main>
        <section className="grid-bg relative overflow-hidden pt-36 pb-24 md:pt-48 md:pb-32">
          <div className="container">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.03] px-4 py-2 text-xs text-zinc-300"><Sparkles size={14} className="text-violet-300"/> FULL-STACK DEVELOPER</div>
              <h1 className="text-5xl font-bold leading-[1.03] tracking-[-.04em] md:text-8xl">I build fast, thoughtful <span className="text-violet-300">digital products.</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">I’m Ankush Sharma, a Full-Stack Developer specializing in Python, React and Node.js. I turn ideas into polished, scalable web experiences.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/projects" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-black">Explore projects <ArrowDownRight size={17}/></Link>
                <a href="https://github.com/ankush2971sharma-ai" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 font-semibold"><Github size={17}/> GitHub</a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-24">
          <div className="container grid gap-12 md:grid-cols-[.7fr_1.3fr]">
            <div><p className="text-sm font-semibold uppercase tracking-[.25em] text-violet-300">About me</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Engineering with a product mindset.</h2></div>
            <div className="text-lg leading-8 text-zinc-400"><p>I enjoy building products end-to-end — from clean interfaces and APIs to databases and deployment. My approach blends practical engineering, curiosity and a strong eye for user experience.</p><div className="mt-8 flex flex-wrap gap-2">{["Python","React","Next.js","Node.js","TypeScript","PostgreSQL","Prisma"].map(x=><span key={x} className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-300">{x}</span>)}</div></div>
          </div>
        </section>

        <section className="border-y border-white/5 py-12">
          <div className="container grid gap-5 md:grid-cols-3">
            <div className="glass rounded-2xl p-6"><div className="text-3xl font-bold">{profile?.public_repos ?? "—"}</div><p className="mt-1 text-sm text-zinc-500">Public repositories</p></div>
            <div className="glass rounded-2xl p-6"><div className="text-3xl font-bold">{profile?.followers ?? "—"}</div><p className="mt-1 text-sm text-zinc-500">GitHub followers</p></div>
            <div className="glass rounded-2xl p-6"><div className="text-3xl font-bold">{profile?.following ?? "—"}</div><p className="mt-1 text-sm text-zinc-500">Following</p></div>
          </div>
        </section>

        <section className="py-24">
          <div className="container">
            <div className="flex items-end justify-between gap-5"><div><p className="text-sm font-semibold uppercase tracking-[.25em] text-violet-300">Selected work</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Projects that ship.</h2></div><Link href="/projects" className="hidden text-sm text-zinc-400 hover:text-white md:block">View all →</Link></div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">{projects.map((p)=><ProjectCard key={p.id} project={p as ProjectView}/>)}</div>
          </div>
        </section>

        <section id="contact" className="py-24">
          <div className="container grid gap-10 md:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-sm font-semibold uppercase tracking-[.25em] text-violet-300">Contact</p><h2 className="mt-3 text-4xl font-semibold md:text-6xl">Have an idea? Let&apos;s build it.</h2><p className="mt-5 text-zinc-400">Tell me what you’re working on and I’ll get back to you.</p><a className="mt-6 inline-flex items-center gap-2 text-zinc-300 hover:text-white" href="mailto:hello@example.com"><Mail size={17}/> hello@example.com</a></div>
            <ContactForm/>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/5 py-8"><div className="container flex flex-col justify-between gap-3 text-sm text-zinc-500 md:flex-row"><span>© {new Date().getFullYear()} Ankush Sharma</span><span>Built with Next.js + PostgreSQL</span></div></footer>
    </>
  );
}
