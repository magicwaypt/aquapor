import Card from "@/components/ui/Card";

export default function SEOPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">SEO Insights</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Palavras-chave em destaque" className="lg:col-span-2">
          <table className="w-full text-sm text-slate-300">
            <thead className="text-slate-400">
              <tr><th className="text-left py-2">Keyword</th><th className="text-right">Posição</th><th className="text-right">Cliques</th></tr>
            </thead>
            <tbody>
              {[
                ["análises de água", "12", "1 245"],
                ["infraestrutura hídrica", "8", "987"],
                ["água sustentável", "22", "689"],
                ["gestão de água", "15", "542"]
              ].map((r,i)=>(
                <tr key={i} className="border-t border-white/5">
                  <td className="py-2">{r[0]}</td>
                  <td className="text-right">{r[1]}</td>
                  <td className="text-right">{r[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Alertas de SEO">
          <ul className="mt-2 list-disc pl-5 text-sm text-slate-300 space-y-2">
            <li>Páginas sem meta descrição.</li>
            <li>Tempo de carregamento acima da média.</li>
            <li>Links internos em falta em páginas chave.</li>
          </ul>
        </Card>
      </div>

      <Card title="Tendência de Rankings">
        <div className="mt-2 h-56 rounded-lg bg-black/20" />
      </Card>
    </div>
  );
}
