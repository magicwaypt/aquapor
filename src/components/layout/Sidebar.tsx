'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard, LineChart, Search, Users, Database, FileText, Settings
} from 'lucide-react';

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/analytics', label: 'Analytics', icon: LineChart },
  { href: '/seo', label: 'SEO Insights', icon: Search },
  { href: '/users', label: 'Utilizadores', icon: Users },
  { href: '/data-sources', label: 'Fontes de Dados', icon: Database },
  { href: '/reports', label: 'Relatórios', icon: FileText },
  { href: '/settings', label: 'Definições', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside
      className="fixed inset-y-0 left-0 w-[var(--sidebar)] bg-[#0d1624] border-r border-white/10 hidden lg:flex flex-col"
      aria-label="Navegação principal"
    >
      <div className="px-4 py-4 text-sm font-semibold">Aquapor Platform</div>
      <nav className="px-2 py-2 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm',
                active ? 'bg-white/10' : 'hover:bg-white/5'
              )}
            >
              <Icon className="size-4" />
              <span>{label}</span>
            </Link>
          );
        })}
        <a href="/analytics" className="flex items-center gap-2 px-3 py-2 rounded hover:bg-slate-800">📈 <span>Analytics</span></a>
</nav>
    </aside>
  );
}
