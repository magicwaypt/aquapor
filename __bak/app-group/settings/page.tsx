import Card from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Definições</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Conta">
          <form className="text-sm space-y-3">
            <div>
              <label className="text-slate-300">Empresa</label>
              <input className="mt-1 w-full h-9 rounded-md bg-white/5 border border-white/10 px-3" defaultValue="Aquapor" />
            </div>
            <div>
              <label className="text-slate-300">Email</label>
              <input className="mt-1 w-full h-9 rounded-md bg-white/5 border border-white/10 px-3" defaultValue="marketing@aquapor.pt" />
            </div>
            <button className="h-9 px-3 rounded-md bg-[rgb(80,176,168)] text-slate-900 font-medium">Guardar</button>
          </form>
        </Card>

        <Card title="Preferências">
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="accent-[rgb(80,176,168)]" />
              Ativar recomendações de IA no dashboard
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="accent-[rgb(80,176,168)]" />
              Atualizações de dados em tempo real
            </label>
          </div>
        </Card>
      </div>
    </div>
  );
}
