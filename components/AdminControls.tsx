"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminControls({ projects, messages }: { projects: any[]; messages: any[] }) {
  const [status, setStatus] = useState("");
  const router = useRouter();

  async function sync() {
    setStatus("Syncing GitHub...");
    const res = await fetch("/api/github/sync", { method: "POST" });
    const data = await res.json();
    setStatus(data.message);
    if (res.ok) router.refresh();
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return <main className="min-h-screen bg-[#07090d] px-5 py-8 text-white">
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
        <div><p className="text-sm text-violet-300">ANKUSH SHARMA</p><h1 className="mt-1 text-3xl font-bold">Portfolio dashboard</h1></div>
        <div className="flex gap-2"><button onClick={sync} className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black">Sync GitHub</button><button onClick={logout} className="rounded-xl border border-white/10 px-4 py-2 text-sm">Logout</button></div>
      </header>
      <p className="py-4 text-sm text-zinc-500">{status}</p>
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><div className="text-3xl font-bold">{projects.length}</div><div className="text-sm text-zinc-500">Projects</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><div className="text-3xl font-bold">{messages.length}</div><div className="text-sm text-zinc-500">Messages</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><div className="text-3xl font-bold">{messages.filter(m=>!m.read).length}</div><div className="text-sm text-zinc-500">Unread</div></div>
      </section>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[.03] p-5">
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="mt-4 divide-y divide-white/5">{projects.map(p=><div key={p.id} className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between"><div><div className="font-medium">{p.title}</div><div className="text-sm text-zinc-500">{p.language || "Unknown"} · {p.stars} stars</div></div><span className="text-xs text-zinc-500">{p.visible ? "Visible" : "Hidden"}</span></div>)}</div>
      </section>
      <section className="mt-8 rounded-2xl border border-white/10 bg-white/[.03] p-5">
        <h2 className="text-xl font-semibold">Messages</h2>
        <div className="mt-4 space-y-3">{messages.length === 0 ? <p className="text-sm text-zinc-500">No messages yet.</p> : messages.map(m=><div key={m.id} className="rounded-xl border border-white/5 bg-black/20 p-4"><div className="flex justify-between gap-4"><strong>{m.name}</strong><span className="text-xs text-zinc-600">{new Date(m.createdAt).toLocaleString()}</span></div><a className="text-sm text-violet-300" href={`mailto:${m.email}`}>{m.email}</a><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-400">{m.message}</p></div>)}</div>
      </section>
    </div>
  </main>;
}
