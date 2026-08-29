import Link from "next/link";

export function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-[#07090d]/75 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold tracking-tight">ANKUSH SHARMA<span className="text-violet-400"></span></Link>
        <nav className="hidden gap-7 text-sm text-zinc-400 md:flex">
          <Link className="transition hover:text-white" href="/#about">About</Link>
          <Link className="transition hover:text-white" href="/projects">Projects</Link>
          <Link className="transition hover:text-white" href="/#contact">Contact</Link>
        </nav>
        <Link href="/#contact" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium transition hover:border-violet-400/50 hover:bg-white/5">Let&apos;s talk</Link>
      </div>
    </header>
  );
}
