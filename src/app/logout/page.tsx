'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Logout() {
  const r = useRouter();
  useEffect(() => {
    document.cookie = "aq_auth=; Path=/; Max-Age=0; SameSite=Lax";
    r.replace('/login');
  }, [r]);
  return null;
}
