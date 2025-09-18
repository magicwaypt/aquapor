"use client";
import { Plus } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[rgb(10,29,47)]/70 backdrop-blur supports-[backdrop-filter]:bg-[rgb(10,29,47)]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-3">
        <input
          placeholder="Pesquisar insights, palavras-chave, recomendações…"
          className="flex-1 h-9 rounded-md bg-white/5 px-3 text-sm text-slate-200 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[rgb(80,176,168)]/50 border border-white/10"
        />
        <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md bg-[rgb(80,176,168)]/90 hover:bg-[rgb(80,176,168)] text-slate-900 font-medium text-sm">
          <Plus size={16} />
          Novo Relatório
        </button>
        <div className="h-8 w-8 rounded-full bg-white/10" />
      </div>
    </header>
  );
}
