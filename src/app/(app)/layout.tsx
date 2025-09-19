import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />
      <div className="lg:pl-[var(--sidebar)]">
        <Header />
        <main className="page py-6">{children}</main>
      </div>
    </div>
  );
}
