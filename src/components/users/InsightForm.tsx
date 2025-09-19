"use client";
import { addInsight, Insight, User } from "@/lib/insights";
import { useState } from "react";

const CATEGORIES = ["SEO", "Marketing", "Operações", "Produto", "Clientes", "Dados"];

export default function InsightForm({ currentUser }: { currentUser: User }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !text) return alert("Título e descrição são obrigatórios.");
    const ins: Insight = {
      id: crypto.randomUUID(),
      title,
      category,
      text,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString(),
      author: { id: currentUser.id, name: currentUser.name, role: currentUser.role },
      upvotes: 0,
      status: "novo",
    };
    addInsight(ins);
    setTitle(""); setText(""); setTags("");
    alert("Insight submetido ✅");
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 flex flex-col gap-3">
      <h3 className="font-semibold">Submeter novo insight</h3>
      <input
        className="rounded-md bg-slate-800/60 border border-slate-700 px-3 py-2 text-sm"
        placeholder="Título do insight"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="flex gap-3">
        <select
          className="rounded-md bg-slate-800/60 border border-slate-700 px-3 py-2 text-sm"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input
          className="flex-1 rounded-md bg-slate-800/60 border border-slate-700 px-3 py-2 text-sm"
          placeholder="tags (separadas por vírgula)"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>
      <textarea
        rows={5}
        className="rounded-md bg-slate-800/60 border border-slate-700 px-3 py-2 text-sm"
        placeholder="Descreve o insight e o porquê do impacto."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button
        type="submit"
        className="self-start px-4 py-2 rounded-md bg-[rgb(var(--brand-500))] text-slate-900 font-medium hover:opacity-90"
      >
        Guardar insight
      </button>
      <p className="text-xs text-slate-400">
        * Demo local — guardado em localStorage. Em produção ligamos a uma base de dados.
      </p>
    </form>
  );
}
