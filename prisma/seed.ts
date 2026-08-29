import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const hash = process.env.ADMIN_PASSWORD_HASH || await bcrypt.hash("change-me-now", 12);

  await prisma.admin.upsert({
    where: { email },
    update: { passwordHash: hash },
    create: { email, passwordHash: hash }
  });

  const content = [
    ["hero_eyebrow", "FULL-STACK DEVELOPER"],
    ["hero_title", "I build fast, thoughtful digital products."],
    ["hero_description", "I’m Ankush Sharma, a Full-Stack Developer focused on Python, React and Node.js. I turn ideas into polished, scalable web experiences."],
    ["about", "I enjoy building products end-to-end — from clean interfaces and APIs to databases and deployment. My approach blends practical engineering, curiosity and a strong eye for user experience."],
    ["availability", "Open to opportunities & collaborations"],
    ["contact_email", "hello@example.com"]
  ];

  for (const [key, value] of content) {
    await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
  }

  const techs = ["Python", "React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "JavaScript"];
  for (const name of techs) {
    await prisma.technology.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }
}

main().finally(() => prisma.$disconnect());
