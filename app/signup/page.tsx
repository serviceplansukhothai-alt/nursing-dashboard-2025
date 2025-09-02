"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/login`,
      },
    });
    setLoading(false);
    if (error) {
      alert(error.message);
      return;
    }
    alert("สมัครสมาชิกสำเร็จ! โปรดยืนยันอีเมล (ถ้าตั้งค่าไว้) แล้วเข้าสู่ระบบ");
    router.replace("/login");
  }

  return (
    <div style={{ maxWidth: 360 }}>
      <h2>สมัครสมาชิก</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 10, border: "1px solid #ddd" }}
        />
        <input
          type="password"
          placeholder="รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: 10, border: "1px solid #ddd" }}
        />
        <button disabled={loading} type="submit" style={{ padding: 10 }}>
          {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
        </button>
      </form>

      <p style={{ marginTop: 12 }}>
        มีบัญชีแล้ว? <a href="/login">เข้าสู่ระบบ</a>
      </p>
    </div>
  );
}
