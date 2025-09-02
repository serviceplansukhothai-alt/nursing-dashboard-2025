"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const r = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) r.replace("/login");
      else setEmail(data.user.email ?? null);
    });
  }, [r]);

  async function logout() {
    await supabase.auth.signOut();
    r.replace("/login");
  }

  return (
    <div style={{ maxWidth: 560 }}>
      <h1>Dashboard</h1>
      <p>สวัสดี {email ?? "..."}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
