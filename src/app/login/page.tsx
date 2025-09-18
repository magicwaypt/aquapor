'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const demoUser = 'admin@aquapor.pt';
  const demoPass = 'aquapor123';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get('email') || '').trim();
    const password = String(data.get('password') || '');

    // validação dummy
    if (email === demoUser && password === demoPass) {
      setError(null);
      router.push('/dashboard');
    } else {
      setError('Credenciais inválidas. Use admin@aquapor.pt / aquapor123');
    }
  }

  return (
    <main className="min-h-[calc(100dvh)] grid lg:grid-cols-2">
      {/* Lado esquerdo (cor sólida) */}
      <div className="hidden lg:block bg-[rgb(var(--brand-700))]" />

      {/* Lado direito (formulário) */}
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-md border border-slate-200 p-8">
          <div className="mb-6">
            <div className="h-10 w-10 rounded-md bg-[rgb(var(--brand-500))]" />
            <h1 className="mt-4 text-2xl font-semibold text-slate-900">
              Aquapor Platform
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Inicie sessão para aceder à plataforma.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                defaultValue={demoUser}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(var(--brand-500))]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Palavra-passe</label>
              <input
                name="password"
                type="password"
                defaultValue={demoPass}
                className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-[rgb(var(--brand-500))]"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-[rgb(var(--brand-500))] hover:opacity-90 text-white py-2.5 font-medium transition"
            >
              Iniciar Sessão
            </button>

            <p className="text-xs text-slate-400 text-center">
              Demonstração: {demoUser} / {demoPass}
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
