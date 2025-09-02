"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    location.href = "/login";
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>ยินดีต้อนรับ: <strong>{email ?? "..."}</strong></p>
      <button onClick={signOut} style={{ padding: 10 }}>ออกจากระบบ</button>
    </div>
  );
}
