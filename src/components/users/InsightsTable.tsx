"use client";
import { Insight, loadInsights, saveInsights, upvoteInsight } from "@/lib/insights";
import { useEffect, useMemo, useState } from "react";

export default function InsightsTable() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("");

  useEffect(() => { setInsights(loadInsights()); }, []);
  function refresh() { setInsights(loadInsights()); }

  function approve(id: string, status: Insight["status"]) {
    const list = loadInsights();
    const ix = list.findIndex(i => i.id === id);
    if (ix >= 0) {
      list[ix].status = status;
      saveInsights(list);
      refresh();
    }
  }

  const filtered = useMemo(() => {
    return insights.filter(i =>
      (!q || i.title.toLowerCase().includes(q.toLowerCase()) || i.text.toLowerCase().includes(q.toLowerCase())) &&
      (!cat || i.category === cat)
    );
  }, [insights, q, cat]);

  const cats = Array.from(new Set(insights.map(i => i.category)));

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h3 className="font-semibold">Insights da equipa</h3>
        <div className="flex gap-2">
          <input
            placeholder="Pesquisar…"
            className="rounded-md bg-slate-800/60 border border-slate-700 px-3 py-1.5 text-sm"
            value={q} onChange={e => setQ(e.target.value)} />
          <select
            className="rounded-md bg-slate-800/60 border border-slate-700 px-3 py-1.5 text-sm"
            value={cat} onChange={e => setCat(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-300">
            <tr className="border-b border-slate-700">
              <th className="text-left py-2">Título</th>
              <th className="text-left py-2">Categoria</th>
              <th className="text-left py-2">Autor</th>
              <th className="text-left py-2">Tags</th>
              <th className="text-left py-2">Estado</th>
              <th className="text-left py-2">Upvotes</th>
              <th className="text-left py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(i => (
              <tr key={i.id} className="border-b border-slate-800">
                <td className="py-2">
                  <div className="font-medium text-slate-100">{i.title}</div>
                  <div className="text-xs text-slate-400 line-clamp-1">{i.text}</div>
                </td>
                <td className="py-2">{i.category}</td>
                <td className="py-2">{i.author.name}</td>
                <td className="py-2">
                  <div className="flex gap-1 flex-wrap">
                    {i.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="py-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    i.status === "aprovado" ? "bg-emerald-600/30 text-emerald-300" :
                    i.status === "rejeitado" ? "bg-rose-600/30 text-rose-300" :
                    "bg-slate-700 text-slate-300"
                  }`}>
                    {i.status}
                  </span>
                </td>
                <td className="py-2">{i.upvotes}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button onClick={() => { upvoteInsight(i.id); refresh(); }}
                      className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600">👍 Votar</button>
                    <button onClick={() => approve(i.id, "aprovado")}
                      className="text-xs px-2 py-1 rounded bg-emerald-700 hover:bg-emerald-600">Aprovar</button>
                    <button onClick={() => approve(i.id, "rejeitado")}
                      className="text-xs px-2 py-1 rounded bg-rose-700 hover:bg-rose-600">Rejeitar</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="text-center py-6 text-slate-400">Sem insights ainda.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
