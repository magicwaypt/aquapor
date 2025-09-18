'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      const auth = localStorage.getItem('aq_auth');
      if (!auth) {
        router.replace('/');
      }
    } catch (e) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="page space-y-6">
      <h1>Visão Geral do Dashboard</h1>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 card p-4">
          <div className="flex items-center justify-between mb-3">
            <h2>Tendências de tráfego do site</h2>
            <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white">Últimos 30 dias</span>
          </div>
          <div className="h-64 rounded-lg bg-slate-900/40" />
        </div>

        <div className="card p-4">
          <h2 className="mb-3">Palavras-chave em destaque</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>análises de água</span><span className="text-slate-400">800 cliques</span></li>
            <li className="flex justify-between"><span>infraestrutura hídrica</span><span className="text-slate-400">705 cliques</span></li>
            <li className="flex justify-between"><span>água sustentável</span><span className="text-slate-400">610 cliques</span></li>
          </ul>
        </div>

        <div className="card p-4">
          <h2 className="mb-3">Insights do Assistente IA</h2>
          <ul className="list-disc pl-5 text-sm space-y-2 text-slate-300">
            <li>Otimize a velocidade móvel nas páginas de serviço.</li>
            <li>Destaque conteúdos sobre "conservação de água".</li>
            <li>Aumente o foco em palavras-chave de alta intenção.</li>
          </ul>
        </div>

        <div className="card p-4 xl:col-span-2">
          <h2 className="mb-3">Funil de conversão</h2>
          <div className="h-64 rounded-lg bg-slate-900/40" />
        </div>
      </section>
    </div>
  );
}
