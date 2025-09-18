import Card from "@/components/ui/Card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Relatórios</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Relatórios Recentes" className="lg:col-span-2">
          <ul className="text-sm text-slate-300 space-y-2">
            <li className="flex justify-between border-t border-white/5 pt-2"><span>Performance Q2</span><span className="text-slate-400">há 2 dias</span></li>
            <li className="flex justify-between border-t border-white/5 pt-2"><span>SEO – Palavras-chave</span><span className="text-slate-400">há 1 semana</span></li>
            <li className="flex justify-between border-t border-white/5 pt-2"><span>Engajamento Social</span><span className="text-slate-400">há 3 semanas</span></li>
          </ul>
        </Card>

        <Card title="Criar Relatório">
          <form className="text-sm space-y-3">
            <div>
              <label className="text-slate-300">Nome</label>
              <input className="mt-1 w-full h-9 rounded-md bg-white/5 border border-white/10 px-3 outline-none" />
            </div>
            <div>
              <label className="text-slate-300">Intervalo</label>
              <select className="mt-1 w-full h-9 rounded-md bg-white/5 border border-white/10 px-3">
                <option>Últimos 7 dias</option>
                <option>Últimos 30 dias</option>
                <option>Últimos 90 dias</option>
              </select>
            </div>
            <button className="h-9 px-3 rounded-md bg-[rgb(80,176,168)] text-slate-900 font-medium">Gerar</button>
          </form>
        </Card>
      </div>
    </div>
  );
}
