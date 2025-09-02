"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const r = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return setErr(error.message);
    r.replace("/dashboard");
  }

  return (
    <div style={{ maxWidth: 360 }}>
      <h1>Signup</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button disabled={loading}>{loading ? "..." : "Create account"}</button>
        {err && <p style={{ color: "crimson" }}>{err}</p>}
      </form>
    </div>
  );
}
