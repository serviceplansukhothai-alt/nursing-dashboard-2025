'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null); setInfo(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    setInfo('สมัครสมาชิกสำเร็จ! โปรดตรวจอีเมลยืนยัน (ถ้าเปิด Confirm) แล้วไป Login');
    // ถ้าเปิด Auto-confirm ใน Supabase Auth → จะมี session เลย สามารถ redirect ได้
    if (data.session) router.replace('/dashboard');
  }

  return (
    <>
      <h2>Signup</h2>
      <form className="form" onSubmit={onSubmit}>
        <input type="email" placeholder="อีเมล" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="รหัสผ่าน (อย่างน้อย 6 ตัว)" value={password} onChange={e => setPassword(e.target.value)} required />
        <button disabled={loading}>{loading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}</button>
        {error && <p style={{color:'crimson'}}>{error}</p>}
        {info && <p style={{color:'seagreen'}}>{info}</p>}
      </form>
    </>
  );
}
