'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@aquapor.pt');
  const [password, setPassword] = useState('aquapor123');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Credenciais fictícias
    if (email === 'admin@aquapor.pt' && password === 'aquapor123') {
      // gravar token simples no localStorage
      localStorage.setItem('aq_auth', JSON.stringify({ user: 'admin', email }));
      router.push('/dashboard');
    } else {
      setError('Email ou palavra-passe incorretos.');
    }
  }

  return (
    <div className="min-h-screen grid place-items-center bg-[rgb(var(--brand-700))]">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="hidden md:block md:w-1/2 bg-[url(/banner.png)] bg-cover bg-center" />
          <div className="w-full md:w-1/2 p-8">
            <h1 className="text-2xl font-bold mb-2">Bem-vindo ao Aquapor</h1>
            <p className="text-sm text-slate-600 mb-6">Inicie sessão para aceder à plataforma de Data Intelligence.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Palavra-passe</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm" />
              </div>

              {error && <p className="text-sm text-rose-400">{error}</p>}

              <div className="pt-2">
                <button type="submit"
                  className="w-full rounded-md bg-[rgb(var(--brand-500))] text-slate-900 py-2 font-medium">
                  Iniciar Sessão
                </button>
              </div>

              <p className="text-xs text-slate-500 text-center mt-2">
                Credenciais de demonstração: <strong>admin@aquapor.pt</strong> / <strong>aquapor123</strong>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
