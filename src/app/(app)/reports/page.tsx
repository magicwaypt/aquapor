'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';

type SectionKey =
  | 'seo'
  | 'marketing'
  | 'comercial'
  | 'industria'
  | 'preditivos'
  | 'funil'
  | 'keywords';

type Report = {
  id: string;
  name: string;
  sections: SectionKey[];
  insights: string;
  createdAt: string; // ISO
};

type Template = {
  id: string;
  name: string;
  description?: string;
  sections: SectionKey[];
  insights?: string;
};

const LS_REPORTS = 'aq_reports';
const LS_TEMPLATES = 'aq_report_templates';

const ALL_SECTIONS: { key: SectionKey; label: string }[] = [
  { key: 'seo',        label: 'SEO' },
  { key: 'marketing',  label: 'Marketing (Analytics)' },
  { key: 'comercial',  label: 'Comercial' },
  { key: 'industria',  label: 'Indústria / Benchmarks' },
  { key: 'preditivos', label: 'Insights preditivos' },
  { key: 'funil',      label: 'Funil de conversão' },
  { key: 'keywords',   label: 'Palavras-chave' },
];

function load<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; }
  catch { return fallback; }
}
function save<T>(key: string, val: T) { localStorage.setItem(key, JSON.stringify(val)); }

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState('');
  const [sections, setSections] = useState<SectionKey[]>(['seo','marketing']);
  const [insights, setInsights] = useState('');
  const [filter, setFilter] = useState('');

  const defaultTemplates = useMemo<Template[]>(
    () => [
      { id: 'tpl-executivo', name: 'Executivo Mensal',
        description: 'Resumo C-level: SEO + Marketing + Preditivos',
        sections: ['seo','marketing','preditivos'],
        insights: '• Foco em crescimento orgânico e performance mobile.\n• Alocar budget a conteúdos com maior intenção.\n• Preparar iniciativas sazonais (próx. trimestre).' },
      { id: 'tpl-seo-semanal', name: 'SEO Semanal',
        description: 'Ranking, keywords, issues e next steps.',
        sections: ['seo','keywords'],
        insights: '• Prioridade: corrigir meta-descriptions duplicadas.\n• Conteúdos alvo: “qualidade da água”, “telemetria”.' },
      { id: 'tpl-perf-comercial', name: 'Performance Comercial',
        description: 'Funil + fontes + oportunidades.',
        sections: ['comercial','funil','marketing'],
        insights: '• Melhorar tracking de formulários para lead quality.\n• Rever campanhas com CPA elevado.' },
    ], []);

  useEffect(() => {
    setReports(load<Report[]>(LS_REPORTS, []));
    const stored = load<Template[]>(LS_TEMPLATES, []);
    if (stored.length === 0) { setTemplates(defaultTemplates); save(LS_TEMPLATES, defaultTemplates); }
    else setTemplates(stored);
  }, [defaultTemplates]);

  function toggleSection(key: SectionKey) {
    setSections(prev => prev.includes(key) ? prev.filter(k => k!==key) : [...prev, key]);
  }
  function createReport() {
    if (!name.trim()) return alert('Dá um nome ao relatório 🙂');
    const r: Report = {
      id: crypto.randomUUID(),
      name: name.trim(),
      sections: [...sections],
      insights: insights.trim(),
      createdAt: new Date().toISOString(),
    };
    const next = [r, ...reports]; setReports(next); save(LS_REPORTS, next);
    setName(''); setInsights(''); setSections(['seo','marketing']);
  }
  function deleteReport(id: string) { const next = reports.filter(r=>r.id!==id); setReports(next); save(LS_REPORTS, next); }
  function duplicateReport(r: Report) {
    const copy: Report = { ...r, id: crypto.randomUUID(), name: r.name+' (cópia)', createdAt: new Date().toISOString() };
    const next = [copy, ...reports]; setReports(next); save(LS_REPORTS, next);
  }
  function applyTemplate(tpl: Template) { setSections(tpl.sections); if (tpl.insights) setInsights(tpl.insights); if (!name.trim()) setName(tpl.name); }
  function saveTemplateFromForm() {
    const tplName = prompt('Nome do template:'); if (!tplName) return;
    const newTpl: Template = { id: crypto.randomUUID(), name: tplName.trim(), description: 'Template personalizado', sections: [...sections], insights: insights || undefined };
    const next = [newTpl, ...templates]; setTemplates(next); save(LS_TEMPLATES, next);
  }

  const filtered = useMemo(
    () => reports.filter(r => (r.name+' '+r.sections.join(' ')+' '+r.insights).toLowerCase().includes(filter.toLowerCase())),
    [reports, filter]
  );

  return (
    <main className="with-sidebar page py-6 space-y-6">
      <h1 className="text-2xl font-semibold">Relatórios</h1>

      <section className="card p-4">
        <h2 className="text-lg font-semibold">Criar novo relatório</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <label className="block text-sm mb-1">Nome do relatório</label>
            <input value={name} onChange={e=>setName(e.target.value)}
              className="w-full rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 outline-none focus:border-teal-400"
              placeholder="Ex.: Relatório mensal – Setembro"/>

            <p className="mt-4 text-sm font-medium mb-1">Secções incluídas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {ALL_SECTIONS.map(s=>(
                <button key={s.key} onClick={()=>toggleSection(s.key)}
                  className={clsx('rounded-md border px-3 py-2 text-sm text-left',
                    sections.includes(s.key)?'border-teal-500/60 bg-teal-500/10':'border-slate-700 bg-slate-800/40 hover:bg-slate-800/60')}>
                  {s.label}
                </button>
              ))}
            </div>

            <label className="block text-sm mt-4 mb-1">Insights estratégicos</label>
            <textarea rows={5} value={insights} onChange={e=>setInsights(e.target.value)}
              className="w-full rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 outline-none focus:border-teal-400"
              placeholder="Escreve 3–5 bullets com recomendações e prioridades…"/>
            <div className="mt-3 flex gap-2">
              <button onClick={createReport} className="rounded-md bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium px-4 py-2">Guardar relatório</button>
              <button onClick={saveTemplateFromForm} className="rounded-md border border-slate-600 hover:border-teal-400 px-4 py-2">Guardar como template</button>
              <button onClick={()=>alert('Export PDF (demo)')} className="rounded-md border border-slate-600 hover:border-teal-400 px-4 py-2" title="Placeholder; na produção chama geração de PDF">Exportar PDF (demo)</button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <p className="text-sm font-medium mb-2">Templates</p>
            <div className="space-y-2 max-h-[360px] overflow-auto pr-1">
              {templates.map(t=>(
                <div key={t.id} className="rounded-lg border border-slate-700 bg-slate-900/40 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{t.name}</p>
                    <button onClick={()=>applyTemplate(t)} className="text-xs rounded-md border border-slate-600 px-2 py-1 hover:border-teal-400">Aplicar</button>
                  </div>
                  {t.description && <p className="mt-1 text-xs text-slate-400">{t.description}</p>}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {t.sections.map(s=>(
                      <span key={s} className="text-[10px] rounded-full bg-slate-800 border border-slate-600 px-2 py-0.5">
                        {ALL_SECTIONS.find(x=>x.key===s)?.label ?? s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {templates.length===0 && <p className="text-sm text-slate-400">Sem templates ainda.</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="card p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Relatórios guardados</h2>
          <input value={filter} onChange={e=>setFilter(e.target.value)}
            className="rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 outline-none focus:border-teal-400"
            placeholder="Pesquisar…"/>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr className="border-b border-slate-700">
                <th className="py-2 pr-3">Nome</th>
                <th className="py-2 pr-3">Secções</th>
                <th className="py-2 pr-3">Criado em</th>
                <th className="py-2 pr-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id} className="border-b border-slate-800/70">
                  <td className="py-2 pr-3 font-medium">{r.name}</td>
                  <td className="py-2 pr-3">
                    <div className="flex flex-wrap gap-1">
                      {r.sections.map(s=>(
                        <span key={s} className="text-[10px] rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5">
                          {ALL_SECTIONS.find(x=>x.key===s)?.label ?? s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-2 pr-3">{new Date(r.createdAt).toLocaleString('pt-PT')}</td>
                  <td className="py-2 pr-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={()=>duplicateReport(r)} className="text-xs rounded-md border border-slate-600 px-2 py-1 hover:border-teal-400">Duplicar</button>
                      <button onClick={()=>alert('Visualização/Download (demo)')} className="text-xs rounded-md border border-slate-600 px-2 py-1 hover:border-teal-400">Ver / Exportar</button>
                      <button onClick={()=>deleteReport(r.id)} className="text-xs rounded-md border border-rose-700/70 px-2 py-1 hover:border-rose-500 text-rose-300">Remover</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length===0 && <tr><td className="py-6 text-slate-400" colSpan={4}>Sem relatórios ainda. Cria o primeiro acima ✨</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
