"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/admin/login", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(data) });
    if (res.ok) router.push("/admin/dashboard"); else setError((await res.json()).message);
  }

  return <main className="grid min-h-screen place-items-center px-5">
    <form onSubmit={submit} className="glass w-full max-w-md rounded-2xl p-8">
      <div className="text-sm text-violet-300">ADMIN</div><h1 className="mt-2 text-3xl font-bold">Welcome back.</h1>
      <p className="mt-2 text-sm text-zinc-500">Manage your portfolio without touching the code.</p>
      <input required name="email" type="email" placeholder="Admin email" className="mt-7 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"/>
      <input required name="password" type="password" placeholder="Password" className="mt-3 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none"/>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      <button className="mt-5 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black">Sign in</button>
    </form>
  </main>;
}
