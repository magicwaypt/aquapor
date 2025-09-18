'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      const r = await fetch('/api/demo-login', { method: 'POST' });
      if (r.ok) router.replace('/dashboard');
      else alert('Falha ao iniciar sessão');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[100dvh] grid lg:grid-cols-2">
      <div className="hidden lg:block bg-[rgb(var(--brand-700))]" />
      <section className="flex items-center justify-center p-6">
        <form onSubmit={entrar} className="w-full max-w-md rounded-2xl bg-white shadow-md border border-slate-200 p-8">
          <div className="mb-6">
            <div className="h-10 w-10 rounded-md bg-[rgb(var(--brand-500))]" />
            <h1 className="mt-4 text-2xl font-semibold text-slate-900">Aquapor Platform</h1>
            <p className="mt-1 text-sm text-slate-500">Demo: usa qualquer email / password.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(var(--brand-500))]" defaultValue="admin@aquapor.pt"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Palavra-passe</label>
              <input type="password" className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(var(--brand-500))]" defaultValue="aquapor123"/>
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-md bg-[rgb(var(--brand-500))] hover:opacity-90 disabled:opacity-60 text-white py-2.5 font-medium transition">
              {loading ? 'A entrar…' : 'Entrar'}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
