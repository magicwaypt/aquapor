import Card from "@/components/ui/Card";

const sources = [
  {name:"Google Analytics", status:"Conectado", freq:"6h"},
  {name:"Google Search Console", status:"Conectado", freq:"Diário"},
  {name:"Formulários Website", status:"Conectado", freq:"Tempo real"},
  {name:"Redes Sociais", status:"Conectado", freq:"3h"},
  {name:"E-commerce", status:"Atenção", freq:"12h"},
];

export default function DataSourcesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Fontes de Dados</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {sources.map((s,i)=>(
          <Card key={i} title={s.name}
            trailing={<span className="text-xs rounded-full px-2 py-0.5 bg-white/10">{s.status}</span>}
          >
            <p className="text-sm text-slate-300">Atualização: {s.freq}</p>
            <div className="mt-3">
              <button className="h-9 px-3 rounded-md bg-white/10 hover:bg-white/15 text-sm">Configurar</button>
            </div>
          </Card>
        ))}
        <Card title="Adicionar nova fonte">
          <button className="h-10 px-3 rounded-md bg-[rgb(80,176,168)] text-slate-900 font-medium">Conectar</button>
        </Card>
      </div>
    </div>
  );
}
