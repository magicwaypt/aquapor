"use client";

import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, Plus, User } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  function logout() {
    localStorage.removeItem("aq_auth");
    router.push("/");
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-14 border-b border-white/10 bg-[rgb(var(--brand-700))] text-white/90">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="font-semibold">Aquapor Platform</div>

        <div className="ml-4 hidden flex-1 items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 sm:flex">
          <Search className="size-4 shrink-0" />
          <input
            className="w-full bg-transparent text-sm placeholder-white/60 outline-none"
            placeholder="Pesquisar insights, palavras-chave, recomendações…"
          />
        </div>

        <button
          onClick={() => alert("Novo relatório (MVP)")}
          className="ml-auto inline-flex items-center gap-2 rounded-md bg-[rgb(var(--brand-500))] px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="size-4" />
          Novo Relatório
        </button>

        <button className="ml-2 rounded-full p-2 hover:bg-white/10">
          <Bell className="size-5" />
        </button>

        <div className="relative ml-1">
          <button className="flex items-center gap-2 rounded-full bg-white/10 px-2 py-1">
            <User className="size-4" />
            <span className="text-sm">Admin</span>
          </button>
          {/* podes ligar dropdown mais tarde */}
        </div>

        {pathname !== "/" && (
          <button
            onClick={logout}
            className="ml-2 rounded-md border border-white/20 px-2 py-1 text-xs hover:bg-white/10"
          >
            Terminar sessão
          </button>
        )}
      </div>
    </header>
  );
}
