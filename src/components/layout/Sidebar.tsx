"use client";
import { BarChart3, Settings, Users, Database, FileText, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/analytics",  label: "Analytics", icon: Search },
  { href: "/seo",        label: "SEO Insights", icon: Search },
  { href: "/users",      label: "Utilizadores", icon: Users },
  { href: "/data-sources", label: "Fontes de Dados", icon: Database },
  { href: "/reports",    label: "Relatórios", icon: FileText },
  { href: "/settings",   label: "Definições", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:w-64 shrink-0 border-r border-white/5 bg-[rgb(10,29,47)]/70 backdrop-blur supports-[backdrop-filter]:bg-[rgb(10,29,47)]/60">
      <nav className="flex flex-col w-full p-4 gap-1">
        <div className="px-2 py-3 text-sm font-semibold tracking-wide text-slate-200">
          Aquapor Platform
        </div>
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
        <div className="mt-auto pt-3 border-t border-white/5" />
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
}
