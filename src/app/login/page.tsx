'use client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  return (
    <main className="min-h-[100dvh] grid lg:grid-cols-2">
      <div className="hidden lg:block bg-[rgb(var(--brand-700))]" />
      <section className="flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white shadow-md border border-slate-200 p-8">
          <div className="mb-6">
            <div className="h-10 w-10 rounded-md bg-[rgb(var(--brand-500))]" />
            <h1 className="mt-4 text-2xl font-semibold text-slate-900">Aquapor Platform</h1>
            <p className="mt-1 text-sm text-slate-500">Demo: clica em “Entrar” para continuar.</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input className="w-full rounded-md border border-slate-300 px-3 py-2" defaultValue="admin@aquapor.pt" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Palavra-passe</label>
              <input className="w-full rounded-md border border-slate-300 px-3 py-2" defaultValue="aquapor123" type="password" />
            </div>
            <button
              type="button"
              onClick={() => router.replace('/dashboard')}
              className="w-full rounded-md bg-[rgb(var(--brand-500))] hover:opacity-90 text-white py-2.5 font-medium transition"
            >
              Entrar
            </button>
            <p className="text-xs text-slate-400 text-center">Para a demo, o botão entra sempre.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
