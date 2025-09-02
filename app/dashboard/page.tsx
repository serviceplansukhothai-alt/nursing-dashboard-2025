'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/login');
        return;
      }
      setEmail(user.email ?? null);
      setLoading(false);
    })();
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/login');
  }

  if (loading) return <p>กำลังตรวจสอบสิทธิ์...</p>;

  return (
    <>
      <h2>Dashboard</h2>
      <p>สวัสดีคุณ <b>{email}</b></p>
      <button onClick={signOut}>ออกจากระบบ</button>
      <div style={{marginTop:16}}>
        <p>💡 ตรงนี้คือหน้าที่อนุญาตเฉพาะผู้ที่ล็อกอินแล้ว</p>
      </div>
    </>
  );
}
