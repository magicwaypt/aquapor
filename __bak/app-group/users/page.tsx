import Card from "@/components/ui/Card";

export default function UsersPage() {
  const rows = [
    {name:"Miguel Santos", email:"miguel@aquapor.pt", role:"Admin", status:"Ativo"},
    {name:"Ana Ferreira", email:"ana@aquapor.pt", role:"Marketing", status:"Ativo"},
    {name:"João Silva", email:"joao@aquapor.pt", role:"Data Analyst", status:"Ativo"},
    {name:"Marta Costa", email:"marta@aquapor.pt", role:"Conteúdo", status:"Pendente"},
  ];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Utilizadores</h1>
      <Card>
        <table className="w-full text-sm">
          <thead className="text-slate-400">
            <tr>
              <th className="text-left py-2">Nome</th>
              <th className="text-left">Email</th>
              <th className="text-left">Perfil</th>
              <th className="text-left">Estado</th>
            </tr>
          </thead>
          <tbody className="text-slate-300">
            {rows.map((r,i)=>(
              <tr key={i} className="border-t border-white/5">
                <td className="py-2">{r.name}</td>
                <td>{r.email}</td>
                <td>{r.role}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
