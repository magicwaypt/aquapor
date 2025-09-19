'use client';
import { useRouter } from 'next/navigation';
import { Bell, Plus } from 'lucide-react';

export default function Header() {
  const router = useRouter();
  const logout = () => {
    try { localStorage.removeItem('demo-auth'); } catch {}
    router.push('/login');
  };
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0f1b2a]/80 backdrop-blur">
      <div className="page py-3 flex items-center gap-3">
        <input
          placeholder="Pesquisar insights, palavras-chave, recomendações…"
          className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm outline-none"
        />
        <button className="inline-flex items-center gap-2 rounded-lg bg-[rgb(var(--brand-500))] text-[#0f1b2a] px-3 py-2 text-sm font-medium">
          <Plus className="size-4" /> Novo Relatório
        </button>
        <button className="rounded-lg bg-white/5 border border-white/10 p-2">
          <Bell className="size-4" />
        </button>
        <button onClick={logout} className="rounded-lg bg-white/5 border border-white/10 px-3 py-2 text-sm">
          Logout
        </button>
      </div>
    </header>
  );
}
