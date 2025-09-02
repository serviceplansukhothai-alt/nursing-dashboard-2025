import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nursing Dashboard",
  description: "Auth demo with Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <nav>
          <Link href="/">หน้าแรก</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Signup</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
