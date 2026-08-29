import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ankush Sharma — Full-Stack Developer",
  description: "Portfolio of Ankush Sharma, a Full-Stack Developer specializing in Python, React and Node.js."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
