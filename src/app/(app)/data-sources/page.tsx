'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Activity, Search, BarChart3, Gauge, Table as TableIcon,
  Mail, Users, Link as LinkIcon, RefreshCw, Settings, CheckCircle2, XCircle
} from 'lucide-react';
import clsx from 'clsx';

type ConnectorId =
  | 'ga'
  | 'gsc'
  | 'rankmath'
  | 'psi'
  | 'sheets'
  | 'forms'
  | 'leadfeeder';

type Connector = {
  id: ConnectorId;
  name: string;
  description: string;
  icon: JSX.Element;
  docs?: string;
};

type ConnectorState = {
  connected: boolean;
  lastSync?: string;
  notes?: string;
};

const CONNECTORS: Connector[] = [
  { id: 'ga', name: 'Google Analytics', description: 'Métricas de tráfego, sessões, páginas/sessão, eventos.', icon: <Activity className="h-5 w-5" />, docs: 'https://analytics.google.com/' },
  { id: 'gsc', name: 'Google Search Console', description: 'Cliques, impressões, keywords e páginas orgânicas.', icon: <Search className="h-5 w-5" />, docs: 'https://search.google.com/search-console' },
  { id: 'rankmath', name: 'Rank Math (WordPress)', description: 'Dados SEO do plugin (rankings, issues, schema).', icon: <BarChart3 className="h-5 w-5" />, docs: 'https://rankmath.com/' },
  { id: 'psi', name: 'PageSpeed Insights', description: 'Core Web Vitals e performance por URL.', icon: <Gauge className="h-5 w-5" />, docs: 'https://pagespeed.web.dev/' },
  { id: 'sheets', name: 'Google Sheets', description: 'Importa dados custom (leads, custos, etc.) de uma folha.', icon: <TableIcon className="h-5 w-5" />, docs: 'https://sheets.google.com/' },
  { id: 'forms', name: 'Contact Forms (WP)', description: 'Submissões de formulários (CF7, WPForms, etc.).', icon: <Mail className="h-5 w-5" />, docs: 'https://contactform7.com/' },
  { id: 'leadfeeder', name: 'Leadfeeder', description: 'Identificação de empresas que visitam o site.', icon: <Users className="h-5 w-5" />, docs: 'https://www.leadfeeder.com/' },
];

function getKey(id: ConnectorId) { return `ds:${id}`; }
function loadState(id: ConnectorId): ConnectorState {
  if (typeof window === 'undefined') return { connected: false };
  try { const raw = window.localStorage.getItem(getKey(id)); return raw ? JSON.parse(raw) : { connected: false }; }
  catch { return { connected: false }; }
}
function saveState(id: ConnectorId, state: ConnectorState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(getKey(id), JSON.stringify(state));
}
function formatDate(d = new Date()) {
  return d.toLocaleString('pt-PT', { year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });
}

function ConnectorCard({ c }: { c: Connector }) {
  const [state, setState] = useState<ConnectorState>(() => loadState(c.id));

  const onToggle = () => {
    const next = { ...state, connected: !state.connected };
    if (next.connected && !next.lastSync) next.lastSync = formatDate();
    setState(next); saveState(c.id, next);
  };
  const onSync = () => { const next = { ...state, lastSync: formatDate() }; setState(next); saveState(c.id, next); };
  const onConfigure = () => {
    const note = prompt(`Configurar ${c.name}\n(ex.: Property ID, site, ID da folha)`, state.notes ?? '');
    const next = { ...state, notes: note ?? state.notes }; setState(next); saveState(c.id, next);
  };

  return (
    <div className="card p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
      <div className="flex items-start gap-3">
        <div className="rounded-lg p-2 bg-slate-800/80 text-slate-200 shrink-0">{c.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-100">{c.name}</h3>
            <span className={clsx('inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border',
              state.connected ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                              : 'border-slate-500/30 bg-slate-500/10 text-slate-300')}>
              {state.connected ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
              {state.connected ? 'Ligado' : 'Desligado'}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-300">{c.description}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1"><RefreshCw className="h-3.5 w-3.5" />Última sincronização: {state.lastSync ?? '—'}</span>
            {c.docs && <a className="inline-flex items-center gap-1 hover:underline hover:text-slate-200" href={c.docs} target="_blank" rel="noreferrer"><LinkIcon className="h-3.5 w-3.5" />Docs</a>}
            {state.notes && <span className="truncate max-w-[18rem]"><strong>Config:</strong> {state.notes}</span>}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={onToggle}
              className={clsx('px-3 py-1.5 rounded-md text-sm font-medium border',
                state.connected ? 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700'
                                : 'bg-emerald-600 text-emerald-50 border-emerald-700 hover:bg-emerald-500')}>
              {state.connected ? 'Desligar' : 'Ligar'}
            </button>
            <button onClick={onConfigure}
              className="px-3 py-1.5 rounded-md text-sm font-medium border bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700 inline-flex items-center gap-1">
              <Settings className="h-4 w-4" /> Configurar
            </button>
            <button onClick={onSync} disabled={!state.connected}
              className={clsx('px-3 py-1.5 rounded-md text-sm font-medium border inline-flex items-center gap-1',
                state.connected ? 'bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700'
                                : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed')}>
              <RefreshCw className="h-4 w-4" /> Sincronizar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DataSourcesPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const groups = useMemo(() => ([
    { title: 'Google', items: ['ga','gsc','sheets'] as ConnectorId[] },
    { title: 'WordPress / SEO', items: ['rankmath','forms'] as ConnectorId[] },
    { title: 'Performance & Leads', items: ['psi','leadfeeder'] as ConnectorId[] },
  ]), []);

  return (
    <main className="with-sidebar page py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Fontes de Dados</h1>
        <p className="text-sm text-slate-400 mt-1">
          Liga as tuas contas e fontes de dados. (Demo: estado guardado em <code>localStorage</code>.)
        </p>
      </div>

      {groups.map(g => (
        <section key={g.title} className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-slate-200">{g.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {g.items.map(id => {
              const c = CONNECTORS.find(x => x.id === id)!;
              return <ConnectorCard key={c.id} c={c} />;
            })}
          </div>
        </section>
      ))}

      <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-slate-300">
        <h3 className="font-semibold mb-1">Notas (demo)</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><em>Ligar</em> alterna o estado e, se for a 1.ª vez, define a última sincronização.</li>
          <li><em>Configurar</em> guarda um identificador (ex.: Property ID, URL do site, ID da folha).</li>
          <li><em>Sincronizar agora</em> só actualiza a data. Na produção chamará a API/OAuth.</li>
        </ul>
      </div>
    </main>
  );
}
