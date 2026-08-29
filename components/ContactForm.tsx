"use client";
import { useState } from "react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();
    setStatus(data.message || (res.ok ? "Sent!" : "Something went wrong."));
    if (res.ok) e.currentTarget.reset();
    setBusy(false);
  }

  return (
    <form onSubmit={submit} className="glass rounded-2xl p-6 md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="text-sm text-zinc-300">Name<input required name="name" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400/60" /></label>
        <label className="text-sm text-zinc-300">Email<input required type="email" name="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400/60" /></label>
      </div>
      <label className="mt-5 block text-sm text-zinc-300">Message<textarea required name="message" rows={6} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-violet-400/60" /></label>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-sm text-zinc-500">{status}</span>
        <button disabled={busy} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-violet-200 disabled:opacity-50">{busy ? "Sending..." : "Send message"}</button>
      </div>
    </form>
  );
}
