import Card from "@/components/ui/Card";

export default function DashboardPage() {
  return (
    <main className="page space-y-6 py-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Visitas (dummy)">
          <div className="mt-2 h-24 rounded-lg bg-black/20" />
        </Card>
        <Card title="Conversões (dummy)">
          <div className="mt-2 h-24 rounded-lg bg-black/20" />
        </Card>
        <Card title="SEO (dummy)">
          <div className="mt-2 h-24 rounded-lg bg-black/20" />
        </Card>
      </div>
    </main>
  );
}
