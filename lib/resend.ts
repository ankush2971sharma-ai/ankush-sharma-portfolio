import { Resend } from "resend";

export async function sendContactNotification(name: string, email: string, message: string) {
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) return;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`
  });
}
