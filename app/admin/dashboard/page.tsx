import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/auth";
import { AdminControls } from "@/components/AdminControls";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  if (!(await isAdmin())) redirect("/admin/login");
  const [projects, messages] = await Promise.all([
    prisma.project.findMany({ orderBy: { updatedAt: "desc" }, include: { technologies: { include: { technology: true } } } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
  ]);
  return <AdminControls projects={projects} messages={messages}/>;
}
