import Card from "@/components/ui/Card";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Tráfego do site" className="lg:col-span-2"
          trailing={<span className="text-xs rounded-full px-2 py-0.5 bg-white/10">Últimos 30 dias</span>}
        >
          <div className="mt-2 h-64 rounded-lg bg-black/20" />
        </Card>

        <Card title="Origem de Tráfego">
          <ul className="mt-2 space-y-2 text-sm text-slate-300">
            <li className="flex justify-between"><span>Pesquisa Orgânica</span><span>42%</span></li>
            <li className="flex justify-between"><span>Direto</span><span>28%</span></li>
            <li className="flex justify-between"><span>Social</span><span>18%</span></li>
            <li className="flex justify-between"><span>Referral</span><span>12%</span></li>
          </ul>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Conversões">
          <div className="mt-2 h-56 rounded-lg bg-black/20" />
        </Card>
        <Card title="Páginas Principais">
          <div className="mt-2 h-56 rounded-lg bg-black/20" />
        </Card>
      </div>
    </div>
  );
}
