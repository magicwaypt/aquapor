'use client';

import { useEffect, useMemo, useState } from 'react';

type Settings = {
  language: 'pt' | 'en';
  defaultRange: '7' | '30' | '90';
  chartsAnimated: boolean;
  compactSidebar: boolean;
  brand500: string; // ex: #50b0a8
  brand700: string; // ex: #102d47
  dataRetention: '30' | '90' | '180' | '365' | 'forever';
};

const LS_SETTINGS = 'aq_settings';

// chaves locais que temos usado para guardar “demo state”
const LOCAL_KEYS = [
  'aq_reports',
  'aq_report_templates',
  'aq_connectors',       // data-sources (demo)
  'aq_team_insights',    // users insights (demo)
  LS_SETTINGS,
];

function load(): Settings {
  try {
    const raw = localStorage.getItem(LS_SETTINGS);
    if (!raw) throw new Error('no settings');
    return JSON.parse(raw) as Settings;
  } catch {
    return {
      language: 'pt',
      defaultRange: '30',
      chartsAnimated: true,
      compactSidebar: false,
      brand500: '#50b0a8',
      brand700: '#102d47',
      dataRetention: '365',
    };
  }
}
function save(s: Settings) {
  localStorage.setItem(LS_SETTINGS, JSON.stringify(s));
}

function applyBrandCss(brand500: string, brand700: string) {
  // Aplica às CSS vars globais (definidas no teu globals.css)
  const root = document.documentElement;
  const toRgb = (hex: string) => {
    const h = hex.replace('#','');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r} ${g} ${b}`;
  };
  root.style.setProperty('--brand-500', toRgb(brand500));
  root.style.setProperty('--brand-700', toRgb(brand700));
}

export default function SettingsPage() {
  const [s, setS] = useState<Settings | null>(null);

  useEffect(() => {
    const initial = load();
    setS(initial);
    applyBrandCss(initial.brand500, initial.brand700);
  }, []);

  useEffect(() => {
    if (!s) return;
    save(s);
  }, [s]);

  function onColorChange(key: 'brand500' | 'brand700', value: string) {
    if (!s) return;
    const next = { ...s, [key]: value };
    setS(next);
    applyBrandCss(next.brand500, next.brand700);
  }

  function clearLocalData() {
    if (!confirm('Isto vai apagar dados locais (demo). Continuar?')) return;
    LOCAL_KEYS.forEach(k => localStorage.removeItem(k));
    alert('Dados locais removidos. (Atualiza a página para efeito completo.)');
  }

  function exportData() {
    const dump: Record<string, any> = {};
    LOCAL_KEYS.forEach(k => {
      const v = localStorage.getItem(k);
      if (v) dump[k] = JSON.parse(v);
    });
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aquapor-demo-export.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importData(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result)) as Record<string, unknown>;
        Object.entries(obj).forEach(([k, v]) => {
          if (LOCAL_KEYS.includes(k)) localStorage.setItem(k, JSON.stringify(v));
        });
        alert('Import concluído. Atualiza a página para ver mudanças.');
      } catch {
        alert('Ficheiro inválido.');
      }
    };
    reader.readAsText(f);
  }

  const version = useMemo(() => 'v0.1.0 (demo)', []);

  if (!s) return null;

  return (
    <main className="with-sidebar page py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Definições</h1>

      {/* Preferências de aplicação */}
      <section className="card p-4">
        <h2 className="text-lg font-semibold">Preferências</h2>
        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div>
            <label className="block text-sm mb-1">Idioma</label>
            <select
              value={s.language}
              onChange={e => setS({ ...s, language: e.target.value as Settings['language'] })}
              className="w-full rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 outline-none focus:border-teal-400"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Janela de tempo padrão</label>
            <select
              value={s.defaultRange}
              onChange={e => setS({ ...s, defaultRange: e.target.value as Settings['defaultRange'] })}
              className="w-full rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 outline-none focus:border-teal-400"
            >
              <option value="7">Últimos 7 dias</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 90 dias</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="chartsAnimated"
              type="checkbox"
              checked={s.chartsAnimated}
              onChange={e => setS({ ...s, chartsAnimated: e.target.checked })}
              className="h-4 w-4"
            />
            <label htmlFor="chartsAnimated" className="text-sm">Animação nos gráficos</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="compactSidebar"
              type="checkbox"
              checked={s.compactSidebar}
              onChange={e => setS({ ...s, compactSidebar: e.target.checked })}
              className="h-4 w-4"
            />
            <label htmlFor="compactSidebar" className="text-sm">Sidebar compacta (demo)</label>
          </div>
        </div>
      </section>

      {/* Branding / cores */}
      <section className="card p-4">
        <h2 className="text-lg font-semibold">Branding</h2>
        <p className="text-sm text-slate-400">Ajusta as cores principais (aplicadas ao tema via CSS variables).</p>
        <div className="grid gap-6 sm:grid-cols-2 mt-4">
          <div>
            <label className="block text-sm mb-1">Primária (brand-500)</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={s.brand500}
                onChange={e => onColorChange('brand500', e.target.value)}
                className="h-10 w-12 rounded border border-slate-700 bg-slate-800/60"
              />
              <input
                value={s.brand500}
                onChange={e => onColorChange('brand500', e.target.value)}
                className="w-40 rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 outline-none focus:border-teal-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Escura (brand-700)</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={s.brand700}
                onChange={e => onColorChange('brand700', e.target.value)}
                className="h-10 w-12 rounded border border-slate-700 bg-slate-800/60"
              />
              <input
                value={s.brand700}
                onChange={e => onColorChange('brand700', e.target.value)}
                className="w-40 rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 outline-none focus:border-teal-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dados & Privacidade */}
      <section className="card p-4">
        <h2 className="text-lg font-semibold">Dados & Privacidade (demo)</h2>
        <div className="grid gap-4 md:grid-cols-2 mt-3">
          <div>
            <label className="block text-sm mb-1">Retenção de dados</label>
            <select
              value={s.dataRetention}
              onChange={e => setS({ ...s, dataRetention: e.target.value as Settings['dataRetention'] })}
              className="w-full rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 outline-none focus:border-teal-400"
            >
              <option value="30">30 dias</option>
              <option value="90">90 dias</option>
              <option value="180">180 dias</option>
              <option value="365">1 ano</option>
              <option value="forever">Ilimitado</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={exportData}
              className="rounded-md border border-slate-600 hover:border-teal-400 px-4 py-2">
              Exportar dados (JSON)
            </button>

            <label className="rounded-md border border-slate-600 hover:border-teal-400 px-4 py-2 cursor-pointer">
              Importar JSON
              <input type="file" accept="application/json" onChange={importData} className="hidden"/>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <button onClick={clearLocalData}
            className="rounded-md border border-rose-700/70 hover:border-rose-500 px-4 py-2 text-rose-300">
            Apagar dados locais (demo)
          </button>
          <p className="text-xs text-slate-400 mt-2">
            Isto limpa relatórios, templates, conectores e insights guardados em <code>localStorage</code>.
          </p>
        </div>
      </section>

      {/* Conta (dummy) & Sobre */}
      <section className="card p-4">
        <h2 className="text-lg font-semibold">Conta (demo)</h2>
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="font-medium">Pedro Palrão</p>
            <p className="text-sm text-slate-400">admin@aquapor.pt</p>
          </div>
          <a href="/login" className="rounded-md border border-slate-600 hover:border-teal-400 px-4 py-2">
            Terminar sessão
          </a>
        </div>
      </section>

      <section className="card p-4">
        <h2 className="text-lg font-semibold">Sobre</h2>
        <p className="text-sm text-slate-400">Aquapor Platform — {version}</p>
        <p className="text-sm text-slate-400">UI demo construída com Next.js + Tailwind.</p>
      </section>
    </main>
  );
}
