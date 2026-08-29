import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/resend";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000)
});

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ message: "Please check your details and try again." }, { status: 400 });

    const saved = await prisma.contactMessage.create({ data: parsed.data });
    try { await sendContactNotification(saved.name, saved.email, saved.message); } catch (e) { console.error("Resend notification failed", e); }
    return NextResponse.json({ message: "Thanks — your message has been sent." });
  } catch {
    return NextResponse.json({ message: "Unable to send your message right now." }, { status: 500 });
  }
}
