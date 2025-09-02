// app/layout.tsx
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
      <body style={{ fontFamily: "system-ui, sans-serif" }}>
        <header style={{ padding: "12px 16px", borderBottom: "1px solid #eee" }}>
          <nav style={{ display: "flex", gap: 12 }}>
            <Link href="/">หน้าแรก</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
            <Link href="/signup">Signup</Link>
          </nav>
        </header>
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}
